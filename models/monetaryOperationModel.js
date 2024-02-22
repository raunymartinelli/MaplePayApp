const mongoose = require('mongoose');

const monetaryOperationSchema = new mongoose.Schema({
  operationType: {
    type: String,
    required: [true, 'Operation type is required'],
    enum: {
      values: ['deposit', 'withdrawal', 'transfer_out', 'transfer_in'],
      message: 'Operation type `{VALUE}` is not supported'
    }
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    validate: {
      validator: function(v) {
        // This will check if the amount has maximum two decimal places
        return /(\.\d{1,2})?$/.test(v);
      },
      message: props => `${props.value} is not a valid amount. Maximum two decimal places allowed.`
    }
  },
  date: {
    type: Date,
    default: Date.now,
    validate: {
      validator: function(v) {
        // This will ensure that the date is not set in the future
        return v <= new Date();
      },
      message: 'Date cannot be in the future'
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'User ID is required'],
    ref: 'User'
  },
  message:{
    type: String,
    required: true
  }
});

const MonetaryOperation = mongoose.model('MonetaryOperation', monetaryOperationSchema);

module.exports = MonetaryOperation;

