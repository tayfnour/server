var WebSocketServer = require('ws').Server
, http = require('http')
, express = require('express')
, app = express()
, port = process.env.PORT || 5000;

// new change server

app.use(express.static(__dirname + '/'));

var server = http.createServer(app);

server.listen(port);

var wss = new WebSocketServer({server: server});

//var HOST = location.origin.replace(/^http/, 'ws');

wss.on('connection', function (ws) {

    console.log('client connected');

    ws.on('message', function (message) {
        console.log(message);

        wss.broadcast(message);
    });

    ws.send("Server :I'm Ready...");
    console.log(wss.clients);


});

wss.broadcast = function broadcast(msg) {
    console.log(msg);
    wss.clients.forEach(function each(client) {
        client.send(msg);
    });

}

wss.addEventListener('hassan', (data) => {
    // data.data contains your forwarded data
    console.log(data.data)
})

wss.on('hassan', function (ws) {
    ws.send("hassan event");
});