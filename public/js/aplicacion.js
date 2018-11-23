$(document).ready(function(){
  $(".listadoproposito").hide(); 
  $("#crear-nuevo").hide(); 

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
    var newdiv = $("<tbody id=tbodypropositoss>").append("<tr>");  
    newdiv.data("proposito",  newproposito);
    newdiv.append("<span class=badge>" +  newproposito.IdProposito +"</span>" );
    newdiv.append("<td id="+newproposito.IdProposito+">" +  newproposito.Proposito +"</td>" );
    newdiv.append("<td><button data-nombreproposito="+newproposito.Proposito+" id="+newproposito.IdProposito+" class=boton-hacer-todo type=button class=btn  data-toggle=modal '>Crear ToDo</button></td>");
               
    // newdiv.append("<td><a href='/cms?author_id=" +  newproposito.id + "'>Create a Post</a></td>");
    // newdiv.append("<td><a style='cursor:pointer;color:red' class='delete-author'>Delete Author</a></td>");
    return newdiv;
  }

  // Esto hace el append al front de todo lo anterior
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
    var dataidproposito= $(this).attr("id");
    $("#llenado-proposito-todo").attr("placeholder",datanombreproposito); //le pongo el nombre del propósito seleccionado en el modal
    $("#boton-registro-todo").attr("data-id-proposito",dataidproposito);
  });



  //Mandar el ToDo del modal
  $("#boton-registro-todo").on("click",function(){
    event.preventDefault();
    $('#myModal2').toggle(); //Oculto el modal
    
    // No mandar nada si el campo del nombre del propósito está vacío
    // if (!$("#llenar-todo").val().trim()) {
    //   return;
    // }

   // Calling the mandarformtodo function and passing in the value of the name
    //Se está creando un objeto con los valores del front
    mandarformtodo({
      title: $("#llenar-todo").val().trim(),
      IdProposito: $("#boton-registro-todo").attr("data-id-proposito"),
      IdStatus: 1,
      Obligatorio: 0,
      Start: 1,
      End: 1
    });
    
  }); //cierre onclick boton-registro-todo

  // A function for creating an todo. (newtodo) es el contenedor del objeto creado arriba
  function mandarformtodo(newtodo) {
     $.post("/api/todos", newtodo)
       //.then(getProposito);
  }












}); //cierre document ready


