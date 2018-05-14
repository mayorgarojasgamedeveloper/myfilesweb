if(Cookies.get('sesion') == null)
  window.location.replace("index.html");

var sesion = Cookies.getJSON('sesion');

$('documnet').ready(function() {

  function render() {

    $.ajax({url: `http://localhost:3000/produccion`, method: `get`})
    .done(function(data) {
      html = ``;
      $.each(data, function(index, value) {
        if(value.usuario === sesion.usuario) {
          html += `<tr>`;
          html += `  <td>${value.tipo}</td>`;
          html += `  <td>${value.titulo}</td>`;
          html += `  <td>${value.fecha.substring(0,10)}</td>`;
          html += `  <td>${value.num_registro}</td>`;
          html += `  <td>`;
          html += `    <button type="button" id="ver" name="button" data-type="${value.id}"><i class="fa fa-eye fa-fw"></i></button>`;
          html += `    <button type="button" id="editar" name="button" data-type="${value.id}"><i class="fa fa-edit fa-fw"></i></button>`;
          html += `    <button type="button" id="eliminar" name="button" data-type="${value.id}"><i class="fa fa-trash fa-fw"></i></button>`;
          html += `  </td>`;
          html += `</tr>`;
        }
      });
      $('#tabla tbody').append(html);
    });
  }

  render();

  $('#tabla').on('click', '#ver', function() {
    var button = $(this);
    var id = button.data('type');
    window.open('ver/produccion.html?id='+id);
  });

  $('#tabla').on('click', '#editar', function() {
    var button = $(this);
    var id = button.data('type');
    window.open('editar/produccion.html?id='+id);
  });

  $('#tabla').on('click', '#eliminar', function() {
    var button = $(this);
    var id = button.data('type');
    alertify.confirm("MyFiles","Se eliminara el archivo permanentemente.",
    function(){
      $.ajax({url: `http://localhost:3000/produccion`,data: {id: id} , method: `delete`})
      .done(function(data) {
        location.reload();
      })
      .fail(function() {
        alertify.error('Error al eliminar archivo.');
      });

    },
    function(){
      alertify.error('Cancel');
    });
  });

});
