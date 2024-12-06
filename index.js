const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});





const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

// Everything above is boilerplate; implementation starts below

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

// Define data structures: a Map with userId/username key-value pair, and an Object with Objects inside, each containing userId, description, duration, and date inside
const users = new Map();
const exercises = {};
let userId = 0;

// Add a new user; no functionality to check for repeated usernames yet
app.post('/api/users', (req, res) => {
  username = req.body.username;
  userId++;
  users.set(userId.toString(), username);  
  res.json({ username: username, _id: userId });
});

// Get a list of all users
app.get('/api/users', (req, res) => {
  const usersArray = [...users.entries()].map(([id, username]) => ({ username, _id: id }));
  res.json(usersArray);
})

// Add a new exercise
app.post('/api/users/:_id/exercises', (req, res) => {

});

// Retrieve exercise log
app.get('/api/users/:_id/logs?[from][&to][&limit]', (req, res) => {

});
