var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server); 

app.use(express.static('public'));
app.get('/',function(req,res){
    res.status(200).send("Hola Mundo");
});

io.on('connection', function (socket){
    console.log('Alguien se ha conectado con socker');
});
server.listen(3005, function(){
    console.log("El servidor esta corriendo en http://localhost:3005");

});