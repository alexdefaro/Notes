const express = require('express');
const router = express.Router();

const validateAuthenticationToken = require("../authentication");
const fakeData = require('../fakedata');

router.get("/", validateAuthenticationToken, (request, response) => {
    const registeredUsers = fakeData.registeredUsers;

    response.json(registeredUsers);
})

router.get("/:email", validateAuthenticationToken, (request, response) => {
    const registeredUsers = fakeData.registeredUsers;

    const email = request.params.email ?? "";
    const userIndex = registeredUsers.findIndex((registeredUser) => registeredUser.email === email);

    if (userIndex === -1) {
        response.status(404).end();
    }

    response.json(registeredUsers[userIndex]);
})

router.post('/', (request, response) => {
    const params = {
        name: request.body.name,
        email: request.body.email,
        avatar_url: request.body.avatar_url
    }

    response.json(params);
})

router.put('/', (request, response) => {
    response.send('Got a PUT request at /user');
})

router.delete('/', (request, response) => {
    response.send('Got a DELETE request at /user');
})

module.exports = router;