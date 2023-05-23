const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcryptjs');


router.get('/', (req, res) =>{
    res.send('home page router')
});

// Admin Side Modules---for--- SignIn, SignOut
router.use(require('../controllers/admin/signinadmin'))
router.use(require('../controllers/admin/signoutadmin'))
router.use(require('../controllers/admin/getadmindata'))

router.use(require('../controllers/admin/addvehicule'))
router.use(require('../controllers/admin/getvehicule'))
// router.use(require('../adminSideModules/incomeforrentbikes'))
router.use(require('../controllers/admin/deletevehicule'))

// // Admin Side Modules---for--- Users
router.use(require('../controllers/admin/deleteuser'))
router.use(require('../controllers/admin/getallusers'))

module.exports = router;