const express = require('express');
const app = express();
const http = require('http').Server(app);
const port = process.env.PORT || 3000;
const io = require('socket.io')(http);


app.use(express.static(__dirname + 'public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/backEndTest/index.html');
});

io.on('connection', (socket) =>{
  console.log(socket.id)

  socket.on('message', (message) =>{
    console.log("Le message est : " + message)
  })

  socket.on('disconnect', () => {
    console.log(socket.id)
  })
})


if (port === 3000) {
  http.listen(port, () => {
    console.log(`http://localhost:${port}/`);
  });
}






















/* const WebSocket = require('ws')
 
const wss = new WebSocket.Server({ port: 3000 })
 
wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(`Received message => ${message}`)
  })
  ws.send('Hello! Message From Server!!')
}) */