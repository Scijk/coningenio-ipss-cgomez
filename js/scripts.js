const tokenBearer = 'ciisa';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/' //proxy publico, error cors local

// Scroll suave al navegar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

// Cargar servicios desde API
$(function() {
    const apiUrl = 'https://ciisa.coningenio.cl/v1/services/';
    const headerParam = { 'Authorization' : 'Bearer ' + tokenBearer }
    $.ajax({
        url: proxyUrl+apiUrl,
        type: 'GET',
        dataType: 'json',
        headers: headerParam,
        success: function(data) {
            console.log(data);
            const container = document.getElementById('servicios-container');
            container.innerHTML = data.data.map(servicio => 
                servicio.activo ? 
                    `<div class="servicio">
                        <h3>${servicio.titulo.esp}</h3>
                        <p>${servicio.descripcion.esp}</p>
                    </div>` : ''
            ).join('');
        },
        error: function(error) {
            console.error('Error al cargar informacion sobre servicios:', error);
            document.getElementById('about-container').innerHTML = `
            <p>Error al cargar la información desde la API. Verifica tu conexión o token.</p>`;
        }
    });
});

// Cargar misión y visión desde API
$(function() {
    const apiUrl = 'https://ciisa.coningenio.cl/v1/about-us/';
    const headerParam = { 'Authorization' : 'Bearer ' + tokenBearer }
    $.ajax({
        url: proxyUrl+apiUrl,
        type: 'GET',
        dataType: 'json',
        headers: headerParam,
        success: function(data) {
            const about = document.getElementById('about-container');
            const nos = data.data;
            about.innerHTML = '';
            for(let i = 0; i < nos.length; i++) {
                console.log(nos[i]);                       
                if(nos[i].titulo.eng == 'Mission') {
                    about.innerHTML = about.innerHTML + `<h3>Misión</h3>    
                    <p>${nos[i].descripcion.esp}</p>`;
                }
                if(nos[i].titulo.eng == 'Vision') {
                    about.innerHTML = about.innerHTML + `<h3>Visión</h3>
                    <p>${nos[i].descripcion.esp}</p>`;
                }
            }
        },
        error: function(error) {
            console.error('Error al cargar misión y visión:', error);
            document.getElementById('about-container').innerHTML = `
            <p>Error al cargar la información desde la API. Verifica tu conexión o token.</p>`;
        }
    });
});
