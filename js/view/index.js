$('documnet').ready(function() {

  console.log('Test');

  $('#submit').on('click', function() {
    $('.error').remove();
    var status = 0;

    status += validar($('#usuario'));
    status += validar($('#contrasena'));

    if(status > 0) return 0;

    var usuario = $('#usuario').val().toLowerCase();
    var contrasena = md5($('#contrasena').val());

    var find = $.ajax({url: `http://localhost:3000/usuario/${usuario}/${contrasena}`, method: `get`});
    find.done(function(data) {
      if(!$.isEmptyObject(data)) {
        var sesion = {
          usuario: data[0].usuario,
          contrasena: data[0].contrasena
        }
        Cookies.set('sesion', sesion);
        window.location.replace('./panel.html');
      } else {
        alertify.error("Usuario y contraseña no coinciden.")
      }
    });

  });

});
