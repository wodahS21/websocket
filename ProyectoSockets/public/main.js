const { text } = require("express");

var socket = io.connect('http://localhost:3005', {'forceNew': true});

/*El cliente maneja datos mediante mensajes, esto se llamara eventos y se mostraran por consola en el navegador*/ 
socket.on('messages', function(data){
    console.log(data);
    render(data);
});
/*Creamos un template para que nos imprima el contenido */

function render(data){
    var html = data.map(function(elem, index){
        return(`<div> 
        <strong>${elem.autor}</strong>; 
        <em>${elem.texto}</em>;
     </div>`);
    }).join("");
     
    document.getElementById('messages').innerHTML = html;
}

// cada ves que alguien precione el boton enviar en el formulario el cliente
// emite un nuevo mensaje y manda el payload
function addMessage(e){
var payload ={
       autor: document.getElementById(username).value,
       texto: document.getElementById(texto).value
};
socket.emit('new-message', payload);
}