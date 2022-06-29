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
  response.send('Hello World!');
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