// Importing required modules
const express = require('express');
require('dotenv').config();
const db = require('./config/mongoose');

// Setting the port number for the server
const port = process.env.PORT || 1100; // Use the PORT value from the .env file if available

// Creating an instance of the express application
const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

//Extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.use(express.static('./assets'))


//set view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.urlencoded({ extended: true }));

// Middleware for routing
app.use('/', require('./routes'));

// Starting the server and listening on the specified port
app.listen(port, () => {
  console.log(`Server Started on port ${port}`);
});
