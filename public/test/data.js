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
    }

}