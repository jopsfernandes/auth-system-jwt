const {request, response} = require("express");
const asyncHandler = require("express-async-handler");
const path = require("path");


const getPageRender = asyncHandler(async(req, res) => {
    res.sendFile(path.join(__dirname, "../views/index.html"));
  })

const getRegisterRender = asyncHandler(async(req, res) => {
    res.sendFile(path.join(__dirname, "../views/cadastro.html"));
  }
)

const getLoginRender = asyncHandler(async(req,res) => {
    res.sendFile(path.join(__dirname, "../views/login.html"));
})

const getDashboardRender =asyncHandler(async(req, res) => {
    res.sendFile(path.join(__dirname,"../views/dashboard.html"));
})

module.exports = {
    getRegisterRender,
    getPageRender,
    getLoginRender,
    getDashboardRender

};