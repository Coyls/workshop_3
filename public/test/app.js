console.log("test Screen -> Server")

const url = 'ws://vps215076.ovh.net:3000'
const serveurSocket = new WebSocket(url)

let params = (new URL(document.location)).searchParams;
let screenId = parseInt(params.get('screenId'))
if (screenId === NaN) screenId = 0
//////////////////////////////////////////////////////////////////////////////////////////////
// MOBILE
const postBtn = document.getElementById('post')

function envoiHumeur() {
    // Création d'un objet msg qui contient les données
    // dont le serveur a besoin pour traiter le message
    var msg = {
      type: "post", //nom de message serveur
      idEcran: screenId, // identifiant de l'écran
      idQuestion: 0,  // identifiant de la question
      humeur: 0 // Réponse à la question, valeur possibile 0 ou 1
    };
  
    // Envoi de l'objet msg à travers une chaîne formatée en JSON
    serveurSocket.send(JSON.stringify(msg));
  }

postBtn.addEventListener('click', envoiHumeur())
/////////////////////////////////////////////////////////////////////////////////////////////////




/////////////////////////////////////////////////////// SCREEN //////////////////////////////////
// Object
let screen = {
    type: "screen",
    id_screen: screenId,
};

let disconnect = {
    type: "disconnect",
    id_screen: screenId,
};

console.log(screen)

// Connection WebSocket
serveurSocket.onopen = (event) => {
    connection.send(JSON.stringify(screen))
}
serveurSocket.onerror = (error) => {
    console.log(`WebSocket error: ${error}`)
}
serveurSocket.onmessage = (event) => {
  var message = event.data;
  
  if(message.type === "post") {
    console.log(data.type); //"humeurReceive"
    console.log(data.humeur); //0 ou 1  
  }
}


// ?screenId=1