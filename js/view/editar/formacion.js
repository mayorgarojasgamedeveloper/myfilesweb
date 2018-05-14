if(Cookies.get('sesion') == null)
  window.location.replace("../index.html");

function findGetParameter(parameterName) {
  var result = null,
      tmp = [];
  var items = location.search.substr(1).split("&");
  for (var index = 0; index < items.length; index++) {
      tmp = items[index].split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
  }
  return result;
}

$('document').ready(function() {

  $.ajax({url: `http://localhost:3000/formacion/${findGetParameter('id')}`, method: `get`})
  .done(function(data) {
    $('#grado').val(data[0].grado);
    $('#nombre').val(data[0].nombre);
    $('#institucion').val(data[0].institucion);
    $('#fecha_inicio').val(data[0].fecha_inicio.substring(0,10));
    $('#fecha_fin').val(data[0].fecha_fin.substring(0,10));
    $('#fecha_obtencion').val(data[0].fecha_obtencion.substring(0,10));
    $('#cedula').val(data[0].cedula);
  });

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
    $.ajax({url: `http://localhost:3000/formacion/${findGetParameter('id')}`, data: objeto, method: `put`})
    .done(function(data) {
      alertify.alert(`MyFiles`, `Se guardo exitosamente!`, function(){
        alertify.message('OK');
        $('#submit').attr('disabled', false);
      });
    });

  });// Fin del boton
});
