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
});
