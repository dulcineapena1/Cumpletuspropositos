$(document).ready(function(){
  $(".listadoproposito").hide(); 
  $("#crear-nuevo").hide(); 
  $("#current2").hide(); 

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
    $("#crear-nuevo").toggle(); 
    $('#myModal').toggle();
    
  });

  
  //Cancelar modal (por propósito)
  $("#cancelar-llenado-proposito").on("click", function(){
    event.preventDefault();
    $('#myModal').toggle();
    $("#agregar-proposito").show(); 
  });
  //Cancelar modal (por todo)
  $("#cancelar-llenado-todo").on("click", function(){
    event.preventDefault();
    $('#myModal2').toggle();
  });



//---Inicio mandar el PROPÓSITO del modal (submit)
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
      Comentarios: $("#llenar-comentarios").val().trim(),
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
    newdiv.append("<span class=badge>" +  newproposito.IdProposito +"</span>" );
    newdiv.append("<td id="+newproposito.IdProposito+" class=eltdproposito>" +  newproposito.Proposito +"</td>" );
    newdiv.append("<td><button data-nombreproposito="+elnombreProposito+" id="+newproposito.IdProposito+" class=boton-hacer-todo type=button class=btn  data-toggle=modal '>Crear ToDo</button></td>");
               
    // newdiv.append("<td><a href='/cms?author_id=" +  newproposito.id + "'>Create a Post</a></td>");
    // newdiv.append("<td><a style='cursor:pointer;color:red' class='delete-author'>Delete Author</a></td>");
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
    // else {
    //   renderEmpty();
    // }
  }
 

//---Final mandar el PROPÓSITO del modal



//------------------->SECCIÓN TODO<------------------------------------------------


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
    $('#myModal2').toggle(); //Oculto el modal
    
    // No mandar nada si el campo del nombre del propósito está vacío
     if (!$("#llenar-todo").val().trim()) {
       return;
     }
   
    // Calling the mandarformtodo function and passing in the value of the name
    //Se está creando un objeto con los valores del front
    mandarformtodo({
      title: $("#llenar-todo").val().trim(),
      IdProposito: $("#boton-registro-todo").attr("data-id-proposito"),
      IdStatus: 0, //le pongo de default el 0
      Obligatorio: $("#obligatorio").val(), //ya cambié un paso arriba el valor de esto por 0/1
      start: $("#fecha-inicio").val(),
      end: $("#fecha-termino").val()
    });
    
  }); //cierre onclick boton-registro-todo

  // A function for creating an todo. (newtodo) es el contenedor del objeto creado arriba
  function mandarformtodo(newtodo) {
     $.post("/api/todos/", newtodo)
       //.then(getProposito);
  }
 

  
   //Mostrar los ToDos de cada Propósito en la sección < >
  $("body").on("click", ".eltdproposito", function(){
    event.preventDefault();

    $("#current2").show(); 
    var eliddeltd=$(this).attr("id")
    console.log(eliddeltd);

    var lostodossubmited= [];
    $.get("/api/todos/", function(data) {
      console.log("ESTOS SON LOS TODOS DEL all propositos:", data);
    
      var eliddeltd2=eliddeltd
      var todaladata=[];
      var contenidodeestetodo=[];
      for (var i = 0; i < data.length; i++) {
        var mia= data[i].IdProposito;
        lostodossubmited.push(mia);
        todaladata.push(data[i]);

        if(data[i].IdProposito==eliddeltd2){
          console.log("yaaa");
          console.log("este idprop si tiene todo",eliddeltd2);
          // var elindexdatai=todaladata.indexOf(mia);
          // console.log("mero",elindexdatai);
           var mira = lostodossubmited.indexOf(eliddeltd); 
           console.log(mira);
        }
        console.log(eliddeltd2)
        // var mira = lostodossubmited.indexOf(eliddeltd); 
        // console.log(mira);
       
      }
       
      console.log(lostodossubmited);
     
       
      // console.log("eliiiii",eliddeltd);


      // lostodos = data;
      // if (!lostodos || !lostodos.length) {
      //   //displayEmpty(author);
      // }
      // else {
      //   initializeRowsTodos();
      // }
    });
   
  }); //cierre on click td
    
  
    
 


  
  // function initializeRowsTodos() {
  //   var todosToAdd = [];
  //   for (var i = 0; i < lostodos.length; i++) {
  //     todosToAdd.push(createNewRow(lostodos[i]));
  //   }
  //   $(".current2").append(todosToAdd);
  // }


  // // This function constructs a todos in HTML
  // function createNewRow(lostodos) {
  //   //var elnombreProposito= newproposito.Proposito.replace(/\ /g, '-'); //como quiero ponerle al valor de un botón (data) el nombre del propósito, tengo que borrar los espacios para que lo agarre, con esto reemplazo espacio por -
  //   var newdivtodo = $("#todos").append("<ul>");  
  //   newdivtodo.data("todos",  lostodos);
  //   //newdivtodo.append("<span class=badge>" +  newproposito.IdProposito +"</span>" );
  //   newdivtodo.append("<li id="+lostodos.IdTodo+" >" +  lostodos.title +"</li>" );
  //   //newdivtodo.append("<td><button data-nombreproposito="+elnombreProposito+" id="+newproposito.IdProposito+" class=boton-hacer-todo type=button class=btn  data-toggle=modal '>Crear ToDo</button></td>");
    
  //   //$("#todos").append(newdivtodo);
  //   // newdiv.append("<td><a href='/cms?author_id=" +  newproposito.id + "'>Create a Post</a></td>");
  //   // newdiv.append("<td><a style='cursor:pointer;color:red' class='delete-author'>Delete Author</a></td>");
  //   return newdivtodo;
  // }
   








}); //cierre document ready


