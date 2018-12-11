var db = require("../models");

module.exports = function(app) {
  
//---INICIO PARTE LOGIN
<<<<<<< HEAD
    //REGISTRAR usuario nuevo
    app.post("/api/usuario", function(req, res) {
      db.Usuario.create(req.body).then(function(dbUsuario) {
        res.json(dbUsuario);
      });
    });

    //OBTENER LO POSTEADO Registrar Usuario 
    // Find all Usuario and return them to the user with res.json
    app.get("/api/usuario", function(req, res) {
      db.Usuario.findAll({}).then(function(dbUsuario) {
        res.json(dbUsuario);
      });
    });

    //ENCONTRAR EL QUE COINCIDA con el nombre como parámetro :usuario
    app.get("/api/usuario/:usuario", function(req, res) {
      db.Usuario.findOne({
        where: {
          Usuario: req.params.usuario
        }
      }).then(function(dbUsuario) {
        res.json(dbUsuario);
      });
    });
//--FINAL PARTE LOGIN
=======
  //Registrar Usuario (en login)
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

  app.post("/api/aplicacion", function(req, res) {
    var username = req.body.usuariolog,
      password = req.body.contrasenalog;

    console.log(username);
    console.log(password);

    db.Usuario.findAll({
      where: { Usuario: username, Contrasena: password }
    }).then(function(user) {
      if (!user) {
        res.redirect("/");
        console.log("valio");
      } else {
        console.log("quedo");
        res.redirect("http://localhost:3000/aplicacion");
      }
    });
  });

  app.get("/aplicacion", function(req, res) {
    res.render("aplicacion");
  });
    //--FINAL PARTE LOGIN

>>>>>>> 8d518ff82f20a65219be7de9542adef7fbcf470c

  //--INICIO PARTE CATEGORÍA (esto no es necesario ahorita que corra, puesto que para una primera fase del proyecto
    // las categorías se insertan en schema. Eso será útil cuando el uuario pueda crear sus propias categorías)

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

  //POSTER CREAR un propósito con la data del req.body (modal)
  app.post("/api/propositos", function(req, res) {
    console.log(req.body);
    db.Propositos.create(req.body).then(function(dbPropositos) {
      res.json(dbPropositos);
    });
  });


  //OBTENER LO POSTEADO Registrar Propósito (en modal)
  // Find all Propósitos and return them to the user with res.json
  app.get("/api/propositos", function(req, res) {
    db.Propositos.findAll({}).then(function(dbPropositos) {
      res.json(dbPropositos);
    });
  });


  //ENCONTRAR EL QUE COINCIDA Encontrar un propósito en esa url según el idPropósito que le pongas en :id
  app.get("/api/propositos/:id", function(req, res) {
    db.Propositos.findOne({
      where: {
        idProposito: req.params.id
      }
    }).then(function(dbPropositos) {
      res.json(dbPropositos);
    });
  });


  //BORRAR un propósito de la base de datos
  app.delete("/api/propositos/:id", function(req, res) {
    db.Propositos.destroy({
      where: {
        idProposito: req.params.id
      }
    }).then(function(dbPropositos) {
      res.json(dbPropositos);
    });
  });

  app.put("/api/propositos", function (req, res) {
    db.Propositos.update(
      {Comentarios: req.body.Comentarios}, //Como solo quiero actualizar el Status, lo coloco aquí
      {where: {IdProposito:req.body.IdProposito}}
    )
      .then(function(dbPropositos) {
      res.json(dbPropositos);;
    });
  });

    //--FIN PARTE PROPÓSITO

<<<<<<< HEAD
    //ENCONTRAR EL QUE COINCIDA Encontrar un propósito en esa url según el IdUsuario que le pongas en :id
    app.get("/api/propositos/:id", function(req, res) {
      db.Propositos.findAll({ //era findOne
        where: {
          IdUsuario: req.params.id // era idProposito
        }
      }).then(function(dbPropositos) {
        res.json(dbPropositos);
      });
=======
    //--INICIO PARTE TODO
  //---______________ToDo by IdTodo
  app.get("/api/todosidtodos/", function(req, res) {
    db.ToDos.findAll({}).then(function(dbToDos) {
      res.json(dbToDos);
>>>>>>> 8d518ff82f20a65219be7de9542adef7fbcf470c
    });
  });

  app.get("/api/todosidtodos/:id", function(req, res) {
    db.ToDos.findAll({//aquí era findOne
      where: {
        IdTodo: req.params.id,
      },
      limit:30
    }).then(function(dbToDos) {
      res.json(dbToDos);
    });
  });

  // app.delete("/api/todosidtodos/:id", function(req, res) {
  //   db.ToDos.destroy({
  //     where: {
  //       idProposito: req.params.id
  //     }
  //   }).then(function(dbPropositos) {
  //     res.json(dbPropositos);
  //   });
  // });

 

  app.put("/api/todosidtodos", function (req, res) {
    db.ToDos.update(
      {IdStatus: req.body.IdStatus}, //Como solo quiero actualizar el Status, lo coloco aquí
      {where: {IdTodo:req.body.IdTodo}}
    )
      .then(function(dbToDos) {
      res.json(dbToDos);;
    });
  });

<<<<<<< HEAD
    //ACTUALIZAR el progreso en tabla propósito
    app.put("/api/propositos", function (req, res) {
      db.Propositos.update(
        {Progreso: req.body.Progreso}, //Como solo quiero actualizar el Status, lo coloco aquí
        {where: {IdProposito:req.body.IdProposito}}
      )
      .then(function(dbPropositos) {
        res.json(dbPropositos)
      })
     
     })

//--FIN PARTE PROPÓSITO
=======
   
      
>>>>>>> 8d518ff82f20a65219be7de9542adef7fbcf470c

  //---_______________

<<<<<<< HEAD
//--INICIO PARTE TODO
    //---______________ToDo by IdUsuario
    app.get("/api/todosidusuario/:id", function(req, res) {
      db.ToDos.findAll({//aquí era findOne
        where: {
          IdUsuario: req.params.id,
        },
        limit:30
      }).then(function(dbToDos) {
        res.json(dbToDos);
      });
    });
    //---______________Fin ToDo by IdUsuario




    //---______________ToDo by IdTodo
    app.get("/api/todosidtodos/", function(req, res) {
      db.ToDos.findAll({}).then(function(dbToDos) {
        res.json(dbToDos);
      });
    });
    
    app.get("/api/todosidtodos/:id", function(req, res) {
      db.ToDos.findAll({//aquí era findOne
        where: {
          IdTodo: req.params.id,
        },
        limit:30
      }).then(function(dbToDos) {
        res.json(dbToDos);
      });
    });

    // app.delete("/api/todosidtodos/:id", function(req, res) {
    //   db.ToDos.destroy({
    //     where: {
    //       idProposito: req.params.id
    //     }
    //   }).then(function(dbPropositos) {
    //     res.json(dbPropositos);
    //   });
    // });

 

    app.put("/api/todosidtodos/", function (req, res) {
      db.ToDos.update(
        {IdStatus: req.body.IdStatus}, //Como solo quiero actualizar el Status, lo coloco aquí
        {where: {IdTodo:req.body.IdTodo}}
      )
      .then(function(dbToDos) {
        res.json(dbToDos)
      })
     
     })
    //---_______________


=======
>>>>>>> 8d518ff82f20a65219be7de9542adef7fbcf470c


  // OBTENER LO POSTEADO Obtengo all ToDos aquí en esa ruta
  app.get("/api/todos", function(req, res) {
    db.ToDos.findAll({}).then(function(dbToDos) {
      res.json(dbToDos);
    });
  });



  //POSTEAR CREATE un todo con la data del req.body (modal)
  app.post("/api/todos", function(req, res) {
    console.log(req.body);
    db.ToDos.create(req.body).then(function(dbToDos) {
      res.json(dbToDos);
    });
  });

  // //OBTENER LO POSTEADO Obtengo all ToDos aquí en esa ruta
  // app.get("/api/todos", function(req, res) {
  //   var query = {};
  //   if (req.query) { //aqui era req.query.id (pero asi jala). Aquí puedo modificar con que elemento se va hacer el match entre tablas
  //     query.IdProposito = req.query;
  //   }
  //   db.ToDos.findAndCountAll({
  //     where: query , limit:30, offset:50
  //   }).then(function(dbToDos) {
  //     res.json(dbToDos);
  //   });
  // });

<<<<<<< HEAD

=======
>>>>>>> 8d518ff82f20a65219be7de9542adef7fbcf470c
  //OBTENER EL ToDo QUE COINCIDA CON EL PARÁMETRO :id (que es el propósito)
  //Get los todos que cumplan con la condición de tener el mismo idProposito
  //Aquí al poner la ruta esa con un elemento envez de :id, me va a mostrar todo lo que cumpla con la condición
  app.get("/api/todos/:id", function(req, res) {
<<<<<<< HEAD
    db.ToDos.findAll({//aquí era findOne
=======
    db.ToDos.findAll({
      //aquí era findOne
>>>>>>> 8d518ff82f20a65219be7de9542adef7fbcf470c
      where: {
        IdProposito: req.params.id //aquí puse que en la ruta reemplazando e :id ahí toma como valor el idproposito, pero podría ser para otro caso que fuera el idtodo
      },
      limit: 30
    }).then(function(dbToDos) {
      res.json(dbToDos);
    });
  });

  //BORRAR un todo de la base de datos
  app.delete("/api/todos/:id", function(req, res) {
    db.ToDos.destroy({
      where: {
        idProposito: req.params.id
      }
    }).then(function(dbPropositos) {
      res.json(dbPropositos);
    });
  });

  //--FIN PARTE TODO
};
