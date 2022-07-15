const express = require('express');
const jwt = require("jsonwebtoken");

const fakeData = require('../fakedata');

const router = express.Router();

router.post('/login', (request, response) => {
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

module.exports = router;