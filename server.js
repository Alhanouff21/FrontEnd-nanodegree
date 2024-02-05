// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware */
// Here we are configuring express to use body-parser as middleware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross-origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// GET route that returns the projectData object
app.get('/all' ,(req,res)=>{

    res.send(projectData)
})


// Setup Server
const port = 8000;

app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`);
  });

// POST route
app.post('/weatherData' , (req , res)=>{

    projectData.date = req.body.date;
    projectData.temp = req.body.temp;
    projectData.content = req.body.content;
    projectData.clouds = req.body.clouds;
    res.send(projectData);

	console.log(projectData);

})