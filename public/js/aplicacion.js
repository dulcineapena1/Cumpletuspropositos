$(document).ready(function(){
  $("#current2").hide(); 

  getProposito(); //Obtener todos los propósitos en front si ya hay
  
  //Marcar con una línea (tachando) cuando una tarea ya esté hecha (en sección Hoy Toca)
  var list = document.getElementsByTagName("li");
  for(var i=0; i<list.length; i++){
    list[i].addEventListener("click", liClick);
  }
  function liClick(){
    this.classList.toggle("done"); //aquí está haciendo un toggle através de la clase css done
  }

  //Para ingresar a la sección agregar nuevo propósito
  $("#agregar-proposito").on("click", function(){
    $("#agregar-proposito").hide(); 
    $(".listadoproposito").toggle(); 
    $('#myModal').toggle();
    
  });

  
  //Cancelar modal (por propósito)
  $("#cancelar-llenado-proposito").on("click", function(){
    event.preventDefault();
    $('#myModal').toggle();
    $("#agregar-proposito").show(); 
    $(".listadoproposito").show()
  });
  //Cancelar modal (por todo)
  $("#cancelar-llenado-todo").on("click", function(){
    event.preventDefault();
    $('#myModal2').toggle();
  });



//--------......Inicio mandar el PROPÓSITO del modal (submit)

  $("#boton-registro").on("click",function(){
      event.preventDefault();
      $(".listadoproposito").show(); //Muestro en front el contenedor donde va a ir todo el contenido acabado de generar
      $('#myModal').toggle(); //Oculto el modal
      $("#crear-nuevo").show(); //Muestro el botón de agregar más propósitos
      $("#agregar-proposito").show(); //Muestro el botón para sacar el modal

      // No mandar nada si el campo del nombre del propósito está vacío
      if (!$("#llenar-proposito").val().trim()) {
        return;
      }
      // Calling the mandarformproposito function and passing in the value of the name
      // Se está creando un objeto con los valores del front
      mandarformproposito({
        Proposito: $("#llenar-proposito").val().trim(),
        Comentarios: 0,
                    //$("#llenar-comentarios").val().trim(),
        IdCat: $("#seleccionar-categoria").val(), //las categorías están previamente cargadas en html
        IdUsuario: 1
      });
  }); //cierre onclick boton-registro


  // A function for creating an proposito. (newproposito) es el contenedor del objeto creado arriba
  function mandarformproposito(newproposito) {
    $.post("/api/propositos", newproposito)
      .then(getProposito);
  }
  
  // Se hace un loop por todos los elementos del objeto, para así poderlos mostrar en el front cada que se haga un submit nuevo
  function getProposito() {
    $.get("/api/propositos", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createPropositosRow(data[i]));
      }
      renderPropositosList(rowsToAdd);
      $("#llenar-proposito").val("");
    });
  }

  // Este proceso lo inserta uno por uno (en html) al hacer cada submit
  function createPropositosRow(newproposito) {
      console.log(newproposito);
      var elnombreProposito= newproposito.Proposito.replace(/\ /g, '-'); //como quiero ponerle al valor de un botón (data) el nombre del propósito, tengo que borrar los espacios para que lo agarre, con esto reemplazo espacio por -
      var newdiv = $("<tbody id=tbodypropositoss>").append("<tr>");  
      newdiv.data("proposito",  newproposito);
      // newdiv.append("<span class=badge>" +  newproposito.IdProposito +"</span>" );
      newdiv.append("<td data-nombreproposito2="+elnombreProposito+"  id="+newproposito.IdProposito+" class=eltdproposito>" +  newproposito.Proposito +"</td>" );
      newdiv.append("<td><button data-nombreproposito="+elnombreProposito+" id="+newproposito.IdProposito+" class=boton-hacer-todo type=button class=btn  data-toggle=modal '>Agregar Acción</button></td>");
      newdiv.append("<td><button data-borraridproposito="+newproposito.IdProposito+" class=delete-proposito>X</button></td>");
      return newdiv;
  }

  // Esto hace el append al front de todo lo anterior, este paso es necesario porque se hace el append uno por uno a ir haciendo submit
  function renderPropositosList(rows) {
      $("#elproposito").children().not(":last").remove(); //como este proceso duplica los elementos, tengo que borrar el elemento duplicado con estas dos líneas
      $("#elproposito ").children().last().remove();
    
      if (rows.length) {
        console.log(rows);
        $("#elproposito ").prepend(rows);
      }
     
  }
 
//--------.....Final mandar el PROPÓSITO del modal
  
  // Borrar un propósito y sus ToDos correspondientes
  $("body").on("click", ".delete-proposito",function(){
    $("#current2-titulo").empty();
    $("#current2-listado").empty();

    var listItemDataProposito = $(this).attr("data-borraridproposito");
    var id = listItemDataProposito
    // En este ajax llamo dos deletes (con success), uno para borrar el propósito y otro para borrar el todo que le corresponda a ese propósito. 
    // Ojo, lo ideal es borrarlos con "cascade" en apiRoutes.js pero no fue posibe vincular porque se genero llave manualmente y no con sequelize.
    // De haber utilizado "cascade" con solo borrar el propósito se borran todos los todos correspondietes
    $.ajax({
      method: "DELETE",
      url: "/api/propositos/" + id,
      success: function(){
        $.ajax({ 
          method: "DELETE",
          url: "/api/todos/" + id
        });
      }
    }).then(getProposito); // Vuelvo a cargar los propósitos que quedaron en base de datos, en el front, con esta función
 
  })







//--------------------------------->SECCIÓN ToDo<------------------------------------------------

  //Ingresar al modal hacer ToDo
  $("body").on("click", ".boton-hacer-todo", function(){
    $('#myModal2').toggle();
    var datanombreproposito = $(this).attr("data-nombreproposito");
    $("#llenado-proposito-todo").attr("placeholder",datanombreproposito); //le pongo el nombre del propósito seleccionado en el modal
    var dataidproposito= $(this).attr("id");
    $("#boton-registro-todo").attr("data-id-proposito",dataidproposito);
  });


  //Esto es para cambiar el value del checkbox del modal todo, de false/true a 0/1
  $( '#obligatorio' ).on( 'click', function() {
    if( $(this).is(':checked') ){
        $("#obligatorio").attr("value",1);
    } else {
        $("#obligatorio").attr("value",0);
    }
  });



  //Mandar el ToDo del modal
  $("#boton-registro-todo").on("click",function(){
    event.preventDefault();
    location.reload();//Vuelvo a cargar la página completa para que se muestren los cambios

    $('#myModal2').toggle(); //Oculto el modal
    
    // No mandar nada si el los campos están vacíos
     if (!$("#llenar-todo").val().trim() || !$("#fecha-inicio").val() || !$("#fecha-termino").val() ) {
       return;
     }
   
    // Calling the mandarformtodo function and passing in the value of the name
    //Se está creando un objeto con los valores del front
    mandarformtodo({
      title: $("#llenar-todo").val().trim(),
      IdProposito: $("#boton-registro-todo").attr("data-id-proposito"),
      IdStatus: 0, //le pongo de default el 0
      Obligatorio: 0,
                    //$("#obligatorio").val(),// ya cambié un paso arriba el valor de esto por 0/1
      start: $("#fecha-inicio").val(),
      end: $("#fecha-termino").val()
    });
    
  }); //cierre onclick boton-registro-todo


  // A function for creating an todo. (newtodo) es el contenedor del objeto creado arriba
  function mandarformtodo(newtodo) {
     $.post("/api/todos/", newtodo)    
     $.post("/api/todosidtodos/", newtodo)  
  }
 

  //Mostrar los ToDos de cada Propósito en la sección CURRENT
  $("body").on("click", ".eltdproposito", function(){
    event.preventDefault();
    $("#current2-listado").empty(); $("#current2-titulo").empty();
    $("#current2").show(); 
   
    var eliddeltd=$(this).attr("id"); //obtengo el id del propósito
    console.log(eliddeltd);
    //El título del propósito lo muestro
    var elpropositodeltd=$(this).attr("data-nombreproposito2");
    $("#current2-titulo").append(elpropositodeltd.replace(/\-/g, '  '));

    //Aquí le pongo de valor en la ruta el id del propósito, porque lo que me interesa es sacar los match de ese id dentro de tabla ToDos
    $.get("/api/todos/"+eliddeltd, function(data) {
      console.log("ESTOS SON LOS ToDos DEL propósito clickeado:", data);
      var todosToAdd = [];
      for (var i = 0; i < data.length; i++) {
        console.log(data[i].title)
        todosToAdd.push(createNewRowToDo(data[i]));
        renderTodoList(todosToAdd);
      }  
    }); //cierre get api/todo/...
  }); //cierre on click tdproposito
    
  
  // This function constructs a todos in HTML
  function createNewRowToDo(lostodos){
    var newdivtodo = $("<ul>");  
    newdivtodo.data("todos",  lostodos);
    //newdivtodo.append("<span class=badge>" +  newproposito.IdProposito +"</span>" );
    //newdivtodo.append("<li id="+elnombrepropositodeltd+" class=h2parrafo >" +  lostodos.title +"</li>" );
    newdivtodo.append("<li id="+lostodos.IdTodo+" class=h8parrafo >" +  lostodos.title +"</li>" );
    newdivtodo.append("<li data-fechainicio="+lostodos.start+" class=h3parrafo ><p class=h7parrafo>"+"INICIA"+ "</p>"+ lostodos.start +"</li>" );
    newdivtodo.append("<li data-fechatermino="+lostodos.end+" class=h3parrafo ><p class=h7parrafo>"+"TERMINA"+ "</p>"+ lostodos.end +"</li>" );
    //newdivtodo.append("<td><button data-nombreproposito="+elnombreProposito+" id="+newproposito.IdProposito+" class=boton-hacer-todo type=button class=btn  data-toggle=modal '>Crear ToDo</button></td>");
    // newdiv.append("<td><a href='/cms?author_id=" +  newproposito.id + "'>Create a Post</a></td>");
    // newdiv.append("<td><a style='cursor:pointer;color:red' class='delete-author'>Delete Author</a></td>");
    return newdivtodo;
  }
 

  // Esto hace el append al front de todo lo anterior
  function renderTodoList(rows) {
    $("#current2-listado").append(rows)
    // if (rows.length) {
    //   console.log(rows);
    //   $("#elproposito ").prepend(rows);
    // }
    
  }

  //Actualizar estado del ToDo a "hecho"
  $("body").on("click", ".h8parrafo", function(){
    this.classList.toggle("done");
    id=$(this).attr("id");

   
    

      
    // actualizarstatus({
    //   IdTodo: 3,
    //   title: "hola",
    //   IdProposito:2, 
    //   IdStatus: 1, 
    //   Obligatorio: 0,
    //   start: "2018-11-27 07:00:00",
    //   end: "2018-11-28 07:00:00"
    // })

    // function actualizarstatus(nuevostatus){
    //   $.ajax({
    //     method: "PUT",
    //     url: "/api/todosidtodos/" ,
    //     data: nuevostatus
    //   })
       

    
    
  })





  
   








}); //cierre document ready


