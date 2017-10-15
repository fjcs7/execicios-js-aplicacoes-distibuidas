/*
  Carrega as mensagens ocorridas após o 'timestamp',
  acrescentando-as no 'element_id' passado como parâmetro
*/
function carrega_mensagens(element_id, timestamp) {
    $.get("/obter_mensagem", function(data, status) {
        if (status == "success") {
            carrega_mensagem_no_elemento(data, element_id);
        } else {
            alert("erro: " + status);
        }
    });
}

function carrega_mensagem_no_elemento(data, element_id) {
    var mensagem = "";
    var horario = "";
    var new_timestamp = "0";
    var linhas = data;
    for (var i = 0; i <= linhas.length - 1; i++) {
        horario = timestamp_to_date(linhas[i].timestamp);
        mensagem = "[" + horario + " - " + linhas[i].nick + "]: " + linhas[i].msg;
        new_timestamp = linhas[i].timestamp;
        adiciona_mensagem(mensagem, element_id, new_timestamp);
    }
}

function adiciona_mensagem(mensagem, elemento_id, timestamp) {
    var novo_elemento = document.createElement('div');
    novo_elemento.id = "mensagem" + timestamp;
    document.getElementById(elemento_id).appendChild(novo_elemento);
    document.getElementById('mensagem' + timestamp).innerHTML = mensagem;
}

function submete_mensagem(element_user_id, element_mensagem_id, destination_id) {
    var mensagem = document.getElementById(element_mensagem_id).value;
    var usuario = document.getElementById(element_user_id).value;

    document.getElementById(element_mensagem_id).value = "";

    var msg = '{"timestamp":"' + Date.now() + '",' +
        '"nick":"' + usuario + '",' +
        '"msg":"' + mensagem + '"}';
    $.ajax({
        type: "post",
        url: "/gravar_mensagem",
        data: msg,
        success: function(data, status) {
            if (status == "success") {
                carrega_mensagem_no_elemento(data, destination_id);
            } else {
                alert("erro:" + status);
            }
        },
        contentType: "application/json",
        dataType: "json"
    });
}

/*
  Transforma timestamp em formato HH:MM:SS
*/
function timestamp_to_date(timestamp) {
    var dateTime = new Date(parseInt(timestamp));
    return dateTime.toLocaleTimeString();
}