
import { API } from './api.js';
import * as UI from './interfaz.js';

// console.log(UI);
UI.formularioBuscar.addEventListener('submit', (e) => {
    e.preventDefault();

    //obtener datos del formulario

    const artista = document.querySelector('#artista').value,
          cancion = document.querySelector('#cancion').value;

    if(artista ===''|| cancion === ''){ // mostrar error para que muestre 
             UI.divMensajes.innerHTML = 'Error... Todos los campos son obligatorios';
             UI.divMensajes.classList.add('error');

    
      // borrara el error
    setTimeout(() => {
        UI.divMensajes.innerHTML = '';
        UI.divMensajes.classList.remove('error');
   }, 3000);
  }else {
        // el formulario esta completo , realizar consulta de la api
        const api = new API( artista, cancion);

        api.consultarAPI()
            .then(data => {
              if(data.respuesta.lyrics){
                //console.log('si exite');
                //console.log(data);
                const letra = data.respuesta.lyrics;
                UI.divResultado.textContent = letra;

              }else{
                //console.log('no exist ');
                UI.divMensajes.innerHTML = 'La cancion no existe, prueba con otra VEZ';
                UI.divMensajes.classList.add('error');
     
                setTimeout(() => {
                UI.divMensajes.innerHTML = '';
                UI.divMensajes.classList.remove('error');
                UI.formularioBuscar.reset();
               }, 3000);
              }
            });    
  }
});
