const { expressServer, httpServer } = require("./setup");
const jwt = require('jsonwebtoken');

require("./websockect");

const fakeData = require('./fakedata');

// Start expressServer 
const port = 3001;
httpServer.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

// Internal Routes 
expressServer.get("/", (request, response) => {
    response.send("Listening...");
})

// expressServer.post('/login', (request, response) => {
//     const email = request.body.email;
//     const registeredUsers = fakeData.registeredUsers;

//     const userIndex = registeredUsers.findIndex((registeredUser) => registeredUser.email === email);

//     if (userIndex === -1) {
//         response.status(404).end();
//     }

//     const authenticationData = {
//         jwtToken: "",
//         userInformation: {
//             id: registeredUsers[userIndex].id,
//             name: registeredUsers[userIndex].name,
//             email: registeredUsers[userIndex].email,
//             password: registeredUsers[userIndex].password,
//             avatarURL: registeredUsers[userIndex].avatarURL
//         }
//     }

//     authenticationData.jwtToken = jwt.sign(authenticationData, process.env.ACCESS_TOKEN_SECRET);

//     return response
//         .status(200)
//         .json(authenticationData);
// })



//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// require('dotenv').config()

// const express = require("express");
// const cors = require("cors");
// const http = require('http');
// const uuid = require('uuid');
// const jwt = require('jsonwebtoken');

// const { Server } = require("socket.io");

// const users = require("./routes/users");
// const fakeData = require('./fakedata');

// const expressServer = express();
// const port = 3001;

// const socketIOHTTPServer = http.createServer(expressServer);
// const socketIOServer = new Server(socketIOHTTPServer);

// // expressServer configurations 
// const allowedCORSOrigins = [
//     "http://localhost:3000", 
//     "https://localhost:3000",
//     "https://notes-client-sigma.vercel.app"
// ]
 
// expressServer.use(
//     cors({
//         credentials: true,
//         origin: allowedCORSOrigins
//     })
// );

// expressServer.use(express.json());

// // External Routes 
// expressServer.use("/users", users);

// // Start expressServer 
// socketIOHTTPServer.listen(port, () => {
//     console.log(`Listening on port ${port}`)
// })

