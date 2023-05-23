const express = require('express');
const router = express.Router();
const userAuth = require("../../middleware/userAuth");


const Car = require('../../models/carModel');

module.exports = router.get('/getRentvehiculeData', userAuth, async (req, res) =>{
    const rentvehiculeData = await Car.find();
    try{
        
        res.status(200).send(rentvehiculeData);

    }catch(error) {
        res.status(400).send(error.message);
    }

    
});