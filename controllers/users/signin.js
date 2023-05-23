const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const User = require("../../models/userModel");

//User signin route
module.exports = router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "invalid crededntials" });
    }

    const userSignin = await User.findOne({ email: email });

    if (userSignin) {
    //   console.log(userSignin)
      const isSame = await bcrypt.compare(password, userSignin.password);
    //   console.log(isSame)

    // Generate and set JWT token in cookie
    const token = jwt.sign({ id: userSignin._id}, process.env.JWT_SECRET);
    //   console.log("token",token)

      if (!isSame) {
        res.status(400).json({ error: "invalid credentials" });
      } else {
        res.json({ message: "user signin successfully", token });
      }
    } else {
      res.status(400).json({ error: "invalid crededntials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
