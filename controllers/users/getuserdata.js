const express = require('express');
const router = express.Router();

const userAuth = require("../../middleware/userAuth");

//getting user complete data
module.exports = router.get('/getdata', userAuth, (req, res) =>{
    res.send(req.rootUser);
});