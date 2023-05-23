const express = require('express');
const router = express.Router();
const adminAuth = require("../../middleware/adminAuth");

const Car = require('../../models/carModel');
// const Admin = require('../../models/adminModel');

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });



module.exports = router.post('/addvehicules', upload.single('wheelsImage'), async (req, res, next) => {
    console.log(req.body);
    try {
      // const admin = req.rootAdmin
      const data = new Car({
        type : req.body.type,
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        color: req.body.color,
        seats: req.body.seats,
        price: req.body.price,
        rent: req.body.rent,
        fileName: req.file.originalname,
        filePath: req.file.path,
        fileType: req.file.mimetype,
        fileSize: req.file.size,
        // admin : admin._id
      });
      await data.save();
      // Update user's cars array
    // await Admin.findByIdAndUpdate(admin._id, { $push: { cars: data._id } });
      res.status(201).send("Data uploaded successfully");
    } catch (error) {
      res.status(400).send(error.message);
    }
  });