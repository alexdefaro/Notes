const express = require('express');
const router = express.Router();

router.get("/", (request, response) => {
    const registeredUsers = [
        { id: 1, name: "Alexandre Ramos", email: "alexdefaro@gmail.com", avatarURL: "https://avatars.githubusercontent.com/u/8345376?v=4" },
        { id: 2, name: "Alvaro Filho", email: "alvaroalberto@gmail.com", avatarURL: "https://avatars.githubusercontent.com/u/367136?v=4" },
        { id: 3, name: "Marcio Luiz", email: "marcio.luizsf@gmail.com", avatarURL: "https://avatars.githubusercontent.com/u/592777?v=4" }
    ];


    response.send(registeredUsers); 
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