const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const MonetaryOperation = require('../models/monetaryOperationModel');
const mongoose = require('mongoose');


const formatDate = (date) =>{
  return date.toLocaleString();
}

const monetaryOperationResolvers = {
  Query: {
    getAllMonetaryOperations: async (_, { _id }) => {
      try {
        let balance = 0;
        const operations = await MonetaryOperation.find({ user: _id })
            .populate('user')
            .sort({ date: 1 });

        const operationsWithBalance = operations.map(operation => {
          // Provide a default message if none exists
          const operationMessage = operation.message || 'No message provided.';

          // Format the date
          const formattedDate = new Date(operation.date).toLocaleString();

          // Adjust the balance based on the operation type
          if (operation.operationType === 'deposit' || operation.operationType === 'transfer_in') {
            balance += operation.amount;
          } else if (operation.operationType === 'withdrawal' || operation.operationType === 'transfer_out') {
            // Adjust for withdrawal or transfer out
            balance -= operation.amount;
          }

          // Ensure user object is populated with a name
          if (!operation.user || !operation.user.name) {
            throw new Error('User data is missing');
          }

          return {
            ...operation.toObject(),
            message: operationMessage, // Use the default message if necessary
            balance,
            date: formattedDate,
            user: {
              ...operation.user.toObject(),
              name: operation.user.name,
            },
          };
        });

        return operationsWithBalance;
      } catch (error) {
        console.error('Error fetching monetary operations:', error.message);
        throw new Error('Failed to fetch monetary operations');
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
        console.error('Error fetching user balance:', error.message);
        throw new Error('Failed to fetch user balance');
      }
    },
  },

  Mutation: {
    addFunds: async (_, { _id, amount }) => {
      // Assuming _id is the ID of the user to whom funds are being added
      try {
        const user = await User.findById(_id);
        if (!user) {
          throw new Error('User not found');
        }

        user.amount += amount;
        await user.save();

        const date = new Date();
        const formattedDate = formatDate(date).toLocaleString();
        const message = `An amount of ${amount} was added for user ${user.name} on ${formattedDate}.`;

        const newMonetaryOperation = new MonetaryOperation({
          operationType: 'deposit',
          amount,
          message,
          date: formattedDate,
          user: _id,
        });

        await newMonetaryOperation.save();
        return {
          ...newMonetaryOperation.toObject(),
          message, // Include the message in the response
        };
      } catch (error) {
        console.error('Error adding funds:', error.message);
        throw new Error('Failed to add funds');
      }
    },

    transferFunds: async (_, { fromUserId, toUserId, amount }) => {
      let session;
      try {
        if (amount < 0) {
          throw new Error('Invalid amount: Amount cannot be negative');
        }

        session = await mongoose.startSession();
        session.startTransaction();

        const fromUser = await User.findById(fromUserId).session(session);
        const toUser = await User.findById(toUserId).session(session);

        if (!fromUser || !toUser) {
          throw new Error('One or both users not found');
        }

        if (fromUser.amount < amount) {
          throw new Error('Insufficient funds');
        }

        fromUser.amount -= amount;
        toUser.amount += amount;
        await fromUser.save({ session });
        await toUser.save({ session });

        const transferOutOperation = new MonetaryOperation({
          operationType: 'transfer_out',
          amount: -amount,
          date: new Date().toISOString(),
          user: fromUserId,
          message: `Transferred ${amount} to ${toUser.name} on ${new Date().toISOString()}.`
        });

        await transferOutOperation.save({ session });

        const transferInOperation = new MonetaryOperation({
          operationType: 'transfer_in',
          amount,
          date: new Date().toISOString(),
          user: toUserId,
          message: `Received ${amount} from ${fromUser.name} on ${new Date().toISOString()}.`
        });

        await transferInOperation.save({ session });

        await session.commitTransaction();
        session.endSession();

        // Return the 'transferOutOperation', which now includes an _id field
        return transferOutOperation;
      } catch (error) {
        if (session) {
          await session.abortTransaction();
          session.endSession();
        }
        console.error('Error transferring funds:', error.message);
        throw new Error('Failed to transfer funds');
      }
    },

    withdrawFunds: async (_, { _id, amount }) => {
      try {
        const user = await User.findById(_id);

        if (!user) {
          throw new Error('User not found');
        }

        if (user.amount < amount) {
          throw new Error('Insufficient funds');
        }

        user.amount -= amount;
        await user.save();

        // Format the date for the message
        const date = new Date().toISOString();
        // Create a message for the operation
        const message = `Withdrawal of ${amount} by ${user.name} was successful on ${date}`;

        const newMonetaryOperation = new MonetaryOperation({
          operationType: 'withdrawal',
          amount,
          date: date,
          user: _id,
          message: message, // Add the message here
        });

        await newMonetaryOperation.save();
        return newMonetaryOperation;
      } catch (error) {
        console.error('Error withdrawing funds:', error.message);
        throw new Error('Failed to withdraw funds');
      }
    },

  },
};

module.exports = monetaryOperationResolvers;
