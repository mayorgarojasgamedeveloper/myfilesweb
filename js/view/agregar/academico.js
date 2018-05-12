if(Cookies.get('sesion') == null)
  window.location.replace("../index.html");

var sesion = Cookies.getJSON('sesion');

$('documnet').ready(function() {

  $('#submit').on('click', function() {
    $('.error').remove();
    var status = 0;

    status += validar($('#usuario'));

    if(status > 0) return 0;

    var objeto = {
      usuario: $('#usuario').val(),
      contrasena: md5($('#usuario').val())
    }

    console.log(objeto);

    $('#submit').attr('disabled', true);
    $.ajax({url: `http://localhost:3000/usuario`, data: objeto, method: `post`})
    .done(function(data) {
      if(data.constraint === "usuario_usuario_key")
        alertify.alert("My Files", `El usuario "${objeto.usuario}" ya existe. \nIntente otro usuario.`, function(){
          alertify.error('No se creo el usuario!');
              $('#submit').attr('disabled', false);
        });
      else
        alertify.alert("My Files", `El usuario "${objeto.usuario}" ha sido creado!`, function(){
          alertify.message('OK');
              $('#submit').attr('disabled', false);
        });
    }).fail(function() {
      alertify.error('Error al crear al usuario');
          $('#submit').attr('disabled', false);
    });

  });// Fin del boton

});
