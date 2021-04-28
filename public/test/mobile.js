console.log("mobile") //// MOBILE

const url = 'ws://vps215076.ovh.net:3000'
const serveurSocket = new WebSocket(url)

let params = (new URL(document.location)).searchParams;
let screenId = parseInt(params.get('screen_id'))


// Object init ---------------------------
let mobileInit = {
    type: "init",
    deviceType: "mobile",
    screenId: screenId,
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
    // console.log("Mobile link to" + screenId, event.data)
    const data = JSON.parse(event.data)
    console.log(data)

    if (data.type === 'mobileData') {
        console.log(data.question)

    }
}



// Send data post ---------------------------------------------
const postBtn = document.getElementById('post')
let moodId = 1 ///// !!!!!!!!!!! A SUPPRIMER

postBtn.addEventListener('click', () => {
     const postMood = () => {
        console.log('post Mood')
        let post = {
            type: "post", //nom de message serveur
            idEcran: screenId, // identifiant de l'écran
            moodId: moodId // Réponse à la question, valeur possibile 0 ou 1
        };
    
        serveurSocket.send(JSON.stringify(post));
    }
    postMood() 
})


