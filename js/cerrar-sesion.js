$('#cerrar-sesion').on('click', function() {
  Cookies.remove('sesion');
  window.location.replace('./index.html');
});


$('#usuario').html(Cookies.getJSON('sesion').usuario.toUpperCase());
