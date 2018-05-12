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

  $.ajax({url: `http://localhost:3000/produccion/${findGetParameter('id')}`, method: `get`})
  .done(function(data) {
    console.log(data);
    $('#tipo').html(data[0].tipo);
    $('#titulo').html(data[0].titulo);
    $('#fecha').html(data[0].fecha.substring(0,10));
    $('#autores').html(data[0].autores);
    $('#institucion').html(data[0].institucion);
    $('#num_registro').html(data[0].num_registro);
  });

});
