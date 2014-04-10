var connect = require('connect'),
    http = require('http');

var app = connect()
    .use(connect.favicon())
    .use(connect.logger('dev'))
    .use(connect.static('development'));

// Cria servidor http só com conteúdo do static na porta 8000
http.createServer(app).listen(8000);