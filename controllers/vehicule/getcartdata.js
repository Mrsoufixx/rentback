const express = require("express");
const router = express.Router();
const userAuth = require("../../middleware/userAuth");
const RentcartModel = require("../../models/rentcartModel");

// Get cart data
module.exports= router.use("/getCartData" ,userAuth, async (req, res) => {
  try {
    const user = req.rootUser;
    const cartData = await RentcartModel.findOne({ userById: user._id }).populate(
      "cartItems.rentvehiculeid"
    );

    res.status(200).json({ userById: user, cartItems: cartData.cartItems });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete item from cart
module.exports= router.use("/deleteItemFromCart" ,userAuth, async (req, res) => {
  try {
    const user = req.rootUser;
    const { cartitemid } = req.body;

    await RentcartModel.updateOne(
      { userById: user._id },
      { $pull: { cartItems: { _id: cartitemid } } }
    );

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update database
module.exports= router.use("/updateDataBase",userAuth, async (req, res) => {
  try {
    const user = req.rootUser;
    const { items } = req.body;

    await RentcartModel.updateOne({ userById: user._id }, { cartItems: items });

    res.status(200).json({ message: "Database updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
