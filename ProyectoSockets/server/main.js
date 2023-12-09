var express = require('express');
var app = express();

/* Aqui estara toda la funcionalidad de los socket, es recomendable usar el moudlo http
   para pasarle la app a express y manejar bien http */
var server = require('http').Server(app);
//var io = require('socket.io')(server);

// SECCION DE CORS
var io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['get'],
        allowedHeaders: ["*"],
    }
});

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


var messages = [{
    id: 1,
    texto: "Hola soy un mensaje",
    autor: "Yael Avila Melendez"
}];

app.use(express.static('../public'));

app.get('/', function(req, res){
    res.status(200).send("Hola mundo");
});

/* De esta forma activamos socket para que este escuchando mandamos un mensaje de control por consola para saber que pasa y tenemos que hacer que el mensaje venga del navegador web
   mediante html y JS */
io.on('connection' , function (socket){
    console.log('Alguien se ha conectado con socket');

    //Controlador de eventos del cliente mediante sockets
    socket.emit('messages', messages);

    // Ahora queremos escuchar los mensajes mandados por el cliente
    socket.on('new-message', function(data){
        // Para poder guardar estos mensajes lo ideal seria en una base de datos
        // Para este ejercicio utilizaremos arrays (esto no es bueno en produccion
        messages.push(data);
        //
        io.sockets.emit('messages', messages);
    });
});

server.listen(3005, function(){
    console.log("El servidor esta corriendo en http://192.168.1.124:3005");

});