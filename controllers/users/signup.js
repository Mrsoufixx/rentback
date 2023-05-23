const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../../models/userModel');

router.use(express.static(path.join(__dirname, '../public')));

router.post('/signup', async (req, res) => {
  const { lastName,firstName, email, password, userType,avatar } = req.body;

  if (!lastName || !firstName || !email || !password  ) {
    return res.status(422).json({ error: "Please fill the form properly" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "User already exists" });
    } else {

      const user = new User({
        firstName,
        lastName,
        email,
        password,
        avatar,
      });

      await user.save();

      res.status(201).json({ message: "User registered successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
