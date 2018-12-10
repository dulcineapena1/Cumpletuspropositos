$("#iniciar-sesion").hide(); //en estas líneas oculto los elementos que ya están en html y que no necesito ahora
$("#registrarse").hide(); 
$(".formularios").hide(); 
$("#no-estoy-registrado").hide(); 

$("#empezar").on("click", function(){
  $(".formularios").toggle(); //muestro el div que contiene los elementos
  $("#empezar").remove(); //quito botón empezar
  $(".texto").remove(); //quito texto inicial

  $("#no-estoy-registrado").toggle(); 
  $("#iniciar-sesion").toggle(); //muestro el form para iniciar sesión
});

$("#no-estoy-registrado").on("click", function(){
  event.preventDefault(); //para prevenir que este botón que está adentro de un form, actúe como "submit"
  $("#empezar").remove(); //quito botones 
  $("#no-estoy-registrado").remove(); 
  $(".texto").remove(); //quito texto inicial
 
  $("#iniciar-sesion").toggle(); //oculto el form de inicio de sesión
  $("#registrarse").toggle(); //muestro el form para registrarse
});

// Registrar usuario nuevo
$("#boton-registro-usuario").on("click",function(){
  event.preventDefault();
 
  // No mandar nada si el campo está vacío
  // if (!$("#llenar-proposito").val().trim()) {
  //   return;
  // }
 
  //Los elementos son los que están en models
  mandarregistrousuaio({
    Usuario: $("#usuarioR").val().trim(),
    Contrasena: $("#contraseñaR").val().trim(),
    Nombre: $("#nombreR").val().trim(),
    Apaterno: $("#apellido-paternoR").val().trim(),
    Amaterno: $("#apellido-maternoR").val(), 
    Email: $("#correoR").val().trim(),
    Telefono: $("#telefonoR").val().trim(),
  });
}); //cierre onclick boton-registro-usuario

// A function for creating an usuario. (newusuario) es el contenedor del objeto creado arriba
function mandarregistrousuaio(newusario) {
$.post("/api/usuario", newusario)
 .then(location.reload());
}

//Ingresar para iniciar sesión
$("#ingresar").on("click",function(){
  event.preventDefault();
  var usuarioquierelogin= $("#usuario").val().trim();

  // No hacer nada si el campo está vacío
  if (!$("#usuario").val().trim()) {
    console.log("debes llenar el campo primero, está vacio")
    return;
  }

    $.get("/api/usuario/" + usuarioquierelogin, function(data) {
      console.log(data.Contrasena);

      if($("#contraseña").val().trim() === data.Contrasena){
        console.log("si hay un usuario con esa contrasena");
        window.location.href="/aplicacion" + data.IdUsuario + "?" + usuarioquierelogin 
        $(".nombreusuario").text(usuarioquierelogin);
      }
    
      // for (var i = 0; i < data.length; i++) {        
      // } 

      // actualizarprogreso ({
      //   Progreso: resultadototal2,
      //   IdProposito: idpropositoentodo, 
      // })
  
    })


});
