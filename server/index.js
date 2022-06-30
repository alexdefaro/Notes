const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

// Endpoints 
app.get('/', (request, response) => {
    response.send("Listening...");
})

app.post('/login', (request, response) => {
    const email = request.body.email;
    const registeredUsers = [
        { id: 1, name: "Alexandre Ramos", email: "alexdefaro@gmail.com",    avatarURL: "https://avatars.githubusercontent.com/u/8345376?v=4" },
        { id: 2, name: "Alvaro Filho",    email: "alvaroalberto@gmail.com", avatarURL: "https://avatars.githubusercontent.com/u/367136?v=4" },
        { id: 3, name: "Marcio Luiz",     email: "marcio.luizsf@gmail.com", avatarURL: "https://avatars.githubusercontent.com/u/592777?v=4" }
    ];

    const userIndex = registeredUsers.findIndex((registeredUser) => registeredUser.email === email);

    if (userIndex === -1) {
        response.status(400).end();
    }

    const userInformation = {
        id: registeredUsers[userIndex].id,
        name: registeredUsers[userIndex].name,
        email: registeredUsers[userIndex].email,
        password: registeredUsers[userIndex].password,
        avatarURL: registeredUsers[userIndex].avatarURL
    }

    response.json(userInformation);
})

app.post('/users', (request, response) => {
    const params = {
        name: request.body.name,
        email: request.body.email,
        avatar_url: request.body.avatar_url
    }

    response.json(params);
})

app.put('/user', (request, response) => {
    response.send('Got a PUT request at /user');
})

app.delete('/user', (request, response) => {
    response.send('Got a DELETE request at /user');
})