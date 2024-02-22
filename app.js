const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema/schema');
const userResolvers = require('./resolvers/userResolver');
const monetaryOperationResolver = require('./resolvers/monetaryOperationResolver'); // Import the monetaryOperationResolver
const connectDatabase = require('./utils/database');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const app = express();

// Connect to the database
connectDatabase();

// Body parser middleware
app.use(express.json());

// Set up Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers: [userResolvers, monetaryOperationResolver],
    context: ({ req }) => {
        // Attempt to retrieve a token from the header
        const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : '';
        // If the token exists, verify it
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                return { user: decoded };
            } catch (e) {
                console.log('Invalid or expired token');
                throw new Error('Invalid or expired token');
            }
        }
    },
});

// Function to start the Apollo server
async function startServer() {
    // Start the Apollo server
    await server.start();

    // Apply Apollo GraphQL middleware and set the path to /api
    server.applyMiddleware({ app, path: '/api' });
}

// Call startServer to initiate the server start process
startServer();

module.exports = { app, server };

