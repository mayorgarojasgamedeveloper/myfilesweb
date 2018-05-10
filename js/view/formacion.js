$('documnet').ready(function() {

  $('#tabla').on('click', '#ver', function() {
    var button = $(this);
    var id = button.data('type');
    window.open('ver/formacion.html?id='+id);
  });

  $('#tabla').on('click', '#editar', function() {
    var button = $(this);
    var id = button.data('type');
    window.open('editar/formacion.html?id='+id);
  });

  $('#tabla').on('click', '#eliminar', function() {
    var button = $(this);
    var id = button.data('type');
    console.log('Eliminar ' + id);
  });

});
