//todo Creamos variable que permita la conexion entre back y front 
var socket = io.connect('http://192.168.0.10:3005', {'forceNew': true });
//* Esto manda al servidor el mensaje de connect y aparece en consola

//* El cliente manejara datos mediante mensajes, esto se llamaran evento y se mostraran por consola en el navegador

socket.on('messages', function (data) {
    console.log(data);
    render(data);
});

function render(data) {

    var html = data.map(function (elem, index) {

        return (`<div>
                    <strong>${elem.autor}</strong>:
                    <em>${elem.texto}</em>
                </div>`);     
    }).join(" ");

    document.getElementById('messages').innerHTML = html;
}


//* cada ves que alguien presione el boton enviar en el formulario el cliente emite un nuevo mensaje y manda el payload
function addMessage(e) {

    var payload = {
        autor: document.getElementById('username').value,
        texto: document.getElementById('texto').value
    };

    socket.emit('new-message', payload);
    const msj = document.getElementById('text');
    msj.value='';
    return false;
}