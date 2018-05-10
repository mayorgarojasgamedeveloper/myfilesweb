$('documnet').ready(function() {

  $('#submit').on('click', function() {
    $('.error').remove();
    var status = 0;

    status += validar($('#grado'));
    status += validar($('#nombre'));
    status += validar($('#institucion_procedencia'));
    status += validar($('#fecha_inicio'));
    status += validar($('#fecha_termino'));
    status += validar($('#fecha_obtencion'));
    status += validar($('#cedula'));

    if(status > 0) return 0;

    console.log('Enviado');

  });

});
