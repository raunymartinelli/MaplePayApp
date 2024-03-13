const User = require('../models/userModel');
const MonetaryOperation = require('../models/monetaryOperationModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// This function will format a date as 'mm/dd/yyyy, hh:mm:ss AM/PM'
function formatDate(date) {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
}


const userResolvers = {
  Query: {
    getAllUsers: async () => {
      try {
        const users = await User.find({})
            .populate({
              path: 'transactions',
              select: '_id operationType amount date user message balance'
            })
            .exec();

        return users.map(user => {
          const userObject = user.toObject(); // Convert the Mongoose document to a plain JavaScript object
          userObject.transactions = userObject.transactions.map(transaction => {
            return {
              ...transaction,
              // Ensure the date is formatted correctly
              date: formatDate(transaction.date),
            };
          });
          return userObject;
        });
      } catch (error) {
        console.error('Error getting all users:', error);
        throw new Error('Failed to get all users');
      }
    },




    getUserById: async (_, {_id}) => {
      try {
        const user = await User.findById(_id);
        if (!user) {
          throw new Error('User not found');
        }
        return user;
      } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw new Error('Error fetching user by ID');
      }
    },

    getUserBalance: async (_, {_id}) => {
      try {
        const user = await User.findById(_id);
        if (!user) {
          throw new Error('User not found');
        }
        return user.amount;
      } catch (error) {
        console.error('Error fetching user balance:', error);
        throw new Error('Error fetching user balance');
      }
    },
  },

  Mutation: {
    registerUser: async (_, {name, email, password, currentAddress, gender}) => {
      const existingUser = await User.findOne({email});
      if (existingUser) {
        throw new Error('User already exists with that email');
      }

      // const hashedPassword = await bcrypt.hash(, 10);
      const user = new User({
        name,
        email,
        gender,
        password,
        currentAddress,
        amount: 0, // Assuming the initial amount is 0
      });

      await user.save();

      const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: '1h'});

      return {token, user};
    },

    loginUser: async (_, { email, password }) => {
      try {
        // Find the user by their email
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('User not found. Please check your email and try again.');
        }

        // Compare the provided password with the hashed password in the database
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          throw new Error('Invalid password. Please check your password and try again.');
        }

        // User is found and password matches, generate a JWT
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        // Return the auth payload
        return { token, user };
      } catch (error) {
        console.error('Error logging in:', error.message);
        throw new Error('Login failed. Please try again later.');
      }
    },

    // User: {
    //   contacts: async (user) => {
    //     const contacts = await User.find({_id: {$in: user.contacts}});
    //     return contacts;
    //   },
    //   transactions: async (user) => {
    //     const transactions = await MonetaryOperation.find({user: user._id});
    //     return transactions;
    //   },
    // },
  }
};

module.exports = userResolvers;
