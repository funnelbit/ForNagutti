$(document).ready(function() {

    var server = new Server();

    $('#text_send').on('click', function() {
        var text = $('#text').val();
        server.sendText(text);
    });
    $('#url_send').on('click', function() {
        var url = $('#url').val();
        server.sendImg(url);
    });

});
