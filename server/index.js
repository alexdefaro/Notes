require('dotenv').config()

const express = require("express");
const uuid = require('uuid');
const cors = require("cors");
const jwt = require('jsonwebtoken');

const users = require("./routes/users");

const fakeData = require('./fakedata');


const server = express();
const port = 3001;

// Server configurations 
const allowedCORSOrigins = [
    "http://localhost:3000", "https://localhost:3000",
]

server.use(
    cors({
        credentials: true,
        origin: allowedCORSOrigins
    })
);

server.use(express.json());

// External Routes 
server.use("/users", users);

// Start server 
server.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

// Internal Routes 
server.get("/", (request, response) => {
    response.send("Listening...");
})

server.post('/login', (request, response) => {
    const email = request.body.email;
    const registeredUsers = fakeData.registeredUsers;

    const userIndex = registeredUsers.findIndex((registeredUser) => registeredUser.email === email);

    if (userIndex === -1) {
        response.status(404).end();
    }

    const authenticationData = {
        jwtToken: "",
        userInformation: {
            id: registeredUsers[userIndex].id,
            name: registeredUsers[userIndex].name,
            email: registeredUsers[userIndex].email,
            password: registeredUsers[userIndex].password,
            avatarURL: registeredUsers[userIndex].avatarURL
        }
    }

    authenticationData.jwtToken = jwt.sign(authenticationData, process.env.ACCESS_TOKEN_SECRET);

    return response
        .status(200)
        .json(authenticationData);
})

