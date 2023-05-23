const express = require('express');
const router = express.Router();
const adminAuth = require("../../middleware/adminAuth");

const Car = require('../../models/carModel');

router.post('/deleteVehiculeDashboard', adminAuth, async (req, res) => {
  try {
    const vehiculeId = req.body.vehiculeIdFromDashBoard;
    // console.log("vehicule idrs",vehiculeId)
    const deletedvehicule = await Car.findOneAndDelete({ _id: vehiculeId });
  

    if (!deletedvehicule) {
      throw new Error('Rent vehicule not found');
    }

    res.status(200).json({ message: 'Rent vehicule deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
