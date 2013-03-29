var Draw = function() {
};

Draw.prototype.text = function(text) {

    var text_cell = $('<div>');
        text_cell.addClass('text_cell');
        text_cell.text(text);

    $('#chatlog').append(text_cell);

};

Draw.prototype.img = function(url) {

    var img_cell = $('<img>');
    img_cell.addClass('url_cell');
    img_cell.attr({'src':url});
    $('#chatlog').append(img_cell);

};
