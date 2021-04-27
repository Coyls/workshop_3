const express = require('express');
const app = express();
const http = require('http');
const port = process.env.PORT || 3000;
const WebSocket = require('ws');
const mysql = require('mysql');

const server = http.createServer(app);

const wss = new WebSocket.Server({ server })

const test = 'Une data'
 
wss.on('connection', ws => {
  console.log('ws', ws)
  ws.on('message', message => {
    console.log("Message recu :", message)
  })
  ws.send(test)
})



// Request mySQL
const con = mysql.createConnection({
  host: "localhost",
  user: "pma",
  password: "pmapass",
  database : "comment_ca_va"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
  con.query("SELECT * FROM mood", function (err, result) {
    if (err) throw err;
    console.log(result);
  });
});


server.listen(port, () => {
  console.log(`server running at http://localhost:${port}/`);
});