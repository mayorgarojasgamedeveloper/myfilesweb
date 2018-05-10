$('documnet').ready(function() {

  $('#submit').on('click', function() {
    $('.error').remove();
    var status = 0;

    status += validar($('#nombre'));
    status += validar($('#fecha_inicio'));
    status += validar($('#fecha_fin'));
    status += validar($('#autores'));
    status += validar($('#programa'));
    status += validar($('#horas_semana'));

    if(status > 0) return 0;

    console.log('Enviado');

  });

});
