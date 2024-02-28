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
    getAllMonetaryOperations: async (_, {_id}) => {
      try {
        let balance = 0;
        const operations = await MonetaryOperation.find({user: _id})
            .populate('user')
            .sort({date: 1});

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


    getUserBalance: async (_, {_id}) => {
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
    addFunds: async (_, {_id, amount}) => {
      let session = null;
      try {
        session = await mongoose.startSession();
        session.startTransaction();

        const user = await User.findById(_id).session(session);
        if (!user) {
          throw new Error('User not found');
        }
        if (user.name === null || user.name === undefined) {
          throw new Error('User name is null or undefined');
        }

        // Update the user's amount
        user.amount += amount;
        await user.save({ session });

        // Create the date string
        const date = new Date();
        const formattedDate = formatDate(date).toLocaleString();

        // Create a new monetary operation
        const newMonetaryOperation = new MonetaryOperation({
          operationType: 'deposit',
          amount,
          message: `An amount of ${amount} was added for user ${user.name} on ${formattedDate}.`,
          date: formattedDate,
          user: user._id,
        });

        // Save the monetary operation
        await newMonetaryOperation.save({ session });

        // Add the monetary operation to the user's transactions
        user.transactions.push(newMonetaryOperation._id);
        await user.save({ session });

        // Commit the transaction
        await session.commitTransaction();

        // Construct the response object
        const responseObject = {
          ...newMonetaryOperation.toObject(),
          message: `An amount of ${amount} was added for user ${user.name} on ${formattedDate}.`,
          date: formattedDate,
          user: {
            name: user.name,
            email: user.email
          }
        };

        return responseObject;
      } catch (error) {
        console.error('Error adding funds:', error);
        // Abort the transaction if an error occurs
        if (session) {
          await session.abortTransaction();
        }
        throw new Error('Failed to add funds');
      } finally {
        // End the session
        if (session) {
          session.endSession();
        }
      }
    },



    transferFunds: async (_, { fromUserId, toUserId, amount }) => {
      let session;
      try {
        if (amount <= 0) {
          throw new Error('Invalid amount: Amount must be positive');
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

        const formattedDate = formatDate(new Date()); // Use the same formatDate function

        const messageOut = `Transferred ${amount} to ${toUser.name} on ${formattedDate}.`;
        const messageIn = `Received ${amount} from ${fromUser.name} on ${formattedDate}.`;

        const transferOutOperation = new MonetaryOperation({
          operationType: 'transfer_out',
          amount: -amount,
          date: formattedDate,
          user: fromUser._id,
          message: messageOut
        });

        const transferInOperation = new MonetaryOperation({
          operationType: 'transfer_in',
          amount: amount,
          date: formattedDate,
          user: toUser._id,
          message: messageIn
        });

        await transferOutOperation.save({ session });
        await transferInOperation.save({ session });

        // Link the operations to the users' transactions
        fromUser.transactions.push(transferOutOperation._id);
        toUser.transactions.push(transferInOperation._id);
        await fromUser.save({ session });
        await toUser.save({ session });

        await session.commitTransaction();

        // Construct the result according to the addFunds output
        return {
          _id: transferOutOperation._id,
          amount: transferOutOperation.amount,
          message: transferOutOperation.message,
          operationType: transferOutOperation.operationType,
          user: {
            name: fromUser.name,
            email: fromUser.email
          },
          date: formattedDate, // Use the formatted date
        };
      } catch (error) {
        console.error('Error transferring funds:', error);
        if (session && session.inTransaction()) {
          await session.abortTransaction();
        }
        throw new Error('Failed to transfer funds');
      } finally {
        if (session) {
          session.endSession();
        }
      }
    },


    withdrawFunds: async (_, { _id, amount }) => {
      let session = null;
      try {
        session = await mongoose.startSession();
        session.startTransaction();

        const user = await User.findById(_id).session(session);

        if (!user) {
          throw new Error('User not found');
        }

        if (user.amount < amount) {
          throw new Error('Insufficient funds');
        }

        user.amount -= amount; // Update the user's amount
        await user.save({ session });

        const formattedDate = formatDate(new Date()); // Use your formatDate function

        // Create a new monetary operation
        const newMonetaryOperation = new MonetaryOperation({
          operationType: 'withdrawal',
          amount: -amount, // Withdrawals are negative
          date: formattedDate, // Assuming your schema expects a string here
          user: user._id,
          message: `Withdrawal of ${amount} by ${user.name} on ${formattedDate}.`
        });

        // Save the new monetary operation
        await newMonetaryOperation.save({ session });

        // Add the monetary operation to the user's transactions
        user.transactions.push(newMonetaryOperation._id);
        await user.save({ session });

        await session.commitTransaction();

        // Construct the response object
        const responseObject = {
          ...newMonetaryOperation.toObject(),
          message: `Withdrawal of ${amount} by ${user.name} on ${formattedDate}.`,
          user: {
            name: user.name,
            email: user.email
          },
          date: formattedDate, // Use the formatted date
        };

        return responseObject;
      } catch (error) {
        console.error('Error withdrawing funds:', error);
        if (session && session.inTransaction()) {
          await session.abortTransaction();
        }
        throw new Error('Failed to withdraw funds');
      } finally {
        if (session) {
          session.endSession();
        }
      }
    },
  },
};

module.exports = monetaryOperationResolvers;
