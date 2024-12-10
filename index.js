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

// Define data structures: a Map with userId/username key-value pair, and a Map with _id as a key, and the value being a collection of arrays, each represeting an exercise session
const users = new Map();
const exercises = new Map();
let idIndex = 0;
let userId = "";
let _id = "";
const exerciseCountMap = new Map();

function addExerciseSession(_id, exerciseSession) {
  if (!exercises.has(_id)) {
    exercises.set(_id, []);
  }
  exercises.get(_id).push(exerciseSession);
}

// Add a new user; no functionality to check for repeated usernames yet
app.post('/api/users', (req, res) => {
  const username = req.body.username;
  idIndex++;
  _id = idIndex.toString();
  users.set(_id, username);  
  res.json({ username, _id });
});

// Get a list of all users
app.get('/api/users', (req, res) => {
  const usersArray = [...users.entries()].map(([id, username]) => ({ username, _id: id }));
  res.json(usersArray);
})

// Add a new exercise
app.post('/api/users/:_id/exercises', (req, res) => {
  let date;
  if (req.body.date) {
    date = new Date(req.body.date);
  } else {
    date = new Date();
  }
  dateStr = date.toUTCString();
  let parts = dateStr.split(' ');
  let rearrangedDate = `${parts[0].replace(',', '')} ${parts[2]} ${parts[1]} ${parts[3]}`;

  _id = req.params._id;
  username = users.get(_id);
  duration = parseInt(req.body.duration);
  description = req.body.description;

  let exerciseSession = {
    _id,
    username,
    date: rearrangedDate,
    duration,
    description,
  };

  addExerciseSession(_id, exerciseSession);

  res.json({
    _id,
    username,
    date: rearrangedDate,
    duration,
    description,
  });
});

// Retrieve exercise log
app.get('/api/users/:_id/logs', (req, res) => {

  let from = req.query.from;
  let to = req.query.to;
  let limit = req.query.limit;

  _id = req.params._id;
  console.log("_id:", _id);
  let log = exercises.get(_id) || [];
  console.log("Log:", log);

  res.json({
    _id,
    count: 12345,
    log: log,
   });
});
