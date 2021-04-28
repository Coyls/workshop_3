console.log("mobile") //// MOBILE

const url = 'ws://vps215076.ovh.net:3000'
const serveurSocket = new WebSocket(url)

let params = (new URL(document.location)).searchParams;
let screenId = parseInt(params.get('screen_id'))


// Object init ---------------------------
let mobileInit = {
    type: "init",
    deviceType: "mobile",
    mobileId: screenId,
};

console.log(mobileInit)

// Connection WebSocket ---------------------------
serveurSocket.onopen = () => {
    serveurSocket.send(JSON.stringify(mobileInit))
}
serveurSocket.onerror = (error) => {
    console.log(`WebSocket error: ${error}`)
}

// message ----------------------------------------
serveurSocket.onmessage = (event) => {
    console.log("Mobile link to" + screenId, event.data)

    /* var message = event.data;

    if (message.type === "post") {
        console.log(data.type); //"humeurReceive"
        console.log(data.humeur); //0 ou 1  
    } */
}




// Send data post ---------------------------------------------
const postBtn = document.getElementById('post')

postBtn.addEventListener('click', () => {
     const postMood = () => {
        console.log('post Mood')
        var msg = {
            type: "post", //nom de message serveur
            idEcran: screenId, // identifiant de l'écran
            // humeur: moodId // Réponse à la question, valeur possibile 0 ou 1
        };
    
        serveurSocket.send(JSON.stringify(msg));
    }
    postMood() 
})


