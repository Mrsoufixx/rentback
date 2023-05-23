const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcryptjs');
// const adminAuthentication = require("../middelware/adminAuthentication")
const Admin = require('../../models/adminModel');

// Admin Signin
module.exports = router.post('/signinAdmin', async (req, res) => {
  try {
   
    const { adminName, adminPassword } = req.body;
    
console.log(adminPassword)
    if (!adminName || !adminPassword) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const adminSignin = await Admin.findOne({ adminName: adminName });
    
    if (adminSignin) {
      const isSame = await bcrypt.compare(adminPassword, adminSignin.adminPassword);
      

       // Generate and set JWT token in cookie
      const token = jwt.sign({id:adminSignin._id},process.env.JWT_SECRET)
    

 
      

      if (!isSame) {
        res.status(400).json({ error: "Invalid credentials not same" });
      } else {
        // res.cookie("jwtoken", token, {
        //   expires: new Date(Date.now() + 25892000000),
        //   httpOnly: true,
        //   secure: false,
        //   sameSite: "none"
        // });
        return res.status(200).json({ message: "Admin signed in successfully",token });
      }
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
