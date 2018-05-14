if(Cookies.get('sesion') == null)
  window.location.replace("index.html");

var sesion = Cookies.getJSON('sesion');

$('document').ready(function() {


  $.ajax({url: `http://localhost:3000/usuario/${sesion.usuario}`,method: `get`})
  .done(function(data) {
    render(data[0]);
  });

  function render(data) {
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



  // DESCARGAS
  $('#btn_pdf').click(function () {

    $('.ignore').remove();
    var doc = new jsPDF();

    doc.setDrawColor(148, 77, 77);
    doc.setFillColor(148, 77, 77);
    doc.triangle(210, 20, 0, 0, 0, 25, 'FD');

    doc.setDrawColor(217, 217, 217);
    doc.setFillColor(217, 217, 217);
    doc.triangle(0, 0, 210, 25, 210, 0, 'FD');

    doc.setFontSize(30);
    doc.text(90, 15, 'MyFiles');

    var source = $('#print').html();
    console.log(source);
    doc.fromHTML(
    source, // HTML string or DOM elem ref.
    10, // x coord
    30, // y coord
    {
    'width': 200 // max width of content on PDF
    });

    doc.save(Cookies.getJSON('sesion')['usuario']+'-curriculum.pdf');
    $('#print').prepend('<img class="ignore" src="img/panel.png" alt="Panel">');
  });

  $('#btn_word').click(function () {
    $('.ignore').remove();
    $('#print').prepend('<img class="ignore" src="img/panel.png" alt="Panel">');
    $('#print').wordExport(Cookies.getJSON('sesion')['usuario']+'-curriculum.pdf');
  });

});
