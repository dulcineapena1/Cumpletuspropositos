var db = require("../models");

module.exports = function(app) {
  

//---INICIO PARTE LOGIN
    //Registrar Usuario (en login)
    app.post("/api/registro", function(req, res) {
      db.Usuario.create(req.body).then(function(dbUsuario) {
        res.json(dbUsuario);
      });
    });
//--FINAL PARTE LOGIN

//--INICIO PARTE CATEGORÍA
    //Crear una nueva categoria con la data del req.body (modal)
    app.post("/api/categorias", function(req, res) {
      console.log(req.body);
      db.Categorias.create(req.body).then(function(dbCategorias) {
        res.json(dbCategorias);
      });
    });

    // Obtener el resultado de la api en esa ruta
    app.get("/api/categorias", function(req, res) {
      db.Categorias.findAll({}).then(function(dbCategorias) {
        res.json(dbCategorias);
      });
    });
//--FIN PARTE CATEGORÍA

//--INICIO PARTE PROPÓSITO
    //Registrar Propósito (en modal)
    //ESTO ES PARA MOSTRARLOS YA CUADO ESTÈN HECHOS
    // Find all Propósitos and return them to the user with res.json
    app.get("/api/propositos", function(req, res) {
      db.Propositos.findAll({}).then(function(dbPropositos) {
        res.json(dbPropositos);
      });
    });

    //Crear un propósito con la data del req.body (modal)
    app.post("/api/propositos", function(req, res) {
      console.log(req.body);
      db.Propositos.create(req.body).then(function(dbPropositos) {
        res.json(dbPropositos);
      });
    });
//--FIN PARTE PROPÓSITO

//--INICIO PARTE TODO
    //Registrar TODO (en modal)
    //ESTO ES PARA MOSTRARLOS YA CUADO ESTÉN HECHOS
    //Find all TODO and return them to the user with res.json
    app.get("/api/todos", function(req, res) {
      db.ToDos.findAll({}).then(function(dbToDos) {
        res.json(dbToDos);
      });
    });

    //Crear un todo con la data del req.body (modal)
    app.post("/api/todos", function(req, res) {
      console.log(req.body);
      db.ToDos.create(req.body).then(function(dbToDos) {
        res.json(dbToDos);
      });
    });
//--FIN PARTE TODO








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
