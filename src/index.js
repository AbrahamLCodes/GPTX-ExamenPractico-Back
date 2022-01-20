const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

const mysql = require('promise-mysql');
const getDbConnection = async () => {
  return await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123456789",
    database: "gptx_examen_db"
  });
}

app.get("/personas", async (req, res) => {
  const db = await getDbConnection();
  const users = await db.query("SELECT * FROM personas");
  await db.end();
  res.send(users);
});

app.get("/persona", async (req, res) => {
  const db = await getDbConnection();
  const id = req.query.id;
  const user = await db.query("SELECT * FROM personas WHERE id=" + id);
  await db.end();
  res.send(user[0]);
});

app.post("/persona", async (req, res) => {
  const db = await getDbConnection();
  const body = req.body;

  //Construir un string de asignacion de campos para no escribirlos uno por uno
  let valores = "DEFAULT, ";
  Object.keys(body).forEach(key => {
    const asignacion = "'" + body[key] + "', "
    valores += asignacion;
  });

  //Borrar los ultimos 2 digitos para que no marque error de SQL Syntax
  valores = valores.substring(0, valores.length - 2);
  //Construir el query completo
  const query = "INSERT INTO personas VALUES(" + valores + ")";
  await db.query(query).catch(err => {
    if (err) {
      res.send({
        err: 505,
        message: "No se pudo completar el query"
      });
    }
  });

  let nuevaPersona = await db.query("SELECT * FROM personas ORDER BY id DESC LIMIT 1;");
  await db.end();
  nuevaPersona = nuevaPersona[0];
  res.send(nuevaPersona)
})

app.put("/persona", async (req, res) => {
  const db = await getDbConnection();
  const body = req.body;

  let stringCampos = "";

  const id = body.id;

  //Construir un string de asignacion de campos para no escribirlos uno por uno
  Object.keys(body).forEach(key => {
    if (key !== "id") {
      const asignacion = key + "=" + "'" + body[key] + "', "
      stringCampos += asignacion;
    }
  });
  //Borrar los ultimos 2 digitos para que no marque error de SQL Syntax
  stringCampos = stringCampos.substring(0, stringCampos.length - 2);
  //Construir el query compelto
  const query = "UPDATE personas SET " + stringCampos + " WHERE id=" + id;


  await db.query(query).catch(err => {
    if (err) {
      res.send({
        error: 505,
        message: "No se pudo completar el query"
      })
    }
  })

  const personaEditada = await db.query("SELECT * FROM personas WHERE id=" + id);
  await db.end();
  res.send(personaEditada[0]);
});

app.delete("/persona", async (req, res) => {
  const db = await getDbConnection();
  const id = req.body.id;
  let user = await db.query("SELECT * FROM personas WHERE id=" + id);
  user = user[0];
  await db.query("DELETE FROM personas WHERE id=" + id);
  await db.end();
  res.send(user);
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});