const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
     adminName: {
         type : String,
         required: true
     },
     email: {
         type: String,
         required: true
     },
    adminPassword: {
        type: String,
        required: true
    },
    tokens: [
        {
            token:{
                type: String
            }
        }
    ]
})

// hashing password

adminSchema.pre('save', async function(next){

    if(this.isModified('adminPassword')){
        this.adminPassword = await bcrypt.hash(this.adminPassword, 12);
    }
    next();

});


//generating token
adminSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id: this._id}, process.env.JWT_SECRET);

        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;

    }catch(err){
        console.log(err)
    }
}

const Admin = mongoose.model('ADMIN', adminSchema);
// const createAdmin = async () => {
//     try {
//       const newAdmin = new Admin({
//         adminName: 'admin',
//         email: 'admin@admin.admin',
//         phone: '1234567890',
//         adminPassword: 'admin',
//       });
      
//       await newAdmin.save();
//       console.log('Admin created successfully');
//     } catch (error) {
//       console.error('Failed to create admin:', error.message);
//     }
//   };
  
//   createAdmin();

module.exports = Admin;


