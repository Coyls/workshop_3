const express = require('express');
const app = express();
const http = require('http');
const port = process.env.PORT || 3000;
const WebSocket = require('ws');
const mysql = require('mysql');

const server = http.createServer(app);

const wss = new WebSocket.Server({ server })

let screens = [];
let mobiles = [];
 
wss.on('connection', ws => {
  console.log(ws.origin)
  ws.on('message', msg => {
    const data = JSON.parse(msg)
    console.log("Message recu :", msg)




  })
  // ws.send(test)
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
    result.forEach(element => {
      console.log(element.id_mood)
      
    });
  });
});


server.listen(port, () => {
  console.log(`server running at http://localhost:${port}/`);
});