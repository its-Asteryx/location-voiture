const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

// Mongoose User Schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  familyName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 30,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    maxlength: 15,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 5,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  },
  profilePicture: {
    public_id: {
      type: String,
      default: null,
    },
    url: {
      type: String,
      default: "/images/profile.webp",
      
    }
  }
}, {
  timestamps: true,
});

// JWT generation method
UserSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

const User = mongoose.model('User', UserSchema);

// Joi Validation for Register
function validateRegisterUser(obj) {
  const schema = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    familyName: Joi.string().min(2).max(30).required(),
    phone: Joi.string().min(7).max(15).required(),
    email: Joi.string().email().min(5).max(30).required(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(obj);
}

// Joi Validation for Login
function validateLoginUser(obj) {
  const schema = Joi.object({
    email: Joi.string().email().min(5).max(30).required(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(obj);
}

module.exports = {
  User,
  validateRegisterUser,
  validateLoginUser,
};
