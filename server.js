const express = require('express');
const app = express();
const http = require('http').Server(app);
const port = process.env.PORT || 3000;
const WebSocket = require('ws');
const mysql = require('mysql');



const wss = new WebSocket.Server({ http })
 
wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(`Received message => ${message}`)
  })
  ws.send('Hello! Message From Server!!')
})

const con = mysql.createConnection({
  host: "localhost",
  user: "pma",
  password: "pmapass",
  database : "comment_ca_va"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
  con.query("SELECT * FROM posts", function (err, result) {
    if (err) throw err;
    console.log(result);
  });
});


http.listen(port, () => {
  console.log(`server running at http://localhost:${port}/`);
});