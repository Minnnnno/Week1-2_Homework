const express = require('express');
const path = require('path');
const ApiRouter = require('./routers/api');

// The web server
const app = express();

// To handle body
app.use(express.json());

// Web Server
app.use(express.static(path.join(__dirname, 'public')));

// APIs
app.use('/api', ApiRouter);

// TODO: 404 Handler

// TODO: Error Handler

// Listen to port 8000
app.listen(8000, function () {
  console.log('App listening on port 8000');
});
