if(Cookies.get('sesion') == null)
  window.location.replace("./index.html");

var sesion = Cookies.getJSON('sesion');

$('document').ready(function() {
  $.ajax({url: `http://localhost:3000/usuario/${sesion.usuario}`,method: `get`})
  .done(function(data) {
    render(data[0]);
  });

  function render(data) {
    console.log(data);
    if(data.foto === 'default'){
      $('#foto').attr('src', `img/usuarios/perfil.png`);
    }else{
      $('#foto').attr('src', `img/usuarios/${data.foto}`);
    }

    $('#nombre').html(data.nombre);
    $('#apellido').html(data.apellido);
    $('#domicilio').html(data.domicilio);
    $('#ciudad').html(data.ciudad);
    $('#telefono').html(data.telefono);
    $('#correo').html(data.correo);
    $('#nombre_dependiente_1').html(data.nombre_dependiente_1);
    $('#edad_dependiente_1').html(data.edad_dependiente_1);
    $('#nombre_dependiente_2').html(data.nombre_dependiente_2);
    $('#edad_dependiente_2').html(data.edad_dependiente_2);
  }
});
