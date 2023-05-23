const mongoose = require('mongoose');


const rentvehiculereviewSchema = new mongoose.Schema({
    vehiculeById: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Rentvehicule',
        required : true
    },
    allReviews: [
        {
            userById: {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'User',
                required : true
            },
            name: {
                type : String,
                required : true
            },
            email: {
                type : String,
                required : true
            },
            comments: {
                type : String,
                required : true
            }
        }
    ]

},{timestamps:true})




const Rentvehiculereviews = mongoose.model('RENTvehiculeREVIEW', rentvehiculereviewSchema);

module.exports = Rentvehiculereviews;


