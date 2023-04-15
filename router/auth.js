const express = require("express");
const router = express.Router();

router.get("/", (req,res) =>{
    res.send("página de cadastro")
})

module.exports = router