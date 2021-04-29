let wait = false

// Fonction delay
const waitTimer = (delay) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, delay);
    })
}
////////////////////////////////////
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
    const data = JSON.parse(event.data)

    if (data.type === 'mobileData') {
        console.log("question/response", data.question)

    } else if (data.type === 'mobileState') {
        console.log("State", data.state)
        if (data.state === "inactif") {
            wait = true
        }

        if (data.state === 'actif') {
            wait = false
            waitTimer(60000).then( () => {
                window.location.href = "http://vps215076.ovh.net/comment_ca_va/public/mobile/home.html";
            })
        }
    } else if (data.type === 'disconnecte') {
        console.log("Mobile deconnecter")
        window.location.href = "http://vps215076.ovh.net/comment_ca_va/public/mobile/home.html";

    }
}


// Send data post ---------------------------------------------

const postMood = (mood) => {
    console.log('post Mood')
    let post = {
        type: "post", //nom de message serveur
        idEcran: screenId, // identifiant de l'écran
        moodId: mood // Réponse à la question, valeur possibile 0 ou 1
    };

    serveurSocket.send(JSON.stringify(post));
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

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
                    postMood(2)
                } else {
                    questionAndRepWrapper.style = "display : flex;top:0"
                    postMood(1)
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
