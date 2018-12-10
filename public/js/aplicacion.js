$(document).ready(function(){
  $("#current2").hide(); 

  var url= window.location.href; //obtengo el valor del usuario del url, porque yo se lo puse ahí desde el login.js
  var url2= url.split("?").pop();
  var idusuarioactual= url.split('aplicacion').pop().split('?')[0]
  console.log("aplicación de usuario:",url2);
  console.log("id del usuario actual", idusuarioactual)
  $(".nombreusuario").text(url2); //pongo el nombre del usuario en el header

  

  getProposito(); //Obtener todos los propósitos en front si ya hay
  


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
  //Cancelar modal (por ToDo)
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
        Progreso: 0,
                    //$("#llenar-comentarios").val().trim(),
        IdCat: $("#seleccionar-categoria").val(), //las categorías están previamente cargadas en html
        IdUsuario: idusuarioactual
      });
  }); //cierre onclick boton-registro


  // A function for creating an proposito. (newproposito) es el contenedor del objeto creado arriba
  function mandarformproposito(newproposito) {
    $.post("/api/propositos", newproposito)
      .then(getProposito);
  }
  
  // Se hace un loop por todos los elementos del objeto, para así poderlos mostrar en el front cada que se haga un submit nuevo
  function getProposito() {
    $.get("/api/propositos/"+ idusuarioactual, function(data) {
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
      newdiv.append("<td data-nombreproposito2="+elnombreProposito+"  id="+newproposito.IdProposito+" class=eltdproposito>" +  newproposito.Proposito +"</td>" );
      newdiv.append("<td><button data-nombreproposito="+elnombreProposito+" id="+newproposito.IdProposito+" class=boton-hacer-todo type=button class=btn  data-toggle=modal '>Agregar Acción</button></td>");
      newdiv.append("<td><button data-borraridproposito="+newproposito.IdProposito+" class=delete-proposito>X</button></td>");
      newdiv.append("<div class=progress><div data-idpropositoprogress="+ newproposito.IdProposito+" class=progress-bar role=progressbar aria-valuenow=100 aria-valuemin=0 aria-valuemax=100 style=width:"+newproposito.Progreso+"%"+"    >"  +"."+ "</div></div>");

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

  //PARA VALOR OBLIGATORIO EN TABLA ToDo / Se queda para una siguiente fase
  //Esto es para cambiar el value del checkbox del modal todo, de false/true a 0/1
  // $( '#obligatorio' ).on( 'click', function() {
  //   if( $(this).is(':checked') ){
  //       $("#obligatorio").attr("value",1);
  //   } else {
  //       $("#obligatorio").attr("value",0);
  //   }
  // });


  //Agregar o quitar disabled a la fecha de término en front cuando se seleccione o deseleccione que sea recurrente
  $( '.form-check-input' ).on( 'click', function() {
    $("#fecha-termino").attr('disabled',this.checked);
  });


  //Mandar el ToDo del modal
  $("#boton-registro-todo").on("click",function(){
    event.preventDefault();
    location.reload();//Vuelvo a cargar la página completa para que se muestren los cambios
    $('#myModal2').toggle(); //Oculto el modal
    
    // No mandar nada si el los campos están vacíos
    if (!$("#llenar-todo").val().trim() || !$("#fecha-inicio").val()  ) {
      return;
    }

    // Los siguientes dos if, son para mandar una información u otra según se marque que el evento sea recurrente o no. Se hizo de esta 
    // forma porque fullCalendar muestra error al mandar una fecha de end si el evento es recurrente. Ese es error propio de fullCalendar
    if ($(".form-check-input2").is(':checked')){
        //Se está creando un objeto con los valores del front
        mandarformtodo({
          title: $("#llenar-todo").val().trim(),
          IdProposito: $("#boton-registro-todo").attr("data-id-proposito"),
          IdUsuario: idusuarioactual,
          IdStatus: 0, //le pongo de default el 0
          // Obligatorio: 0,
          recurrente:  $('.form-check-input2:checked').val(),      
          start: $("#fecha-inicio").val(),
          end: $("#fecha-termino").val()
        });
    }
     


    if ($(".form-check-input").is(':checked')){
      var arr = [];
      $('input.form-check-input:checkbox:checked').each(function () {
          arr.push($(this).val());//Es para poder obtenter el valor de todos a los que se le puso palomita
      });
      
      //Se está creando un objeto con los valores del front
      mandarformtodo({
        title: $("#llenar-todo").val().trim(),
        IdProposito: $("#boton-registro-todo").attr("data-id-proposito"),
        IdUsuario: idusuarioactual,
        IdStatus: 0, //le pongo de default el 0
        // Obligatorio: 0,
        recurrente:  arr.toString(), //Lo convierto a string porque de lo contrario no puede guardarse en el row de mysql  
                    //$('.form-check-input:checked').val(),  
        start: $("#fecha-inicio").val().substr(11, 5),
       // end:  $('.form-check-input:checked').attr("data-dia")
      });
    }
  }); //cierre onclick boton-registro-todo


  // A function for creating an todo. (newtodo) es el contenedor del objeto creado arriba
  function mandarformtodo(newtodo) {
     $.post("/api/todos/", newtodo)    
     $.post("/api/todosidtodos/", newtodo)  
     $.post("/api/todosidusuario/", newtodo) 
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
    var recurrentes;
    if(lostodos.recurrente==0){recurrentes= ""}
    if(lostodos.recurrente==4){recurrentes= "Los Jueves a las"};if(lostodos.recurrente==1){recurrentes= "Los Lunes a las"};if(lostodos.recurrente==2){recurrentes= "Los Martes a las"};if(lostodos.recurrente==3){recurrentes= "Los Miércoles a las"};
    if(lostodos.recurrente==5){recurrentes= "Los Viernes a las"};

    var elfin;
    if(lostodos.end==null){elfin=lostodos.start};if(lostodos.end!==null){elfin=lostodos.end};

    var newdivtodo = $("<ul>");  
    newdivtodo.data("todos",  lostodos);
    newdivtodo.append("<li data-idpropositoentodo="+lostodos.IdProposito+" id="+lostodos.IdTodo+" class=h8parrafo data-status= "+lostodos.IdStatus+" >" +  lostodos.title +"</li>" );
    newdivtodo.append("<li data-fechainicio="+lostodos.start+" class=h3parrafo ><p class=h7parrafo>"+"INICIA"+ "</p>"+  recurrentes + " "+  lostodos.start.replace(/\T/g, ' a las ') + " " + "hrs." + "</li>" );
    newdivtodo.append("<li data-fechatermino="+lostodos.end+" class=h3parrafo ><p class=h7parrafo>"+"TERMINA"+ "</p>"+ elfin.replace(/\T/g, ' a las ') + " " + "hrs." + "</li>" );
    return newdivtodo;
  }
 

  // Esto hace el append al front de todo lo anterior
  function renderTodoList(rows) {
    $("#current2-listado").append(rows)
  }


  //Actualizar estado del ToDo a "hecho"
  $("body").on("click", ".h8parrafo", function(){
    id=$(this).attr("id");//id del ToDo
    idpropositoentodo= $(this).attr("data-idpropositoentodo");

    $(this).attr('data-status', $(this).attr('data-status') == 0 ? 1 : 0); //Cambio el data-status en front tipo toggle
    
    var actualizarstatus ={
        IdStatus: $(this).attr("data-status"), //Obtiene el valor del data-status que previamente cambio a 0/1 cada que dan click"
        IdTodo: id, //El IdTodo lo ocupo para poder seleccionar solo ese id y cambiarle el valor de status 
    }

    $.ajax({
      method: "PUT", 
      url: "/api/todosidtodos",
      data: actualizarstatus
    }).then(barraprogreso);
  })//Cierre onclilck .h8parrafo


  function barraprogreso(){ 
    console.log("barrarogreso",idpropositoentodo);
    var resultadototal2=0;
    //todos los todos de ese proposito
    $.get("/api/todos/"+idpropositoentodo, function(data) {
    var cien=100;
    var vecesdehecho=0;
    var totaldedatos=0;
    
      for (var i = 0; i < data.length; i++) {
          totaldedatos=data.length;
          console.log("total de datos",totaldedatos);

          if(data[i].IdStatus==1){
            vecesdehecho++;
          }
          console.log("vecesdehecho",vecesdehecho);    
      } 

      var resultadototal1= cien/totaldedatos;
      resultadototal2= resultadototal1*vecesdehecho; //Este es el porcentaje de progreso en la barra progress
      console.log("resultadototal1",resultadototal1);
      console.log("resultadototal2",resultadototal2); 

      actualizarprogreso ({
        Progreso: resultadototal2,
        IdProposito: idpropositoentodo, 
      })

    })
  }

  function actualizarprogreso(nuevabarra){
      console.log(nuevabarra)
      $.ajax({
        method: "PUT", 
        url: "/api/propositos",
        data: nuevabarra
      })
      location.reload();
  }


  
   








}); //cierre document ready


