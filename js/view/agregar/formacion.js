if(Cookies.get('sesion') == null)
  window.location.replace("../index.html");

var sesion = Cookies.getJSON('sesion');

$('documnet').ready(function() {

  $('#submit').on('click', function() {
    $('.error').remove();
    var status = 0;

    status += validar($('#grado'));
    status += validar($('#nombre'));
    status += validar($('#institucion'));
    status += validar($('#fecha_inicio'));
    status += validar($('#fecha_fin'));
    status += validar($('#fecha_obtencion'));
    status += validar($('#cedula'));

    if(status > 0) return 0;

    var objeto = {
      usuario: sesion["usuario"],
      grado: $('#grado').val(),
      nombre: $('#nombre').val(),
      institucion: $('#institucion').val(),
      fecha_inicio: $('#fecha_inicio').val(),
      fecha_fin: $('#fecha_fin').val(),
      fecha_obtencion: $('#fecha_obtencion').val(),
      cedula: $('#cedula').val()
    }

    console.log(objeto);

    $('#submit').attr('disabled', true);
    $.ajax({url: `http://localhost:3000/formacion`, data: objeto, method: `post`})
    .done(function(data) {
      alertify.alert(`MyFiles`, `Se guardo exitosamente!`, function(){
        alertify.message('OK');
        $('#submit').attr('disabled', false);
      });
    });

  }); //- Fin de clic

});
