const express = require('express');
const router = express.Router();
const User = require('../../models/userModel');
const userAuth = require("../../middleware/userAuth");
const upload = require('../../middleware/upload');

// Controller to update user information
router.put("/updateUser", userAuth, upload.single('avatar'), async (req, res) => {
  const userId = req.userID; // Assuming the authenticated user's ID is available in req.user._id
  const { firstName, lastName, phone, address, isRenter, companyName } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user information
    user.firstName = firstName;
    user.lastName = lastName;
    user.phone = phone;
    user.address = address;
    user.isRenter = isRenter;
    user.companyName = isRenter ? companyName : null;

    // Handle the avatar image if uploaded
    if (req.file) {
      user.avatar = req.file;
    }

    await user.save();

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'An error occurred while updating user information' });
  }
});

module.exports = router;
