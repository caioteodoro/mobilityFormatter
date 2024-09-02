chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === "buscarElemento") {
        var elemento = document.getElementById(message.elementoId);
        if (elemento) {
            sendResponse({elementoHTML: elemento.innerHTML});
        } else {
            sendResponse({error: "Elemento não encontrado"});
        }
    }
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log("Mensagem recebida:", message);
    sendResponse({response: "Olá do content script!"});
    return true; // Garante que a conexão para enviar a resposta não seja encerrada
});