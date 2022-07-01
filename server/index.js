require('dotenv').config()

const express = require("express");
const uuid = require('uuid');
const cors = require("cors");
const jwt = require('jsonwebtoken');

const users = require("./routes/users");

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
    const registeredUsers = [
        { id: 1, name: "Alexandre Ramos", email: "alexdefaro@gmail.com", avatarURL: "https://avatars.githubusercontent.com/u/8345376?v=4" },
        { id: 2, name: "Alvaro Filho", email: "alvaroalberto@gmail.com", avatarURL: "https://avatars.githubusercontent.com/u/367136?v=4" },
        { id: 3, name: "Marcio Luiz", email: "marcio.luizsf@gmail.com", avatarURL: "https://avatars.githubusercontent.com/u/592777?v=4" }
    ];

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

