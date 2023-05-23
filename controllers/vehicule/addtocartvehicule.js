const express = require('express');
const router = express.Router();
const useAuth = require('../../middleware/userAuth');
const User = require('../../models/userModel');
const Car = require('../../models/carModel');
const Rentcart = require('../../models/rentcartModel');

router.post('/addtocartvehicule', useAuth, async (req, res) => {
  if (!req.userID) {
    return res
      .status(401)
      .json({ message: 'Please sign in to add items to the cart' });
  }

  const { itemId, rentHours } = req.body;

  try {
    const findUser = await User.findById(req.userID);
    const findItem = await Car.findById(itemId);

    if (!findUser || !findItem) {
      return res.status(404).json({ message: 'User or item not found' });
    }

    const itemPrice = findItem.rent;
    const itemBrand = findItem.brand;
    const itemModel = findItem.model;
    const itemImgPath = findItem.filePath;

    const newCartItem = {
      rentvehiculeid: itemId,
      requiredhours: rentHours,
      rentperhour: itemPrice,
      totalbill: itemPrice * rentHours,
      brand: itemBrand,
      model: itemModel,
      imageSrc : itemImgPath
    };

    let loginUser = await Rentcart.findOne({ userById: findUser._id });

    if (loginUser) {
      const itemIdInCart = loginUser.cartItems.find((cartItem) =>
        cartItem.rentvehiculeid.equals(itemId)
      );

      if (itemIdInCart) {
        console.log('Item is already in the cart');
        return res.status(400).json({ message: 'Item is already in the cart' });
      }

      loginUser.cartItems.push(newCartItem);
      loginUser = await loginUser.save();
    } else {
      const newCart = new Rentcart({
        userById: findUser._id,
        cartItems: [newCartItem],
      });

      await newCart.save();
    }

    return res
      .status(201)
      .json({ message: 'Item added to cart successfully' });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: 'Failed to add item to cart. Please try again.' });
  }
});

module.exports = router;
