require('dotenv').config()

const express = require("express");
const cors = require("cors");
const http = require('http');
// const jwt = require('jsonwebtoken');

const { Server } = require("socket.io");

const users = require("./routes/users");
const authentication = require("./routes/authentication");

const expressServer = express();

const httpServer = http.createServer(expressServer);
const socketIOServer = new Server(httpServer);

// expressServer configurations
const allowedCORSOrigins = [
    "http://localhost:3000",
    "https://localhost:3000",
    "https://notes-client-sigma.vercel.app"
]

expressServer.use(express.json());
expressServer.use(
    cors({
        credentials: true,
        origin: allowedCORSOrigins
    })
);

// External Routes
expressServer.use("/users", users);
expressServer.use("/", authentication);


// // Start expressServer
// httpServer.listen(port, () => {
//     console.log(`Listening on port ${port}`)
// })

module.exports = { socketIOServer, expressServer, httpServer }