console.log("SCREEN") //// SCREEN

const url = 'ws://vps215076.ovh.net:3000'
const serveurSocket = new WebSocket(url)

let params = (new URL(document.location)).searchParams;
let screenId = parseInt(params.get('screen_id'))

// Object Init ---------------------------------------
let screenInit = {
    type: "init",
    deviceType: "screen",
    screenId: screenId,
};

console.log(screenInit)

// Connection WebSocket ---------------------------
serveurSocket.onopen = () => {
    serveurSocket.send(JSON.stringify(screenInit))
}
serveurSocket.onerror = (error) => {
    console.log(`WebSocket error: ${error}`)
}

// message ----------------------------------------
serveurSocket.onmessage = (event) => {
    var data = event.data;

    if (data.type === "post") {
        console.log(data.type); //"humeurReceive"
        console.log(data.humeur); //0 ou 1  
    }
}











































// ?screenId=1

