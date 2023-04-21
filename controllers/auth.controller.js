const {request, response} = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const {sign, verify} = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const cookieParser = require("cookie-parser");
const path = require("path");


const Cadastro  =  asyncHandler(async(req,res) => {
    const {name, email, password} = req.body
    const userExists = await User.findOne({email:email});
    if(userExists){return res.status(422).send({message:`${name}  already exists` })}

    const salt = await bcrypt.genSalt(12)
    const passwordHash= await bcrypt.hash(password,salt)

    const id = new mongoose.Types.ObjectId()
    const user = new User({
        name,
        email,
        password: passwordHash,
        _id:id,
        
    })

    try {
        await user.save()
        res.status(201)
        res.redirect('/auth/login');
       
        
        
    } catch (error) {
        console.log(error)
        res.status(500)
        
    }
})

const Login = asyncHandler(async(req,res) =>{
    const {email ,password} = req.body

    const user = await User.findOne({email:email})
    
    if(!user){return res.send({message: 'User not found'})}


    const checkPwd = await bcrypt.compare(password, user.password)
    if(!checkPwd){return res.status(422)}

    try {const accessToken = sign(
      {id: user._id},
       process.env.ACCESS_SECRET,
        {expiresIn : "1h"});

  const refreshToken = sign(
      {id: user._id},
       process.env.REFRESH_SECRET,
       {expiresIn : "1w"});

  res.cookie("accessToken", accessToken,{
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 1 dia
  });

  res.cookie("refreshToken", refreshToken,{
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
  }); 

  res.redirect("/auth/dashboard");
      
    } catch (error) {
      res.send({message: "user not found"});
    }

})

const UsuarioAutenticado = async (req, res, next) => {
  try {
    const accessToken = req.cookies['accessToken'];
    const payload = verify(accessToken, process.env.ACCESS_SECRET);
    if (!payload) {
      return res.send({message: "sem token não entra não brother"});
    }

    const user = await User.findOne({ _id: payload.id });


    if (!user) {
      return res.send({message: "deu merda fml"});
    }
    
    // Se chegou até aqui, o usuário está autenticado
    next()
    
    
  } catch (e) {
    console.log(error)
    res.send("foi mal mano tu não tem token")
  }
};

const Refresh = asyncHandler(async (req, res) => {
    try {
      const refreshToken = req.cookies['refreshToken'];
      const payload = verify(refreshToken, process.env.REFRESH_SECRET);
      if (!payload) {
        return res.status(401);
      }

      const accessToken = sign(
        {id: payload.id}, "access_secret", {expiresIn : "30s"});

      res.cookie("accessToken", accessToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 dia
        });
    

      // Se chegou até aqui, o usuário está autenticado
        


    } catch (error) {

      res.status(401).send({ message: 'não autenticado' });
    }
  });
  
const Logout = asyncHandler(async(req,res) => {
  res.cookie('accessToken', '', {maxAge:0});
  res.cookie('refreshToken', '', {maxAge:0});
  res.redirect('/auth/login');
})





module.exports = {
    Cadastro,
    Login,
    UsuarioAutenticado,
    Refresh,
    Logout,

};