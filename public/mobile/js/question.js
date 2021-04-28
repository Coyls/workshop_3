document.querySelector("body").innerHTML += `
<div id="previewRep1"></div>
<div id="previewRep2"></div>
<div id="questionAndRep-wrapper">

    <div id="backGround-anim">

    </div>
    <div id="repU-wrapper"><p></p></div>
    <div id="question-wrapper">
        <div id="arrowUp-wrapper">
            <div id="arrowUp"></div>
            <p id="arrowUp-text"></p>
        </div>
        <div id="question"><p></p></div>
        <div id="arrowDown-wrapper">
            <div id="arrowDown"></div>
            <p id="arrowDown-text"></p>
        </div>
    </div>
    <div id="repD-wrapper"><p></p></div>
</div>`

let wait = false
let mov = false

const menu = document.querySelector("#menu-btn")

window.addEventListener("load", () => {
    if (!wait) {
        setTimeout(() => {
            const waitingWrapper = document.querySelector("#waiting-wrapper")
            const questionAndRepWrapper = document.querySelector("#questionAndRep-wrapper")
            const previewRep1 = document.querySelector("#previewRep1")
            const previewRep2 = document.querySelector("#previewRep2")
            console.log("inside timeout");
            menu.style = "opacity : 0;";
            waitingWrapper.style = "display : none"
            questionAndRepWrapper.style = "display : flex;"
            let swipedir, startY, distY;

            questionAndRepWrapper.addEventListener('touchstart', (e) => {
                if (!mov) {
                    swipedir = 'none'
                    distY = 0
                    startY = e.changedTouches[0].pageY
                    e.preventDefault()
                }
            })
            questionAndRepWrapper.addEventListener("touchmove", (e) => {
                if (!mov) {
                    distY = e.changedTouches[0].pageY - startY
                    swipedir = (distY < 0) ? 'up' : 'down'
                    appearRep(swipedir, distY)
                    e.preventDefault()
                }
            })

            questionAndRepWrapper.addEventListener('touchend', (e) => {

                if (!mov) {
                    distY = e.changedTouches[0].pageY - startY
                    swipedir = (distY < 0) ? 'up' : 'down'
                    appearRep(0, 0);
                    if (Math.abs(distY) >= 300) {
                        swipe(swipedir)
                    }

                }

            })

            function swipe(dir) {
                mov = true
                window.navigator.vibrate(200);
                setTimeout(function () {
                    menu.style = "opacity : 1; transition : 1s";
                }, 750);
                if (dir === "up") {
                    questionAndRepWrapper.style = "display : flex;top:-200vh"
                } else {
                    questionAndRepWrapper.style = "display : flex;top:0"
                }
            }

            function appearRep(dir, distY) {
                if (distY > 100) {
                    distY = 100;
                }
                if (distY < -100) {
                    distY = -100;
                }
                if (dir === "down") {
                    previewRep1.style = `opacity : 1; top:${-100 + distY}px`
                    previewRep2.style = `opacity : 0; bottom:-100px`
                } else if (dir === "up") {
                    previewRep2.style = `opacity : 1; bottom:${-100 - distY}px`
                    previewRep1.style = `opacity : 0; top:-100px`
                } else {

                    previewRep1.style = `opacity : 0; top:-100px`
                    previewRep2.style = `opacity : 0; bottom:-100px`
                }
            }
        }, 1);
    }
})

menu.onclick = () => {
    console.log("test")
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const url = 'ws://vps215076.ovh.net:3000'
const serveurSocket = new WebSocket(url)

let params = (new URL(document.location)).searchParams;
let screenId = parseInt(params.get('screenId'))

const postMood = () => {
    console.log('post Mood')
    // Création d'un objet msg qui contient les données
    // dont le serveur a besoin pour traiter le message
    var msg = {
        type: "post", //nom de message serveur
        idEcran: screenId, // identifiant de l'écran
        idReponse: responseId, // id reponse
        humeur: moodId // Réponse à la question, valeur possibile 0 ou 1
    };

    // Envoi de l'objet msg à travers une chaîne formatée en JSON
    serveurSocket.send(JSON.stringify(msg));
}
postMood()

let mobile = {
    type: "mobile",
    id_screen: screenId,
};

serveurSocket.onopen = (event) => {
    serveurSocket.send(JSON.stringify(mobile))
}
serveurSocket.onerror = (error) => {
    console.log(`WebSocket error: ${error}`)
}
serveurSocket.onmessage = (event) => {
    let data = event.data;
    let type = data.type


    if (type === 'pullquestion' && screenId === data.idQuestion) {
        console.log(data)
        // Afficher les données
    }

    
}