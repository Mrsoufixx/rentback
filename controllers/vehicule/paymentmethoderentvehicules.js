const express = require('express');
const router = express.Router();
const userAUth = require("../../middleware/userAuth");


const stripe = require("stripe")(process.env.STRIPE_SEC_KEY);
const {v4 : uuidv4} = require('uuid');

const Car = require('../../models/carModel');

module.exports = router.post('/stripePay', async (req, res, next) =>{
    const {token, amount, idRentedvehicule, hoursRequired} = req.body;
    const idempotencyKey = uuidv4();

    return [stripe.customers.create({
        email: token.email,
        source: token
    })
    .then(customer =>{
        stripe.charges.create({
            amount: amount,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email
        }, {idempotencyKey})
    })
    .then( result =>{
        res.status(200).json(result);
    })
    .catch(error =>{
        console.log(error)
    })],

    [await Car.updateOne({"_id": idRentedvehicule},{$set:{"availability" : "Not Available for "+hoursRequired, "bookedHours": hoursRequired}})]

})