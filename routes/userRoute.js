const express = require('express');

const router = express.Router();



router.get('/', (req, res) =>{
    res.send('home page router')
});



router.use(require('../controllers/users/signup'))
router.use(require('../controllers/users/signin'))
router.use(require('../controllers/users/signout'))
router.use(require('../controllers/users/getuserdata'))
// router.use(require('../clientSideModules/contactform'))
router.use(require('../controllers/vehicule/getallvehicules'))
// router.use(require('../clientSideModules/exploreallrentbikes'))
router.use(require('../controllers/vehicule/searchvehicule'))
router.use(require('../controllers/vehicule/reviewsrentvehicules'))
router.use(require('../controllers/vehicule/addtocartvehicule'))
router.use(require('../controllers/vehicule/getcartdata'))
router.use(require('../controllers/vehicule/paymentmethoderentvehicules'))
router.use(require('../controllers/vehicule/updatedbafetrrentedvehicules'))


module.exports = router;