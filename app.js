var express = require('express'); // módulo express
var app = express(); // objeto express
var bodyParser = require('body-parser'); // processa corpo de requests
var path = require('path'); // módulo usado para lidar com caminhos de arquivos
var fs = require('fs'); // módulo para lidar com arquivos
var msg_file = __dirname + '/messages.json'; // arquivo de mensagens


app.use(bodyParser.json()); // carrega módulo de análise json no express
app.use(express.static('public')); //Para adicionar todos os arquivos que estão na pasta public

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html')); // retorna o index.html
});

app.get('/obter_mensagem', function(req, res) {
    var obj = JSON.parse(fs.readFileSync(msg_file)); // retorna as mensagens
    res.send(obj);
});

app.post('/gravar_mensagem', function(req, res) {
    var obj = JSON.parse(fs.readFileSync(msg_file)); // le arquivo de mensagens como objeto
    obj.push(req.body); // inclui a mensagem enviada no objeto	
    fs.writeFileSync(msg_file, JSON.stringify(obj)); // grava o objeto de mensagens
    res.append('Content-type', 'application/json'); // inclui o tipo de resposta
    res.json(obj); // envia o objeto
});

app.listen(3000, function() { // inicia o servidor
    console.log('Example app listening on port 3000!');
});