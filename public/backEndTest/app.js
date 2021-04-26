console.log("App.js fonctionne")

let socket = io()
let text = "Ceci est un test"
socket.send('message', text)
