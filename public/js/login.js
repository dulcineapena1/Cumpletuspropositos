$("#iniciar-sesion").hide(); //en estas líneas oculto los elementos que ya están en html y que no necesito ahora
$("#registrarse").hide();
$(".formularios").hide();
$("#no-estoy-registrado").hide();

$("#empezar").on("click", function() {
  $(".formularios").toggle(); //muestro el div que contiene los elementos
  $("#empezar").remove(); //quito botón empezar
  $(".texto").remove(); //quito texto inicial

  $("#no-estoy-registrado").toggle();
  $("#iniciar-sesion").toggle(); //muestro el form para iniciar sesión
});

$("#no-estoy-registrado").on("click", function() {
  event.preventDefault(); //para prevenir que este botón que está adentro de un form, actúe como "submit"
  $("#empezar").remove(); //quito botones
  $("#no-estoy-registrado").remove();
  $(".texto").remove(); //quito texto inicial

  $("#iniciar-sesion").toggle(); //oculto el form de inicio de sesión
  $("#registrarse").toggle(); //muestro el form para registrarse
});

<<<<<<< HEAD
// Registrar usuario nuevo
$("#boton-registro-usuario").on("click",function(){
  event.preventDefault();
  
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
  
    })


=======
$("#boton-registro").on("click", function(event) {
  event.preventDefault();

  var newUsuario = {
    nombrereg: $("#nombrereg")
      .val()
      .trim(),
    apaterno: $("#apellido-paternoreg")
      .val()
      .trim(),
    amaterno: $("#apellido-maternoreg")
      .val()
      .trim(),
    emailreg: $("#correoreg")
      .val()
      .trim(),
    telefonoreg: $("#telefonoreg")
      .val()
      .trim(),
    usuario: $("#usuarioreg")
      .val()
      .trim(),
    contrasena: $("#contraseñareg")
      .val()
      .trim()
  };

  console.log(newUsuario);
  $.post("/api/registro", newUsuario).then(function() {
    window.location.href = "/";
  });
});

$("#ingresar").on("click", function(event) {
  event.preventDefault();
  var logeo = {
    usuario: $("#usuariolog")
      .val()
      .trim(),
    contrasena: $("#contrasenalog")
      .val()
      .trim()
  };
  $.post("/api/aplicacion", logeo).then(function() {
    console.log(logeo);
    window.location.href = "/aplicacion";
  });
>>>>>>> 8d518ff82f20a65219be7de9542adef7fbcf470c
});
