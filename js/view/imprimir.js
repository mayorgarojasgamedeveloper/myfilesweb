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

  // FORMACIÓN ACADÉMICA
  $.ajax({url: `http://localhost:3000/formacion`, method: `get`})
  .done(function(data) {
    html = `<h2>FORMACIÓN ACADÉMICA</h2>`;
    html += `<table class="table table-striped">`;
    html += `<thead>`;
    html += `<tr>`;
    html += `<th>Grado</th>`;
    html += `<th>Nombre</th>`;
    html += `<th>Institución</th>`;
    html += `<th>Fecha Obtención</th>`;
    html += `<th>Cédula Profesional</th>`;
    html += `</tr>`;
    html += `</thead>`;
    html += `<tbody>`;
    $.each(data, function(index, value) {
      if(value.usuario === sesion.usuario) {
        html += `<tr>`;
        html += `  <td>${value.grado}</td>`;
        html += `  <td>${value.nombre}</td>`;
        html += `  <td>${value.institucion}</td>`;
        html += `  <td>${value.fecha_obtencion.substring(0,10)}</td>`;
        html += `  <td>${value.cedula}</td>`;
        html += `</tr>`;
      }
    });
    html += `</tbody>`;
    html += `</table>`;
    $('#tablas').append(html);
  });

  //PRODUCCIÓN ACADÉMICA
  $.ajax({url: `http://localhost:3000/produccion`, method: `get`})
  .done(function(data) {
    html = `<h2>PRODUCCIÓN ACADÉMICA</h2>`;
    html += `<table class="table table-striped">`;
    html += `<thead>`;
    html += `<tr>`;
    html += `<th>Producción</th>`;
    html += `<th>Título</th>`;
    html += `<th>Fecha</th>`;
    html += `<th>Núm. Registro</th>`;
    html += `</tr>`;
    html += `</thead>`;
    html += `<tbody>`;
    $.each(data, function(index, value) {
      if(value.usuario === sesion.usuario) {
        html += `<tr>`;
        html += `  <td>${value.tipo}</td>`;
        html += `  <td>${value.titulo}</td>`;
        html += `  <td>${value.fecha.substring(0,10)}</td>`;
        html += `  <td>${value.num_registro}</td>`;
        html += `</tr>`;
      }
    });
    html += `</tbody>`;
    html += `</table>`;
    $('#tablas').append(html);
  });

  //CARGA ACADÉMICA
  $.ajax({url: `http://localhost:3000/carga`, method: `get`})
  .done(function(data) {
    html = `<h2>CARGA ACADÉMICA</h2>`;
    html += `<table class="table table-striped">`;
    html += `<thead>`;
    html += `<tr>`;
    html += `<th>Asignatura</th>`;
    html += `<th>Fecha Inicio</th>`;
    html += `<th>Fecha Fin</th>`;
    html += `<th>Programa</th>`;
    html += `<th>Horas/Semana</th>`;
    html += `</tr>`;
    html += `</thead>`;
    html += `<tbody>`;
    $.each(data, function(index, value) {
      if(value.usuario === sesion.usuario) {
        html += `<tr>`;
        html += `<td>${value.nombre}</td>`;
        html += `<td>${value.fecha_inicio.substring(0,10)}</td>`;
        html += `<td>${value.fecha_fin.substring(0,10)}</td>`;
        html += `<td>${value.programa}</td>`;
        html += `<td>${value.horas_semana} hrs. por semana</td>`;
        html += `</tr>`;
      }
    });
    html += `</tbody>`;
    html += `</table>`;
    $('#tablas').append(html);
  });

  // TUTORÍAS
  $.ajax({url: `http://localhost:3000/tutorias`, method: `get`})
  .done(function(data) {
    html = `<h2>TUTORÍAS</h2>`;
    html += `<table class="table table-striped">`;
    html += `<thead>`;
    html += `<tr>`;
    html += `<th>Nombre Alumno</th>`;
    html += `<th>Fecha Inicio</th>`;
    html += `<th>Fecha Fin</th>`;
    html += `<th>Horas/Semana</th>`;
    html += `</tr>`;
    html += `</thead>`;
    html += `<tbody>`;
    $.each(data, function(index, value) {
      if(value.usuario === sesion.usuario) {
        html += `<tr>`;
        html += `<td>${value.nombre_alumno}</td>`;
        html += `<td>${value.fecha_inicio.substring(0,10)}</td>`;
        html += `<td>${value.fecha_fin.substring(0,10)}</td>`;
        html += `<td>${value.horas_semana} hrs. por semana</td>`;
        html += `</tr>`;
      }
    });
    html += `</tbody>`;
    html += `</table>`;
    $('#tablas').append(html);
  });

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
