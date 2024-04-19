const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UPDATE_USER_FIELD_MUTATION, ADD_PROFILE_PICTURE_MUTATION } = require('../');
const { gql } = require('apollo-server-express');

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

    getUserById: async (_, { _id }) => {
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

    getUserBalance: async (_, { _id }) => {
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
    registerUser: async (_, { name, email, password, currentAddress, gender }) => {
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error('User already exists with that email');
        }

        const user = new User({
          name,
          email,
          gender,
          password,
          currentAddress,
          amount: 0, // Assuming the initial amount is 0
        });

        await user.save();

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        return { token, user };
      } catch (error) {
        console.error('Error registering user:', error);
        throw new Error('Failed to register user');
      }
    },

    loginUser: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('User not found. Please check your email and try again.');
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          throw new Error('Invalid password. Please check your password and try again.');
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        return { token, user };
      } catch (error) {
        console.error('Error logging in:', error);
        throw new Error('Login failed. Please try again later.');
      }
    },

    updateUserField: async (_, { _id, field, value }) => {
      try {
        const user = await User.findById(_id);
        if (!user) {
          throw new Error('User not found');
        }
        user[field] = value;
        await user.save();
        return user;
      } catch (error) {
        console.error('Error updating user field:', error);
        throw new Error('Failed to update user field');
      }
    },

    addProfilePicture: async (_, { _id, picture }) => {
      try {
        const user = await User.findById(_id);
        if (!user) {
          throw new Error('User not found');
        }
        // Logic to add profile picture
        return user;
      } catch (error) {
        console.error('Error adding profile picture:', error);
        throw new Error('Failed to add profile picture');
      }
    },
  }
};

module.exports = userResolvers;
