if(Cookies.get('sesion') == null)
  window.location.replace("../index.html");

var sesion = Cookies.getJSON('sesion');

$('documnet').ready(function() {

  $('#submit').on('click', function() {
    $('.error').remove();
    var status = 0;

    status += validar($('#tipo'));
    status += validar($('#titulo'));
    status += validar($('#fecha'));
    status += validar($('#autores'));
    status += validar($('#institucion'));
    status += validar($('#num_registro'));

    if(status > 0) return 0;

    var objeto = {
      usuario: sesion["usuario"],
      tipo: $('#tipo').val(),
      titulo: $('#titulo').val(),
      fecha: $('#fecha').val(),
      autores: $('#autores').val(),
      institucion: $('#institucion').val(),
      num_registro: $('#num_registro').val()
    }

    console.log(objeto);

    $('#submit').attr('disabled', true);
    $.ajax({url: `http://localhost:3000/produccion`, data: objeto, method: `post`})
    .done(function(data) {
      alertify.alert(`MyFiles`, `Se guardo exitosamente!`, function(){
        alertify.message('OK');
        $('#submit').attr('disabled', false);
      });
    });

  });// Fin del boton

});
