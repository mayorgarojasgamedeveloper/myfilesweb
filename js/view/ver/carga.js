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
    console.log(data);
    $('#nombre').html(data[0].nombre);
    $('#fecha_inicio').html(data[0].fecha_inicio.substring(0,10));
    $('#fecha_fin').html(data[0].fecha_fin.substring(0,10));
    $('#programa').html(data[0].programa);
    $('#horas_semana').html(data[0].horas_semana);
    $('#cedula').html(data[0].cedula);
  });

});
