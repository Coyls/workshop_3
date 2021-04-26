let serveurSocket = new WebSocket("ws://www.serveurworkshop.com");

serveurSocket.onopen = function (event) {
    let msgInit = {
        type: "initEcran", //nom de message serveur
        idEcran: 3, // identifiant de l'écran
    };

    // Envoi de l'objet msg à travers une chaîne formatée en JSON
    serveurSocket.send(JSON.stringify(msgInit));
};

serveurSocket.onmessage = function (event) {
    let message = event.data;

    if(message.type === "changeHumeur") {
        console.log(data.type); //"humeurReceive"
        console.log(data.humeur); //0 ou 1
    }
}