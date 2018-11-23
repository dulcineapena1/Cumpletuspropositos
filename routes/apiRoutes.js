var db = require("../models");

module.exports = function(app) {
  // Get all examples
  // app.get("/api/examples", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.json(dbExamples);
  //   });
  // });

  app.post("/api/registro", function(req, res) {
    db.Usuario.create({
      Nombre: req.body.nombrereg,
      Apaterno: req.body.apaterno,
      Amaterno: req.body.amaterno,
      Email: req.body.emailreg,
      Telefono: req.body.telefonoreg,
      Usuario: req.body.usuario,
      Contrasena: req.body.contrasena
    }).then(function(dbUsuario) {
      res.json(dbUsuario);
    });
  });

  // // Create a new example
  // app.post("/api/examples", function(req, res) {
  //   db.Example.create(req.body).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(
  //     dbExample
  //   ) {
  //     res.json(dbExample);
  //   });
  // });
};
