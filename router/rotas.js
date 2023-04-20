const express = require("express");
const router = express.Router();
const { Cadastro, Login, UsuarioAutenticado, Refresh, Logout, getPageRender } = require("../controllers/auth.controller");

const getIntoLoginPage = async(req,res) => {
  res.redirect('/auth/login');
}


exports.routes = (app) => {
  router.post("/cadastro", Cadastro);
  router.get("/", getIntoLoginPage);
  router.post("/", Login);
  router.get("/auth/refresh", getPageRender);
  router.get("/auth/login", getPageRender);
  router.get("/auth/user", UsuarioAutenticado);
  router.post("/auth/refresh", Refresh );
  router.post("/auth/logout", Logout);

  app.use("/", router);
  app.use("/auth",router)

};
