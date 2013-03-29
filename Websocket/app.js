
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , socketio = require('socket.io')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

//httpのみでアプリ動かすならこっちだが
/*
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
*/
//今回はWebSocketつかうのでこっち
var io = socketio.listen(http.createServer(app).listen(app.get('port')),function() {
    console.log('いけ！！ウェブソケット！！リアルタイムウェブだ！！' + app.get('port'));
});


io.on('connection', function(socket) {
    console.log('頭がフットーしそうだよおっっ');

    socket.on('chat', function(json) {
        console.log(json);
        var text = json.text;
        socket.emit('chat', {text:text});
        socket.broadcast.emit('chat', {text:text});
    });
    socket.on('img', function(json) {
        console.log(json);
        var url = json.url;
        socket.emit('img', {url:url});
        socket.broadcast.emit('img', {url:url});
    });
});


