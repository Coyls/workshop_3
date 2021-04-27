console.log("test dossier public")

const url = 'ws://vps215076.ovh.net:3000'
const connection = new WebSocket(url)


let msg = {
    type: "message",
    text: "Salut le test",
    date: Date.now()
  };


// Connection WebSocket
connection.onopen = (e) => {
    console.log("e", e)
    connection.send(JSON.stringify(msg))

    // connection.emit('test', JSON.stringify(msg))

}
connection.onerror = (error) => {
    console.log(`WebSocket error: ${error}`)
}


connection.onmessage = (e) => {
    console.log(e.data)
}