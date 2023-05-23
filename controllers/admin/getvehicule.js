const express = require('express');
const router = express.Router();
const adminAuth = require("../../middleware/adminAuth");

const Car = require('../../models/carModel');

module.exports = router.get('/getVehicules', adminAuth, async (req, res) =>{
    const rentvehicules = await Car.find();

    try{
        res.status(200).send(rentvehicules);
    } catch(error) {
        res.status(400).send(error.message);
    }
});
