const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

app.all("/*", (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, X-Requested-With');
  next();
});


// Rutas API Persona
require('./personas/routes')(app);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});