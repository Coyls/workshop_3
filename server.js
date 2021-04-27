const express = require('express');
const app = express();
const http = require('http');
const port = process.env.PORT || 3000;
const WebSocket = require('ws');
const mysql = require('mysql');

const server = http.createServer(app);

const socket = new WebSocket.Server({ server })

let screens = [];
let mobiles = [];
 
socket.on('connection', ws => {
  ws.on('message', msg => {
    const data = JSON.parse(msg)
    const type = data.type

    socket.clients.forEach(client => {
      console.log(client.readyState)
    })

    if (type === 'screen') {
      screens.push(data)
    }

    if (type === 'post') {
      console.log(data)
      // Mettre ici la requete SQL 
    }

    console.log("A screen has connect", screens)




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
    // console.log(result)
  });
});


server.listen(port, () => {
  console.log(`server running at http://localhost:${port}/`);
});


// Au cas ou

 /* ws.on('close', () => {
    console.log('disconnected');
  }) */