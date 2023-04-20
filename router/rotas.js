const express = require("express");
const router = express.Router();
const { Cadastro, Login, UsuarioAutenticado, Refresh } = require("../controllers/auth.controller");

exports.routes = (app) => {
  router.post("/cadastro", Cadastro);
  router.post("/", Login);
  router.get("/auth/user", UsuarioAutenticado);
  router.post("/auth/refresh", Refresh )

  app.use("/auth", router);
};
