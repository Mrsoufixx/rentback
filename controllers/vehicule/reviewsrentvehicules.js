const express = require('express');
const router = express.Router();
const userAuth = require("../../middleware/userAuth");


const User = require('../../models/userModel');
const Car = require('../../models/carModel');
const Rentreviews = require('../../models/rentreviewModel');

let getReviewRentId;

module.exports =router.post('/sendReviewRentvehiculeId', userAuth, async (req, res) =>{
    getReviewRentId = req.body.selectedvehiculeId
}),

module.exports = router.get('/getRentvehiculeReviews', userAuth, async (req, res) =>{
    getReviewRentId = req.body.selectedvehiculeId

    console.log("req.body.selectedvehiculeId",req.body.selectedvehiculeId)
    console.log("getReviewRentId",getReviewRentId)
    const findUser = await User.findOne({_id: req.userID});
    const findvehicule = await Car.findOne({_id: getReviewRentId.id});

    const data = {findvehicule,findUser}
    
    try{
        
        res.status(200).send(data);

    }catch(error) {
        res.status(400).send(error.message);
    }

    
}),


module.exports = router.get('/getallreviewsforselectedrentvehicule', userAuth, async (req, res) =>{

    const findAllReviews = await Rentreviews.findOne({vehiculeById: getReviewRentId.id});
    
    try{
        
        res.status(200).send(findAllReviews);

    }catch(error) {
        res.status(400).send(error.message);
    }
}),


module.exports = router.post('/postrentvehiculereviews', userAuth, async (req, res)=>{

    const {id, name, email, message, selectedvehiculeId} = req.body;
    const findvehicule = await Car.findOne({_id: selectedvehiculeId.id});
    const findvehiculeId = findvehicule._id;
    const findvehiculeReview = await Rentreviews.findOne({vehiculeById: findvehiculeId})
   

    try {
        
        if(findvehiculeReview){
            const vehiculeReviewId = findvehiculeReview.vehiculeById
            if(vehiculeReviewId.equals(findvehiculeId)){
                    findvehiculeReview.allReviews.push({
                    userById : id, 
                    name : name, 
                    email : email, 
                    comments : message,
               });
            }
            await findvehiculeReview.save();
            res.status(201).send({ message: "review submited successfully"});
        }
        else{
            const newReview = new Rentreviews({
                vehiculeById : findvehicule,
                allReviews: [{
                userById : id, 
                name : name, 
                email : email, 
                comments : message, 
                }]
            });

            await newReview.save();
            res.status(201).json({ message: "review submited successfully"});
        }
    }
    catch(error) {
        res.status(500).send(error.message);
    }
})