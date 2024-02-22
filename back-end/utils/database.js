const mongoose = require('mongoose');
const MonetaryOperation = require('../models/monetaryOperationModel')

const connectDatabase = async () => {
    const dbUri = process.env.MONGODB_URI;
    if (!dbUri) {
        console.error('MongoDB URI is not set in .env file');
        process.exit(1);
    }

    try {
        await mongoose.connect(dbUri, {

        });
        console.log('MongoDB connected successfully.');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

const updateOperationTypes = async () => {
    try {
        const result = await MonetaryOperation.updateMany(
            { operationType: 'transfer-out' },
            { $set: { operationType: 'transfer_out' } }
        );

        console.log('Update result:', result);
        mongoose.disconnect();
    } catch (error) {
        console.error('Error updating operation types:', error);

    }
};

module.exports = connectDatabase;


