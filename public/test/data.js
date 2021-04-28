console.log("data") //// DATA

const url = 'ws://vps215076.ovh.net:3000'
const serveurSocket = new WebSocket(url)

let params = (new URL(document.location)).searchParams;
let screenId = parseInt(params.get('screen_id'))


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

}