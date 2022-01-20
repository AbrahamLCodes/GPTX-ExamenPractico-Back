const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Rutas API Persona
require('./personas/routes')(app);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});