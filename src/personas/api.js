const connection = require("../db/connection");

module.exports = {
    getAll: async (req, res) => {
        const db = await connection.getDbConnection();
        const users = await db.query("SELECT * FROM personas");
        await db.end();
        res.send(users);
    },
    getOne: async (req, res) => {
        const db = await connection.getDbConnection();
        const id = req.query.id;
        let user = await db.query("SELECT * FROM personas WHERE id=" + id);
        user = user[0];
        await db.end();
        res.send(user)
    },
    create: async (req, res) => {
        const db = await connection.getDbConnection();
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
        nuevaPersona = nuevaPersona[0];
        await db.end();
        res.send(nuevaPersona)
    },
    update: async (req, res) => {
        const db = await connection.getDbConnection();
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
    },
    delete: async (req, res) => {
        const db = await connection.getDbConnection();
        const id = req.body.id;
        let user = await db.query("SELECT * FROM personas WHERE id=" + id);
        user = user[0];
        await db.query("DELETE FROM personas WHERE id=" + id);
        await db.end();
        res.send(user);
    }
}

