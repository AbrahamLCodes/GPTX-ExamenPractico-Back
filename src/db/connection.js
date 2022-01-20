const mysql = require('promise-mysql');
module.exports = {
    getDbConnection: async () => {
        return await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root123456789",
            database: "gptx_examen_db"
        });
    }
}