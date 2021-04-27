console.log("test dossier public")

const url = 'ws://vps215076.ovh.net:3000'
const connection = new WebSocket(url)


// Connection WebSocket
connection.onopen = (e) => {
    console.log("e", e)
    connection.send('Message From Client')
}
connection.onerror = (error) => {
    console.log(`WebSocket error: ${error}`)
}


connection.onmessage = (e) => {
    console.log(e.data)
}