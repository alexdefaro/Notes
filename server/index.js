const express = require("express");
const uuid = require('uuid');
const cors = require("cors");

const users = require("./routes/users");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use("/users", users);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

app.get("/", (request, response) => {
    response.send("Listening...");
})

app.post('/login', (request, response) => {

    console.log('NODE')

    
    const email = request.body.email;
    const registeredUsers = [
        { id: 1, name: "Alexandre Ramos", email: "alexdefaro@gmail.com", avatarURL: "https://avatars.githubusercontent.com/u/8345376?v=4" },
        { id: 2, name: "Alvaro Filho", email: "alvaroalberto@gmail.com", avatarURL: "https://avatars.githubusercontent.com/u/367136?v=4" },
        { id: 3, name: "Marcio Luiz", email: "marcio.luizsf@gmail.com", avatarURL: "https://avatars.githubusercontent.com/u/592777?v=4" }
    ];

    const userIndex = registeredUsers.findIndex((registeredUser) => registeredUser.email === email);

    if (userIndex === -1) {
        response.status(400).end();
    }

    const authenticationData = {
        jwtToken: uuid.v4(),
        userInformation: {
            id: registeredUsers[userIndex].id,
            name: registeredUsers[userIndex].name,
            email: registeredUsers[userIndex].email,
            password: registeredUsers[userIndex].password,
            avatarURL: registeredUsers[userIndex].avatarURL
        }
    }

    response.json(authenticationData);
})

