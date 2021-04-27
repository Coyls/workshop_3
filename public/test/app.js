console.log("test Screen -> Server")

const url = 'ws://vps215076.ovh.net:3000'
const connection = new WebSocket(url)

let params = (new URL(document.location)).searchParams;
let screenId = parseInt(params.get('screenId'))
if (screenId === NaN) screenId = 0

// Object
let screen = {
    type: "screen",
    id_screen: screenId,
};

let disconnect = {
    type: "disconnect",
    id_screen: screenId,
};

console.log(screen)

// Connection WebSocket
connection.onopen = (event) => {
    connection.send(JSON.stringify(screen))
}
connection.onerror = (error) => {
    console.log(`WebSocket error: ${error}`)
}
connection.onmessage = (e) => {
    let data = e.data

    if (data === 'screenasdisconnect') {
        console.log("Someone disconnected")
    }

}


// ?screenId=1