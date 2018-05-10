$('documnet').ready(function() {

  $('#submit').on('click', function() {
    $('.error').remove();
    var status = 0;

    status += validar($('#usuario'));

    if(status > 0) return 0;

    console.log('Enviado');

  });

});
