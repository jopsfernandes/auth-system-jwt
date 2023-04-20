const {request, response} = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const {sign, verify} = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const cookieParser = require("cookie-parser");
const path = require("path");



const getPageRender = async(req, res) => {
  res.sendFile(path.join(__dirname, "../views/login.html"));
}

const Cadastro  =  asyncHandler(async(req,res) => {
    const {email, password} = req.body
    const userExists = await User.findOne({email:email});
    if(userExists){return res.status(422)}

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
        
        
    } catch (error) {
        console.log(error)
        res.status(500)
        
    }
})

const Login = asyncHandler(async(req,res) =>{
    const {email ,password} = req.body

    const user = await User.findOne({email:email})
    if(!user){return res.status(422)}


    const checkPwd = await bcrypt.compare(password, user.password)
    if(!checkPwd){return res.status(422)}

    const accessToken = sign(
        {id: user._id}, "access_secret", {expiresIn : "30s"});

    const refreshToken = sign(
        {id: user._id}, "refresh_secret", {expiresIn : "1w"});

    res.cookie("accessToken", accessToken,{
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 dia
    });

    res.cookie("refreshToken", refreshToken,{
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
    }); 

    res.status(200).redirect("/auth/user")
    

    // try {
    //     const secret = process.env.SECRET
    //     const token = jwt.sign({
    //         id:user._id
    //     },secret);

        
    //     const headers = { Authorization: `Bearer ${token}` };
    //     res.set(headers).redirect('/dashboard');

    // } catch (err) {
    //     console.log(err)
    //     res.status(500).json({msg:"Erro ao gerar o token JWT"})
    // }

})

const UsuarioAutenticado = asyncHandler(async (req, res) => {
  try {
    const accessToken = req.cookies['accessToken'];
    const payload = verify(accessToken, process.env.SECRET);
    if (!payload) {
      return res.status(401);
    }

    const user = await User.findOne(payload._id);

    if (!user) {
      return res.status(401);
    }
    
    // Se chegou até aqui, o usuário está autenticado
    res.send({ message: 'usuário autenticado' });
  } catch (error) {
    console.log(error)
  }
});

const Refresh = asyncHandler(async (req, res) => {
    try {
      const refreshToken = req.cookies('refreshToken');
      const payload = verify(refreshToken, process.env.SECRET);
      if (!payload) {
        return res.status(401);
      }

      const accessToken = sign(
        {id: payload._id}, "access_secret", {expiresIn : "30s"});

      res.cookie("accessToken", accessToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 dia
        });
    

      // Se chegou até aqui, o usuário está autenticado
      res.send({ message: 'usuário autenticado' });


    } catch (error) {
      res.status(401).send({ message: 'não autenticado' });
    }
  });
  
const Logout = asyncHandler(async(req,res) => {
  res.cookie('accessToken', '', {maxAge:0});
  res.cookie('refreshToken', '', {maxAge:0});
})





module.exports = {
    Cadastro,
    Login,
    UsuarioAutenticado,
    Refresh,
    Logout,
    getPageRender

};