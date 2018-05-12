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

  $.ajax({url: `http://localhost:3000/carga/${findGetParameter('id')}`, method: `get`})
  .done(function(data) {
    $('#nombre').val(data[0].nombre);
    $('#fecha_inicio').val(data[0].fecha_inicio.substring(0,10));
    $('#fecha_fin').val(data[0].fecha_fin.substring(0,10));
    $('#programa').val(data[0].programa);
    $('#horas_semana').val(data[0].horas_semana);
    $('#cedula').val(data[0].cedula);
  });

  $('#submit').on('click', function() {
    $('.error').remove();
    var status = 0;

    status += validar($('#nombre'));
    status += validar($('#fecha_inicio'));
    status += validar($('#fecha_fin'));
    status += validar($('#programa'));
    status += validar($('#horas_semana'));

    if(status > 0) return 0;

    var objeto = {
      nombre: $('#nombre').val(),
      fecha_inicio: $('#fecha_inicio').val(),
      fecha_fin: $('#fecha_fin').val(),
      programa: $('#programa').val(),
      horas_semana: $('#horas_semana').val()
    }

    console.log(objeto);

    $('#submit').attr('disabled', true);
    $.ajax({url: `http://localhost:3000/carga/${findGetParameter('id')}`, data: objeto, method: `put`})
    .done(function(data) {
      alertify.alert(`MyFiles`, `Se guardo exitosamente!`, function(){
        alertify.message('OK');
        $('#submit').attr('disabled', false);
      });
    });

  });// Fin del boton
});
