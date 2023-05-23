const mongoose = require('mongoose');
const User = require("./userModel")
const Car = require("./carModel")


const rentcartSchema = new mongoose.Schema({
    userById: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    cartItems: [
        {
            rentvehiculeid: {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Car",
                required : true
            },
            requiredhours: {
                type : Number,
                required : true
            },
            rentperhour: {
                type : Number,
                required : true
            },
            totalbill: {
                type : Number,
                required : true
            },
            brand: {
                type : String,
                required : true
            },
            model: {
                type : String,
                required : true
            },
            imageSrc: {
                type : String,
                required : true
            }
        }
    ]

},{timestamps:true})




const RentcartModel = mongoose.model('RENTCART', rentcartSchema);

module.exports = RentcartModel;


