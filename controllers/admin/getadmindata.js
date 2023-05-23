const express = require('express');
const router = express.Router();
const adminAuthentication = require("../../middleware/adminAuth");


//dashboard authentication
module.exports = router.get('/getadmindata',adminAuthentication, (req, res) =>{
// console.log("reqgetadminroute",req.rootAdmin)

    res.send(req.rootAdmin);
})