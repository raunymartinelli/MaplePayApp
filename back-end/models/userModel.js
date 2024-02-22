const mongoose = require('mongoose');
const { isEmail } = require('validator'); // A library for validating emails
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['Male', 'Female', 'Non-Binary', 'Prefer Not to Say'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please provide a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long']
    // Consider adding more complexity requirements for passwords here.
  },
  currentAddress: {
    type: String,
    required: [true, 'Current address is required'],
    trim: true,
    maxlength: [300, 'Address cannot be more than 300 characters']
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount cannot be negative']
  },
  contacts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  transactions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MonetaryOperation'
  }]
});

// Password hashing middleware
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  // Hash the password before saving the user model
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;

