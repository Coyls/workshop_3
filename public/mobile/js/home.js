const papetWrapper = document.querySelector("#papet-wrapper")
const papetMoodTextWrapper = document.querySelector("#papet-mood-wrapper")

let moyG
let repGP = 0;

console.log("data") //// DATA

const url = 'ws://vps215076.ovh.net:3000'
const serveurSocket = new WebSocket(url)

// Object init ---------------------------
let dataPage = {
    type: 'data',
};

console.log(dataPage)

// Connection WebSocket ---------------------------
serveurSocket.onopen = () => {
    serveurSocket.send(JSON.stringify(dataPage))
}
serveurSocket.onerror = (error) => {
    console.log(`WebSocket error: ${error}`)
}

// message ----------------------------------------
serveurSocket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    console.log(data)

    if (data.type === "dataPage") {
        console.log(data)
        tabData = data.stats


        for (let i = 0; i < tabData.length; i++) {
            if (tabData[i].moodId === 1) {
                repGP++;
            }
        }

        moyG = repGP / tabData.length * 100;

        if (moyG < 40) {
            papetWrapper.innerHTML = `<img src="./image/papet_bad.png" alt="papeteries" class="image">`
            papetMoodTextWrapper.innerHTML = `<p class="paragraph-bold">Le bâtiment est triste</p>`
        } else if ((moyG > 40) && (moyG < 60)) {
            papetWrapper.innerHTML = `<img src="./image/papet_normal.png" alt="papeteries" class="image">`
            papetMoodTextWrapper.innerHTML = `<p class="paragraph-bold">Le bâtiment est paisible</p>`
        } else {
            papetWrapper.innerHTML = `<img src="./image/papet_good.png" alt="papeteries" class="image">`
            papetMoodTextWrapper.innerHTML = `<p class="paragraph-bold">Le bâtiment est heureux</p>`

        }
    }
}

