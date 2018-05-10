$('documnet').ready(function() {

  $('#submit').on('click', function() {
    $('.error').remove();
    var status = 0;

    status += validar($('#produccion'));
    status += validar($('#titulo'));
    status += validar($('#fecha'));
    status += validar($('#autores'));
    status += validar($('#institucion'));
    status += validar($('#num_registro'));

    if(status > 0) return 0;

    console.log('Enviado');

  });

});
