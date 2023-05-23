const jwt = require("jsonwebtoken");
const User = require('../models/userModel');

const authenticate = async (req, res, next) =>{

    try {
        const authHeader = req.headers.authorization;
        // console.log("authHeader",authHeader);
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            // Redirect to the sign-in page or return an error response
      return res.redirect('/signin'); // Modify the URL according to your application
          }
          const token = authHeader.split(' ')[1];
        // console.log("token "+token)
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("verifyToken",verifyToken);
        const rootUser = await User.findOne({_id: verifyToken.id,name:verifyToken.name
        });
        // console.log(rootUser)
        if(!rootUser){ throw new Error('User not found')}
        
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        // console.log(req.rootUser)
        next();

    } catch (error) {

        res.status(401).send('Unautorized: No token provided')
        console.log(error);
    }
}

module.exports = authenticate
