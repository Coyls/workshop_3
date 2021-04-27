console.log("test Screen -> Server")

const url = 'ws://vps215076.ovh.net:3000'
const connection = new WebSocket(url)

let params = (new URL(document.location)).searchParams;
let screenId = parseInt(params.get('screenId'))
if (screenId === NaN) screenId = 0

let screen = {
    type: "screen",
    id_screen: screenId,
};

console.log(screen)

// Connection WebSocket
connection.onopen = (event) => {
    console.log("e", event)
    connection.send(JSON.stringify(screen))
}
connection.onerror = (error) => {
    console.log(`WebSocket error: ${error}`)
}



connection.onmessage = (e) => {
    console.log(e.data)
}