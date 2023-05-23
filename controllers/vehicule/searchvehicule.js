const express = require('express');
const router = express.Router();

const Car = require('../../models/carModel');

let getRentSearch;
  
    module.exports =  router.post('/searchRentvehicule', async (req, res)=>{
        const getText = req.body.searchText
        const x = getText
        console.log(x)
        const searchCategory = await Car.find({$text: {$search: x}});
    
        getRentSearch = searchCategory
        
        return res.status(201).send(searchCategory);
        
    }),

    module.exports =  router.get('/rentvehiculesearchCategory', async (req, res) =>{
    
        try{
            
            res.status(200).send(getRentSearch);
    
        }catch(error) {
            res.status(400).send(error.message);
        }
    
        
    });
    