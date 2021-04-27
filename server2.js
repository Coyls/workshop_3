const express = require('express');
const app = express();
const http = require('http').Server(app);
const port = process.env.PORT || 3001;
const mysql = require('mysql');

app.use("/public", express.static('public'))

app.get('/', (req, res) => {

  res.sendFile(__dirname + '/public/back_end_test/index.html');
});

const con = mysql.createConnection({
  host: "http://vps215076.ovh.net/",
  user: "pma",
  password: "pmapass",
  database : "comment_ca_va"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
  con.query("SELECT * FROM posts LEFT JOIN reponses ON post.id_reponse=reponse.id_reponse LEFT JOIN mood ON reponse.id_mood=mood.id_mood LEFT JOIN questions ON reponse.id_question=question.id_question LEFT JOIN screen ON question.id_screen=screen.id_screen", function (err, result) {
    if (err) throw err;
    console.log(result);
  });
});


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