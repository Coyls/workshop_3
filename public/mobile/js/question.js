let wait = false
let animationLoad = false
let idResponseP
let idResponseN
let format
let elementPage
// Fonction delay
const waitTimer = (delay) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, delay);
    })
}

let params = (new URL(document.location)).searchParams;
let screenId = parseInt(params.get('screen_id'))
if (!params.get('screen_id')) {
    window.location.href = "http://vps215076.ovh.net/comment_ca_va/public/mobile/home.html";
} else if (screenId < 1 || screenId > 6) {
    window.location.href = "http://vps215076.ovh.net/comment_ca_va/public/mobile/home.html";
}

////////////////////////////////////
console.log("mobile") //// MOBILE

const url = 'ws://vps215076.ovh.net:3000'
const serveurSocket = new WebSocket(url)


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
    console.log("catch node event : " + data.type)
    console.log("Data: ", data)
    if (data.type === 'mobileData') {
        console.log("question/response", data.question)
        idResponseP = data.question[0].responseID
        idResponseN = data.question[1].responseID
        format = data.question[0].format

        if (format === "slide") {
            if(screenId===2) {
                elementPage = `<img src="./image/reponse_backgrounds/positive_2/element_1.png" style="left : 2.6vw; top:7.4vh; height:16.7vh; width: 36.2vw">
<img src="./image/reponse_backgrounds/positive_2/element_2.png" style="right : 0; top:15vh; width: 62.6vw">
<img src="./image/reponse_backgrounds/positive_2/element_3.png" style="left : 0; top:61vh;width: 81vw">
<img src="./image/question_backgrounds/question_2/element_1.png" style="left : 2.4vw; top:calc(100vh + 7.7vh); height:26vh; width: 74.6vw">
<img src="./image/question_backgrounds/question_2/element_2.png" style="right : 0; top:calc(100vh + 52vh); height:32.4vh; width: 43.5vw">
<img src="./image/reponse_backgrounds/negative_2/element_1.png" style="left : 0; bottom:-10vh;  width: 100vw">
<img src="./image/reponse_backgrounds/negative_2/element_2.png" style="right : 2.6vw; top:calc(200vh + 8vh); height:40.8vh; width: 47.2vw">`

            }else if(screenId===6) {
                elementPage = `<img src="./image/reponse_backgrounds/positive_6/element_1.png" style="right : 3.1vw; top:16.25vh; height:17.5vh; width: 38vw">`
                elementPage += `<img src="./image/reponse_backgrounds/positive_6/element_2.png" style="left : 24vw; top:21.2vh; height:4.2vh; width:9.2vw">`
                elementPage += `<img src="./image/reponse_backgrounds/positive_6/element_3.png" style="left : 56vw; top:69vh; height:10.7vh; width: 27.5vw">`
                elementPage += `<img src="./image/reponse_backgrounds/positive_6/element_4.png" style="left : 11.7vw; top:59.6vh; height:6.7vh; width: 14.5vw">`

                elementPage += `<img src="./image/question_backgrounds/question_6/element_2.png" style="left : 5.5vw; top:calc(100vh + 7vh); height:21.3vh; width: 47.7vw">`
                elementPage += `<img src="./image/question_backgrounds/question_6/element_4.png" style="right : 15.1vw; top:calc(100vh + 23.6vh); height:6vh; width: 8.5vw">`
                elementPage += `<img src="./image/question_backgrounds/question_6/element_3.png" style="right : 10.4vw; top:calc(100vh + 63.4vh); height:7vh; width: 21vw">`
                elementPage += `<img src="./image/question_backgrounds/question_6/element_1.png" style="left : 6.4vw; top:calc(100vh + 81vh); height:9.2vh; width: 24.5vw">`

                elementPage += `<img src="./image/reponse_backgrounds/negative_6/element_3.png" style="right : 13vw; top:calc(200vh + 10.8vh); height:5vh; width: 24.5vw">`
                elementPage += `<img src="./image/reponse_backgrounds/negative_6/element_4.png" style="left : 17.6vw; top:calc(200vh + 24.4vh); height:8.6vh; width: 30.6vw">`
                elementPage += `<img src="./image/reponse_backgrounds/negative_6/element_1.png" style="right : 10vw; top:calc(200vh + 56vh); height:26.5vh; width: 37vw">`
                elementPage += `<img src="./image/reponse_backgrounds/negative_6/element_2.png" style="left : 6.4vw; top:calc(200vh +79vh); height:16.7vh; width:36.2vw">`
            }else if(screenId===5) {
                elementPage = `<img src="./image/reponse_backgrounds/positive_5/element_4.png" style="left : 26.1vw; top:5.1vh; height:25.5vh; width: 53.3vw">`
                elementPage += `<img src="./image/reponse_backgrounds/positive_5/element_5.png" style="right : 8vw; top:26.8vh; height:15.6vh; width: 34.6vw">`
                elementPage += `<img src="./image/reponse_backgrounds/positive_5/element_2.png" style="left : 0; top:56.6vh; height:23.2vh; width:93vw">`
                elementPage += `<img src="./image/reponse_backgrounds/positive_5/element_3.png" style="right : 0; top:40.7vh; height:31.8vh; width: 94.6vw">`
                elementPage += `<img src="./image/reponse_backgrounds/positive_5/element_1.png" style="left : 0; bottom: 0; height:30vh; width: 100vw">`

                elementPage += `<img src="./image/question_backgrounds/question_5/element_1.png" style="left : 11vw; top:calc(100vh + 6.8vh); height:32.5vh; width: 74.6vw">`
                elementPage += `<img src="./image/question_backgrounds/question_5/element_3.png" style="left : 40.8vw; top:calc(100vh -2.6vh); height:24vh; width: 72.5vw">`
                elementPage += `<img src="./image/question_backgrounds/question_5/element_4.png" style="left : -44.2vw; top:calc(100vh + 53.4vh); height:32.2vh; width: 97.6vw">`
                elementPage += `<img src="./image/question_backgrounds/question_5/element_2.png" style="left : 39.7vw; top:calc(100vh + 53.3vh); height:32.5vh; width: 34.5vw">`

                elementPage += `<img src="./image/reponse_backgrounds/negative_5/element_5.png" style="left : 12.5vw; top:calc(200vh + 17.6vh); height:4vh; width: 8.8vw">`
                elementPage += `<img src="./image/reponse_backgrounds/negative_5/element_4.png" style="right : 6.4vw; top:calc(200vh + 34.5vh); height:7vh; width: 15.2vw">`
                elementPage += `<img src="./image/reponse_backgrounds/negative_5/element_3.png" style="left : 0; top:calc(200vh + 22.1vh); height:74.6vh; width: 100vw">`
                elementPage += `<img src="./image/reponse_backgrounds/negative_5/element_2.png" style="left : 0; bottom: 0; height:74.6vh; width:100vw">`
                elementPage += `<img src="./image/reponse_backgrounds/negative_5/element_1.png" style="right : 0; bottom: 0; height:74.6vh; width: 100vw">`




            }
            document.querySelector("body").innerHTML += `
                    <div id="backGroundSlide"><img src="./image/question_backgrounds/question_${screenId}/fond.png" style="background-color: #C5F0FF55;"></div>
                    <div id="previewRep1">
                        <p>${data.question[0].reponses}</p>
                        <div id="arrowUp-wrapper">
                            <i id="arrowDown" class="las la-angle-down"></i>
                            <h6 id="arrowUp-text">positif</h6>
                        </div>
                    </div>
                    
                    <div id="previewRep2">
                        <div id="arrowDown-wrapper">
                            <i id="arrowDown" class="las la-angle-up"></i>
                            <h6 id="arrowDown-text">negatif</h6>
                        </div>
                        <p>${data.question[1].reponses}</p>
                    </div>
                        
                        
                        
                    <div id="questionAndRepSlide-wrapper">
                        
                        <div id="repU-wrapper">
                            <p>${data.question[0].reponses}</p>
                        </div>
                        <div id="question-wrapper">
                            <div id="question">
                                <p>${data.question[0].questions}</p>
                            </div>
                        </div>
                        <div id="repD-wrapper">
                            <p>${data.question[1].reponses}</p>
                        </div>
                        <div id="backGroundSlide-wrapper">
                            ${elementPage}
                        </div>
                    </div>`
            document.querySelector("#waiting-wrapper").style = `opacity:1;background: url('./image/wait_backgrounds/wait_${screenId}.png')no-repeat`

            console.log('end construct')
        } else {

            if (screenId === 1){
                elementPage = `<img src="./image/reponse_backgrounds/positive_1/element_1.png" style="left : 2.6vw; top:7.4vh; height:16.7vh; width: 36.2vw">
                                <img src="./image/reponse_backgrounds/positive_1/element_2.png" style="right : 0; top:15vh; width: 62.6vw">
                                <img src="./image/reponse_backgrounds/positive_1/element_3.png" style="left : 0; top:61vh;width: 81vw">
                                <img src="./image/question_backgrounds/question_1/element_1.png" style="left : 2.4vw; top:calc(100vh + 7.7vh); height:26vh; width: 74.6vw">
                                <img src="./image/question_backgrounds/question_1/element_2.png" style="right : 0; top:calc(100vh + 52vh); height:32.4vh; width: 43.5vw">
                                <img src="./image/reponse_backgrounds/negative_1/element_1.png" style="left : 0; bottom:-10vh;  width: 100vw">
                                <img src="./image/reponse_backgrounds/negative_1/element_2.png" style="right : 2.6vw; top:calc(200vh + 8vh); height:40.8vh; width: 47.2vw">`

            }

            document.querySelector("body").innerHTML += `
<div id="questionAndRepButton-wrapper">
    <div id="backGroundButton-wrapper">
    </div>
    <div id="repU-wrapper"><p>${data.question[0].reponses}</p><div id="buttons-wrapper"></div>
    <div id="question-wrapper">
        <div id="question"><p>${data.question[0].questions}</p></div>
        <div id="buttons-wrapper">
            <div id="buttonP"><p>${data.question[0].reponses}</p></div>
            <div id="buttonN"><p>${data.question[1].reponses}</p></div>
        </div>
    </div>
    <div id="repD-wrapper"><p>${data.question[1].reponses}</p><div id="buttons-wrapper"></div>
</div>`
            document.querySelector("#waiting-wrapper").style = `opacity:1;background: url('./image/wait_backgrounds/wait_${screenId}.png')no-repeat`

            console.log('end construct')


        }

    } else if (data.type === 'mobileState') {
        console.log("State", data.state)
        if (data.state === "inactif") {
            wait = true
        }

        if (data.state === 'actif') {
            wait = false
            if (format === "slide") {
                load_element_slide()
            } else {
                load_element_button()
            }
            waitTimer(60000).then(() => {
                if (!animationLoad) {
                    window.removeEventListener("beforeunload", stoprefresh)
                    window.location.href = "http://vps215076.ovh.net/comment_ca_va/public/mobile/home.html";
                }
            })
        }
    } else if (data.type === 'disconnecte') {
        console.log("Mobile deconnecter")
        window.removeEventListener("beforeunload", stoprefresh)
        window.location.href = "http://vps215076.ovh.net/comment_ca_va/public/mobile/home.html";

    } else if (data.type === 'crash') {
        console.log("crash")
        window.removeEventListener("beforeunload", stoprefresh)
        window.location.href = "http://vps215076.ovh.net/comment_ca_va/public/mobile/home.html";
    }
}


// Send data post ---------------------------------------------

const postMood = (mood, response) => {
    console.log('post Mood')
    let post = {
        type: "post", //nom de message serveur
        idEcran: screenId, // identifiant de l'écran
        moodId: mood, // Réponse à la question, valeur possibile 0 ou 1
        idResponse: response
    };
    console.log(post)

    animationLoad = true
    serveurSocket.send(JSON.stringify(post));
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
const stoprefresh = (e) =>{
    e.preventDefault();
    e.returnValue = 'Merci de ne pas actualiser ou quitter la page avant la redirection';
    console.log("test")
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


let mov = false

function load_element_button() {

}

function load_element_slide() {

    console.log("recup Element")
    const waitingWrapper = document.querySelector("#waiting-wrapper")
    const questionAndRepWrapper = document.querySelector("#questionAndRepSlide-wrapper")
    const pPreviewRep1 = document.querySelector("#previewRep1 p")
    const previewRep1 = document.querySelector("#previewRep1")
    const pPreviewRep2 = document.querySelector("#previewRep2 p")
    const previewRep2 = document.querySelector("#previewRep2")
    console.log("inside timeout");
    waitingWrapper.style = "opacity : 0"
    setTimeout(function(){
        waitingWrapper.style = "display : none"
    }, 300);


    questionAndRepWrapper.style = "display : flex;"
    let swipedir, startY, distY;

    questionAndRepWrapper.addEventListener('touchstart', (e) => {
        if (!mov && !wait) {
            swipedir = 'none'
            distY = 0
            startY = e.changedTouches[0].pageY
            e.preventDefault()
        }
    })
    questionAndRepWrapper.addEventListener("touchmove", (e) => {
        if (!mov && !wait) {
            distY = e.changedTouches[0].pageY - startY
            swipedir = (distY < 0) ? 'up' : 'down'
            appearRep(swipedir, distY)
            e.preventDefault()
        }
    })

    questionAndRepWrapper.addEventListener('touchend', (e) => {

        if (!mov && !wait) {
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
        previewRep2.style = `opacity : 0;`
        previewRep1.style = `opacity : 0;`

        window.addEventListener('beforeunload', stoprefresh)
        if (dir === "up") {
            questionAndRepWrapper.style = "display : flex;top:-200vh"
            postMood(2, idResponseN)
        } else {
            questionAndRepWrapper.style = "display : flex;top:0"
            postMood(1, idResponseP)
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
            previewRep1.style = `top:${-100 + distY}px`
            pPreviewRep1.style = `opacity : 1;`
            previewRep2.style = `bottom:-100px`
            pPreviewRep2.style = `opacity : 0;`
        } else if (dir === "up") {
            previewRep2.style = `bottom:${-100 - distY}px`
            pPreviewRep2.style = `opacity : 1;`
            previewRep1.style = `top:-100px`
            pPreviewRep1.style = `opacity : 0;`
        } else {

            previewRep1.style = `top:-100px`
            pPreviewRep1.style = `opacity : 0;`
            previewRep2.style = `bottom:-100px`
            pPreviewRep2.style = `opacity : 0;`
        }
    }
}
