const express = require('express');
const router = express.Router();
const authenticate = require("../../middleware/userAuth");



const User = require('../../models/userModel');
const Rentvehicule = require('../../models/carModel');
const Rentcart = require('../../models/rentcartModel');
const Rentvehiculeincomes = require('../../models/rentIncomeModel');


module.exports = router.post('/updateRentDataBase', authenticate, async(req, res)=>{
    const getRentedvehicules = req.body.items;
    let rentedvehiculePrice, rentedvehiculeId, rentedvehiculeHours, rentedvehiculeBrand, rentedvehiculeModel;
    
    getRentedvehicules.map(getRentedvehicules=>{
        rentedvehiculePrice = getRentedvehicules.totalbill;
        rentedvehiculeId = getRentedvehicules.rentvehiculeid;
        rentedvehiculeHours = getRentedvehicules.requiredhours;
        rentedvehiculeBrand = getRentedvehicules.brand;
        rentedvehiculeModel = getRentedvehicules.model;
    })
    
    const findUser = await User.findOne({_id: req.userID});
    const findUserByID = findUser._id;
    const findvehicule = await Rentvehicule.findOne({_id: rentedvehiculeId});
    const cartData = await Rentcart.findOne({userById: findUserByID});
    const cartId = cartData._id;
    const vehiculeById = findvehicule._id; 
    const rentvehiculeBuyedPrice = findvehicule.price;

    try {
        
        const newincome = new Rentvehiculeincomes({
            userById : findUser,
            soldItems: [{
                productId : vehiculeById, 
                bookedHours : rentedvehiculeHours, 
                brand : rentedvehiculeBrand, 
                model : rentedvehiculeModel, 
                retailPricePerItem : rentvehiculeBuyedPrice, 
                totalIncome : rentedvehiculePrice
            }]
        });

        await newincome.save();

        
        await Rentcart.deleteOne({"_id": cartId});
        
    }
    catch(error) {
        res.status(500).send(error.message);
    }

})