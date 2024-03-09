// path module 
const path = require('path');

// express module 
const express = require('express');
const bodyParser = require('body-parser');

// Create an instance of the express application
const app = express();


let projectData = {};

// BodyParser config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
app.use(express.static('dist'));

app.get('/', function (req, res) {
  res.sendFile(path.resolve('dist/index.html'));
});

// Post Route
app.post('/add', addInfo);

function addInfo(req, res) {
  projectData['depCity'] = req.body.depCity;
  projectData['arrCity'] = req.body.arrCity;
  projectData['depDate'] = req.body.depDate;
  projectData['weather'] = req.body.weather;
  projectData ['max_temp']= req.body.weather.max_temp;
 projectData ['min_temp']= req.body.weather.min_temp,
 projectData['country'] = req.body.country; 
 projectData['capital'] = req.body.capital; 
 projectData['population'] = req.body.population; 
  projectData['summary'] = req.body.summary;
  projectData['daysLeft'] = req.body.daysLeft;
  res.send(projectData);
}

  
// Setup Server
const port = 5500;
const server = app.listen(port, listening);

function listening() {
  console.log(`running on localhost:${port}`);}

  module.exports = {
    app,
    addInfo,
  };