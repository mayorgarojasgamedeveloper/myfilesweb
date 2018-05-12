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
    console.log(data);
    $('#grado').html(data[0].grado);
    $('#nombre').html(data[0].nombre);
    $('#institucion').html(data[0].institucion);
    $('#fecha_inicio').html(data[0].fecha_inicio.substring(0,10));
    $('#fecha_fin').html(data[0].fecha_fin.substring(0,10));
    $('#fecha_obtencion').html(data[0].fecha_obtencion.substring(0,10));
    $('#cedula').html(data[0].cedula);
  });

});
