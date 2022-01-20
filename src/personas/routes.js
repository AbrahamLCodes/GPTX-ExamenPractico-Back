const personasModule = require("./api");
module.exports = (app) => {
    app.get("/personas", personasModule.getAll);
    app.get("/persona", personasModule.getOne);
    app.post("/persona", personasModule.create);
    app.put("/persona", personasModule.update);
    app.delete("/persona", personasModule.delete);
}