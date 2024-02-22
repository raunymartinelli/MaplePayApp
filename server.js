const http = require('http');
const { app, server } = require('./app'); // Adjust the path as necessary
require('dotenv').config();

const PORT = process.env.PORT || 4000;

const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/api`); // Assuming your GraphQL endpoint is '/api'
});

