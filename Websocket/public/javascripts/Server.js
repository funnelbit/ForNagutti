//var socket = new io.connect();

var Server = function() {

    socket = new io.connect();

    socket.on('connect', function() {
        console.log('connection');
    });
    socket.on('chat', function(json) {
        draw = new Draw();
        draw.text(json.text);
    });
    socket.on('img', function(json) {
        draw = new Draw();
        draw.img(json.url);
    });

};

Server.prototype.sendText = function(text) {
    console.log('emit');
    socket.emit('chat', {text:text});
};

Server.prototype.sendImg = function(text) {
    console.log('emit');
    socket.emit('img', {url:text});
};

