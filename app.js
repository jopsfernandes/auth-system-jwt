
require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const path = require("path")
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");



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
 console.log("Servidor rodando na porta 3000")
routes(app);    

})
.catch((err) =>{ console.error(err)})



