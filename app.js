
require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const path = require("path")
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");



// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');
// app.use('/public', express.static(path.join(__dirname, 'public')));
// app.set('views', path.join(path.join(__dirname, 'views')));


// //Middlewares 

// app.use(express.json()); //faz com que aceite formato json
// app.use(express.urlencoded()); //faz decrypt dos dados em html
// app.use(cookieParser())
// app.use(cors({
//     origin: ['http://localhost:3000'],
//     credentials:true
// }))


 


//Models
const User = require("./models/User");
const { routes } = require('./router/rotas');

//Credenciais
const dbAccess = process.env.DB_ACCESS


mongoose.connect(dbAccess, {useNewUrlParser: true, useUnifiedTopology: true})
.then( () => {

    app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(path.join(__dirname, 'views')));


//Middlewares 

app.use(express.json()); //faz com que aceite formato json
app.use(express.urlencoded()); //faz decrypt dos dados em html
app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials:true
}))
 app.listen(3000)
 console.log("conectou ao banco de dados!")
routes(app);    

})
.catch((err) =>{ console.error(err)})

// //Public Route
// app.get("/", (req,res) =>{
  
//     res.sendFile(__dirname + "/views/login.html");
    
// })

// app.get("/dashboard",(req,res) =>{
//     res.sendFile(__dirname + "/views/dashboard.html" );
// })


// app.get("/cadastro", (req,res) =>{
//     //  res.status(200).json({msg: 'Bem vindo a nossa API'})
//       res.sendFile(__dirname + "/views/cadastro.html");
      
//   })

// //Registrar usuário -> colocar um /auth/register depois
// app.post("/cadastro", async(req,res) => {
//     const{name, email, password, confirmPassword} = req.body
//     //validações
     
//     const userExists = await User.findOne({email:email})
    
//     if(userExists){return res.status(422).json({msg: "that email already exists"})}



//     //criar senha encriptada
//     const salt = await bcrypt.genSalt(12)
//     const passwordHash = await bcrypt.hash(password,salt)

//     //criar usuário

//     const id = new mongoose.Types.ObjectId()
//     const user = new User({
//         name,
//         email,
//         password: passwordHash,
//         _id: id,
//     })

//     try {
//         await user.save()
//         res.status(201).json({msg: " usuário criado com sucesso"})
//         console.log("cadastrado!")
        
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({msg: "aconteceu um erro inesperado"})
        
//     }
// })

// //Login user
// app.post("/", async(req,res) => {
//     const {email, password} = req.body

//     const user = await User.findOne({email:email})
//     if(!user){return res.status(404).json({msg: "usuário não encontrado"})}

//     //check if pwd matches

//     const checkPwd = await bcrypt.compare(password,user.password)
//     if(!checkPwd){return res.status(422).json({msg: "senha inválida"})}

//     try {
//         const secret = process.env.SECRET
//         const accessToken = sign(
//             {id: user._id}, "access_secret", {expiresIn : "30s"});
    
//         const refreshToken = sign(
//             {id: user._id}, "refresh_secret", {expiresIn : "1w"});
    
//         res.cookie("accessToken", accessToken,{
//             httpOnly: true,
//             maxAge: 24 * 60 * 60 * 1000 // 1 dia
//         });
    
//         res.cookie("refreshToken", refreshToken,{
//             httpOnly: true,
//             maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
//         }); 
    
//         res.send({
//             message:"success"
//         })

//         res.redirect('/dashboard');

//     } catch (err) {
//         console.log(err)
//         res.status(500).json({msg:"Erro ao gerar o token JWT"})
//     }
    

// })

// //Private Route
//     //colocar middleware p n deixar a rota pública
// app.get("/user/:id", async(req,res) =>{
//     const id = req.params.id

//     //check if user exists
//     const user = await User.findById(id, "-password")

//     if(!user){return res.status(404).json({msg:"usuário não encontrado"})}

//     res.status(200).json({user})

    
// })

// app.get("/user/:id", checkToken, async(req,res) =>{
//     const id = req.params.id

//     //check if user exists
//     const user = await User.findById(id, "-password")

//     if(!user){return res.status(404).json({msg:"usuário não encontrado"})}

//     res.status(200).json({user})

    
// })

// async function checkToken(req, res, next){
//     const authHeader = await req.headers["authorization"];
//     const token = authHeader && authHeader.split(" ")[1];
//     console.log(token)

//     if(!token){return res.status(401).json({msg: "Acesso negado"})}

//     try {

//         const secret = process.env.SECRET
//         jwt.verify(token, secret)
//         next()
        
//     } catch (error) {
//         res.status(400).json({msg: "Token Inválido"})
//     }

// }

