const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');

const adminAuthentication = async (req, res, next) => {
  try {
      const authHeader = req.headers.authorization;
      // console.log("authHeader",authHeader);
    
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
          throw new Error('Unauthorized: No token provided');
        }
        
        const token = authHeader.split(' ')[1];
        
        console.log("token",token);
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log("verifyToken",verifyToken);

    const rootAdmin = await Admin.findOne({
      _id: verifyToken.id,
     
    });

    if (!rootAdmin) {
      throw new Error('Admin not found');
    }

    req.token = token;
    req.rootAdmin = rootAdmin;
    req.adminID = rootAdmin._id;

    next();
  } catch (error) {
    res.status(401).send('Unauthorized: No token provided');
    console.log(error);
  }
};

module.exports = adminAuthentication;
