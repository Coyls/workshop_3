const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000; 

app.use(express.static('public'))

app.get('/', (req, res) => {

  res.sendFile(__dirname + '/public/back_end_test/index.html');
});

io.on('connection', (socket) =>{
  console.log('connect', socket.id)


  socket.on('message', (message) =>{
    console.log("Le message est : " + message)
  })

  socket.on('disconnect', () => {
    console.log('disconnect', socket.id)
  })
}) 


http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});























/* const WebSocket = require('ws')
 
const wss = new WebSocket.Server({ port: 3000 })
 
wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(`Received message => ${message}`)
  })
  ws.send('Hello! Message From Server!!')
}) */