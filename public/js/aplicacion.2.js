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
  
  // $("#editar-nombre-proposito").on("click",function(){
  //     //Habilito y deshabilito el botón de editar nombre
  //     var ladata=$("input").attr("data-indicador","1");
  //     //var mio = $("#nombrespropositos").find(ladata);
      
  //     console.log(this.ladata);
      
  //     var $elnombreproposito = $("#1p");
  //     if ($elnombreproposito.attr("disabled")) {
  //         $elnombreproposito.removeAttr("disabled");
  //         $("#editar-nombre-proposito").text("Guardar nombre");
  //       } 
  //       else {
  //         $elnombreproposito.prop("disabled",true);
  //         $("#editar-nombre-proposito").text("Editar nombre");
  //       }   

  // }); //cierre onclick editar nombre


  $("#editar-todo-proposito").on("click", function(){
   
 
  });//cierre onclick editar todo




// //--Inicio mandar la CATEGORÍA del modal
// $("#boton-registro-categoria").on("click",function(){
//     event.preventDefault();
//     mandarformcategoria({
//       Categoria: $("#seleccionar-categoria").val().trim(),
//     })

//     $('#div-form-categoria').hide();
//     $('#div-form-proposito').show();
// }); //cierre on click boton-registro-categoria

//   // A function for creating an categoria (newcategoria) es el contenedor del objeto creado arriba
//   function mandarformcategoria(newcategoria) {
//     $.post("/api/categorias", newcategoria)
//       //.then(getProposito);
    

//   }


// //--Fin mandar la CATEGORÍA del modal









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
    var newdiv = $("<tr>");  
    newdiv.data("proposito",  newproposito);
    newdiv.append("<span class=badge>" +  newproposito.IdProposito +"</span>" );
    newdiv.append("<td id="+newproposito.IdProposito+">" +  newproposito.Proposito +"</td>" );
   
    // newdiv.append("<td><a href='/blog?author_id=" +  newproposito.id + "'>Go to Posts</a></td>");
    // newdiv.append("<td><a href='/cms?author_id=" +  newproposito.id + "'>Create a Post</a></td>");
    // newdiv.append("<td><a style='cursor:pointer;color:red' class='delete-author'>Delete Author</a></td>");
    return newdiv;
  }

  // Esto hace el append al front de todo lo anterior
  function renderPropositosList(rows) {
    $("tbody").children().not(":last").remove(); //como este proceso duplica los elementos, tengo que borrar el elemento duplicado con estas dos líneas
    $("tbody").children().last().remove();
    if (rows.length) {
      console.log(rows);
      var tbodyPreppendRows=$("tbody").prepend(rows);
      $("#elproposito").append(tbodyPreppendRows);
    }
    // else {
    //   renderEmpty();
    // }
  }
 

//---Final mandar el PROPÓSITO del modal














}); //cierre document ready


