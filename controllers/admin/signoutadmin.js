const express = require('express');
const router = express.Router();
// const adminAuthentication = require("../middelware/adminAuthentication");

module.exports = router.get('/adminsignout', (req, res) => {
  console.log('admin log out');
  localStorage.removeItem('jwtoken'); // Remove the jwtoken from local storage
  localStorage.removeItem('Admin'); // Remove the jwtoken from local storage
  res.status(200).send("Admin Logout");
});