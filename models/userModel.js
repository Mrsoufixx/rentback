const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  avatar: {
    type: String,
  },
  firstName: {
    type: String,
    required: true
  },
 
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },

  phone: {
    type: String
  },
  address: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  // isAdmin: {
  //   type: Boolean,
  //   default: false
  // },
  // companyName: {
  //   type: String,
  // },
  // isRenter: {
  //   type: Boolean,
  //   default: false
  // },
  date: {
    type: String,
    default: Date.now
  },
  messages: [
    {
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        required: true
      },
      message: {
        type: String,
        required: true
      }
    }
  ],
  tokens: [
    {
      token: {
        type: String
      }
    }
  ]
});

// Hashing password
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// Generating token
userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);

    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

// Storing message in DB
userSchema.methods.addMessage = async function (name, email, phone, message) {
  try {
    this.messages = this.messages.concat({ name, email, phone, message });
    await this.save();
    return this.messages;
  } catch (error) {
    console.log(error);
  }
};

const User = mongoose.model('User', userSchema);

// User.create({
//   firstName:"admin",
//   lastName:"admin",
//   email:"admin@admin.admin",
//   password:"admin",
//   isAdmin:true
// })

module.exports = User;






