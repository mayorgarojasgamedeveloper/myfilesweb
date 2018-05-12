if(Cookies.get('sesion') == null)
  window.location.replace("./index.html");

var sesion = Cookies.getJSON('sesion');

$('documnet').ready(function() {

  $.ajax({url: `http://localhost:3000/usuario/${sesion.usuario}`,method: `get`})
  .done(function(data) {
    rednerInfo(data[0]);
  });

  function rednerInfo(data) {
    $('#usuario').html(data.usuario.toUpperCase());
    $('#nombre').val(data.nombre);
    $('#apellido').val(data.apellido);
    $('#domicilio').val(data.domicilio);
    $('#ciudad').val(data.ciudad);
    $('#telefono').val(data.telefono);
    $('#correo').val(data.correo);
    $('#nombre_dependiente_1').val(data.nombre_dependiente_1);
    $('#edad_dependiente_1').val(data.edad_dependiente_1);
    $('#nombre_dependiente_2').val(data.nombre_dependiente_2);
    $('#edad_dependiente_2').val(data.edad_dependiente_2);
  }


  $('#submit').on('click', function() {
    $('.error').remove();
    var status = 0;

    status += validar($('#nombre'));
    status += validar($('#apellido'));
    status += validar($('#domicilio'));
    status += validar($('#ciudad'));
    status += validar($('#telefono'));
    status += validar($('#correo'));
    status += validar($('#nombre_dependiente_1'));
    status += validar($('#edad_dependiente_1'));
    status += validar($('#nombre_dependiente_2'));
    status += validar($('#edad_dependiente_2'));

    if(status > 0) return 0;

    var objeto = {
      nombre: $('#nombre').val(),
      apellido: $('#apellido').val(),
      domicilio: $('#domicilio').val(),
      ciudad: $('#ciudad').val(),
      telefono: $('#telefono').val(),
      correo: $('#correo').val(),
      nombre_dependiente_1: $('#nombre_dependiente_1').val(),
      edad_dependiente_1: $('#edad_dependiente_1').val(),
      nombre_dependiente_2: $('#nombre_dependiente_2').val(),
      edad_dependiente_2: $('#edad_dependiente_2').val()
    }

    $.ajax({url: `http://localhost:3000/usuario/${sesion.usuario}`,data: objeto ,method: `put`})
    .done(function(data) {
      alertify.alert("MyFiles", "Su información ha sido actualizada.", function(){
        alertify.message('OK');
      });
    });
  });

//------------------------FOTO----------------------------------

  // Actualizar Foto
  var htmlFoto = ``;
  htmlFoto += `<form id="fotoForm" action="http://localhost:3000/usuario/${sesion.usuario}/foto" method="post" enctype="multipart/form-data" target="_blank">`;
  htmlFoto += `<br style="clear:both">`;
  htmlFoto += `<h3 style="margin-bottom: 25px; text-align: center;"> FOTO</h3>`;
  htmlFoto += `<div class="custom-file">`;
  htmlFoto += `  <label class="custom-file-label" for="foto">Seleccione Foto...</label>`;
  htmlFoto += `  <input data-type="foto" type="file" class="custom-file-input" name="foto" id="foto" required>`;
  htmlFoto += `</div>`;
  htmlFoto += `<button type="submit" id="submit_foto" name="submit" class="btn btn-primary pull-right">CAMBIAR FOTO</button>`;
  htmlFoto += `</form>`;

  $('#formFoto').append(htmlFoto);

  /*$('#submit_foto').on('click', function() {
    $('.error').remove();
    var status = 0;

    status += validar($('#foto'));

    if(status > 0) return 0;

    console.log('Enviado');

  });*/

//--------------------CONTRASENA--------------------

  $('#submit_contrasena').on('click', function() {
    $('.error').remove();
    var status = 0;

    status += validar($('#contrasena'));
    status += validar($('#contrasena_rep'));

    if(status > 0) return 0;

    if($('#contrasena').val() !== $('#contrasena_rep').val()) {
      error($('#contrasena'), 'Las contraseñas no coinciden!');
      error($('#contrasena_rep'), 'Las contraseñas no coinciden!');
      return 0;
    }

    var objeto = {
      contrasena: md5($('#contrasena').val())
    }

    $.ajax({url: `http://localhost:3000/usuario/${sesion.usuario}/contrasena`,data: objeto ,method: `put`})
    .done(function(data) {
      $('#contrasena').val('');
      $('#contrasena_rep').val('');
      alertify.alert("MyFiles", "Su contraseña ha sido actualizada.", function(){
        alertify.message('OK');
      });
    });
  });

});
