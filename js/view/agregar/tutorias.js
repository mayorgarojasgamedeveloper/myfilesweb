if(Cookies.get('sesion') == null)
  window.location.replace("../index.html");

var sesion = Cookies.getJSON('sesion');

$('documnet').ready(function() {

  $('#submit').on('click', function() {
    $('.error').remove();
    var status = 0;

    status += validar($('#nombre_alumno'));
    status += validar($('#fecha_inicio'));
    status += validar($('#fecha_fin'));
    status += validar($('#horas_semana'));

    if(status > 0) return 0;

    var objeto = {
      usuario: sesion["usuario"],
      nombre_alumno: $('#nombre_alumno').val(),
      fecha_inicio: $('#fecha_inicio').val(),
      fecha_fin: $('#fecha_fin').val(),
      horas_semana: $('#horas_semana').val()
    }

    console.log(objeto);

    $('#submit').attr('disabled', true);
    $.ajax({url: `http://localhost:3000/tutorias`, data: objeto, method: `post`})
    .done(function(data) {
      alertify.alert(`MyFiles`, `Se guardo exitosamente!`, function(){
        alertify.message('OK');
        $('#submit').attr('disabled', false);
      });
    });

  });// Fin del boton

});
