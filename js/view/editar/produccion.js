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

  $.ajax({url: `http://localhost:3000/produccion/${findGetParameter('id')}`, method: `get`})
  .done(function(data) {
    $('#tipo').val(data[0].tipo);
    $('#titulo').val(data[0].titulo);
    $('#fecha').val(data[0].fecha.substring(0,10));
    $('#autores').val(data[0].autores);
    $('#institucion').val(data[0].institucion);
    $('#num_registro').val(data[0].num_registro);
  });

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
      tipo: $('#tipo').val(),
      titulo: $('#titulo').val(),
      fecha: $('#fecha').val(),
      autores: $('#autores').val(),
      institucion: $('#institucion').val(),
      num_registro: $('#num_registro').val()
    }

    console.log(objeto);

    $('#submit').attr('disabled', true);
    $.ajax({url: `http://localhost:3000/produccion/${findGetParameter('id')}`, data: objeto, method: `put`})
    .done(function(data) {
      alertify.alert(`MyFiles`, `Se guardo exitosamente!`, function(){
        alertify.message('OK');
        $('#submit').attr('disabled', false);
      });
    });

  });// Fin del boton
});
