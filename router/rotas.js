const express = require("express");
const router = express.Router();
const { 
  Cadastro,
  Login,
  UsuarioAutenticado,
  Refresh,
  Logout
  
   } = require("../controllers/auth.controller");

const {
  getPageRender,
  getRegisterRender,
  getDashboardRender,
  getLoginRender} = require("../controllers/render.controller.js");



exports.routes = (app) => {
  
 
  router.get("/", getPageRender);
  router.get("/auth/refresh", getPageRender);
  router.get("/auth/login", getLoginRender);
  router.get("/auth/user", UsuarioAutenticado);
  router.get("/auth/cadastro", getRegisterRender);
  router.get("/dashboard",getDashboardRender, UsuarioAutenticado);
  

  
  router.post("/auth/login", Login);
  router.post("/auth/refresh", Refresh );
  router.post("/auth/logout", Logout);
  router.post("/auth/cadastro", Cadastro);

  app.use("/", router);
  app.use("/auth",router)

};
