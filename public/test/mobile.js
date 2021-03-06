// Fonction delay
const wait = (delay) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, delay);
    })
}
////////////////////////////////////
let animationLoad = false

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

console.log("mobileInit", mobileInit)

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
    // console.log(data)

    if (data.type === 'mobileData') {
        console.log("question/response", data.question)

    } else if (data.type === 'mobileState') {
        console.log("State", data.state)

        if (data.state === 'actif') {
            wait(60000).then(() => {
                if (!animationLoad) {
                    window.location.href = "http://vps215076.ovh.net/comment_ca_va/public/mobile/home.html";
                }
            })
        }
    } else if (data.type === 'disconnecte') {
        console.log("Mobile deconnecter")
        window.location.href = "http://vps215076.ovh.net/comment_ca_va/public/mobile/home.html";

    }
}



// Send data post ---------------------------------------------
const postBtn = document.getElementById('post')
let moodId = 1 ///// !!!!!!!!!!! A SUPPRIMER
let idResponse = 1

postBtn.addEventListener('click', () => {
    const postMood = () => {
        console.log('post Mood')
        let post = {
            type: "post", //nom de message serveur
            idEcran: screenId, // identifiant de l'??cran
            moodId: moodId, // R??ponse ?? la question, valeur possibile 0 ou 1
            idResponse: idResponse
        };

        animationLoad = true

        serveurSocket.send(JSON.stringify(post));
    }
    postMood()
})


