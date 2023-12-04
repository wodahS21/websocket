
var socket = io.connect('http://localhost:3005', ('forceNew', true));

/*El cliente maneja datos mediante mensajes, esto se llamara eventos y se mostraran por consola en el navegador*/ 
socket.on('messages', function(data){
    console.log(data);
});
/*Creamos un template para que nos imprima el contenido */

function render(data){
    //aqui se inicia el manejo de String que viene en EMG se usan estas comillas ''
    //Las variables se coloccan con el sigono de $ y entre ()
    var html = `<div> 
                   <strong>$(data.autor)</strong>; 
                   <em>$(data.texto)</em>
                </div>`;
    document.getElementById('messages').innerHTML = html;
}