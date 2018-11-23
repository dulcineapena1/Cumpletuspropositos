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

  //Para agregar ingresar a la sección agregar nuevo propósito
  $("#agregar-proposito").on("click", function(){
    $("#agregar-proposito").hide(); 
    $(".listadoproposito").toggle(); 
    $("#crear-nuevo").toggle(); 
    $('#myModal').toggle();
    $('#div-form-proposito').hide(); //oculto el formulario de los propositos para que se muestre primero el de categorías
  });

  //Cancelar modal (por categoría)
  $("#cancelar-llenado-categoria").on("click", function(){
    event.preventDefault();
    $('#myModal').toggle();
    $("#agregar-proposito").show(); 
  });
  //Cancelar modal (por propósito)
  $("#cancelar-llenado-proposito").on("click", function(){
    event.preventDefault();
    $('#myModal').toggle();
    $("#agregar-proposito").show(); 
  });
  
  $("#editar-nombre-proposito").on("click",function(){
      //Habilito y deshabilito el botón de editar nombre
      var ladata=$("input").attr("data-indicador","1");
      //var mio = $("#nombrespropositos").find(ladata);
      
      console.log(this.ladata);
      
      var $elnombreproposito = $("#1p");
      if ($elnombreproposito.attr("disabled")) {
          $elnombreproposito.removeAttr("disabled");
          $("#editar-nombre-proposito").text("Guardar nombre");
        } 
        else {
          $elnombreproposito.prop("disabled",true);
          $("#editar-nombre-proposito").text("Editar nombre");
        }   

  

   
  }); //cierre onclick editar nombre


  $("#editar-todo-proposito").on("click", function(){
   
 
  });//cierre onclick editar todo




  $("#crear-nuevo").on("click", function(){
  
    $( "#nombrespropositos" ).clone().appendTo("#elproposito");
 
  });


//--Inicio mandar la CATEGORÍA del modal
$("#boton-registro-categoria").on("click",function(){
    event.preventDefault();
    mandarformcategoria({
      Categoria: $("#seleccionar-categoria").val().trim(),
    })

    $('#div-form-categoria').hide();
    $('#div-form-proposito').show();
}); //cierre on click boton-registro-categoria

  // A function for creating an categoria (newcategoria) es el contenedor del objeto creado arriba
  function mandarformcategoria(newcategoria) {
    $.post("/api/categorias", newcategoria)
      //.then(getProposito);
    

  }


//--Fin mandar la CATEGORÍA del modal









//---Inicio mandar el PROPÓSITO del modal
  $("#boton-registro").on("click",function(){
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    //  if (!nameInput.val().trim().trim()) {
    //    return;
    //  }
    // Calling the mandarformproposito function and passing in the value of the name
    // Se está creando un objeto con los valores del front
    mandarformproposito({
      Proposito: $("#llenar-proposito").val().trim(),
      Comentarios: $("#llenar-comentarios").val().trim(),
      IdCat: $("#seleccionar-categoria").val()
    });
    
  }); //cierre onclick boton-registro

  // A function for creating an proposito. (newproposito) es el contenedor del objeto creado arriba
  function mandarformproposito(newproposito) {
    $.post("/api/propositos", newproposito)
      //.then(getProposito);
  }

 

//---Final mandar el PROPÓSITO del modal














}); //cierre document ready


