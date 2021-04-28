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

    if (type === 'init') {
      if (data.deviceType === 'screen') {
        initScreen(data, ws)
      } else if (data.deviceType === 'mobile') {
        initMobile(data, ws)
      }
    }
  })

  // Functions Init -------------------------
  const initScreen = (data, ws) => {
    let screen = {
      screenId : data.screenId,
      socket : ws
    }
    screens.push(screen)
    console.log(screen)
    screen.socket.on('message', msg => {
      const dataScreen = JSON.parse(msg)
    })
  }


  const initMobile = (data, ws) => {
    let mobile = {
      mobileId : data.screenId,
      socket : ws
    }
    mobiles.push(mobile)
    mobile.socket.on('message', msg => {
      const dataMobile = JSON.parse(msg)
    })
  }
  //////////////////////////////////////////////










});



// Request mySQL ------------------------------------------
const con = mysql.createConnection({
  host: "localhost",
  user: "pma",
  password: "pmapass",
  database: "comment_ca_va"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
  con.query("SELECT * FROM mood", function (err, result) {
    if (err) throw err;
    // console.log(result)
  });
});
// --------------------------------------------------------


server.listen(port, () => {
  console.log(`server running at http://localhost:${port}/`);
});


// A GARDER TEMPO 
/* ws.on('close', (event) => {
  console.log(event)
  console.log("ws on close", ws)
  console.log('disconnected');
})

 ws.on('message', msg => {
    const data = JSON.parse(msg)
    const type = data.type

    if (type === 'screen') {
      screens.push(data)
      console.log("A screen has connect", screens)
    }

    if (type === 'post') {

      let screenPush = {
        type: 'screenPull',
        idEcran: data.idEcran,

      }

      console.log(data)
      con.connect(function (err) {
        if (err) throw err;
        con.query("INSERT INTO posts(id_reponse, date) VALUES (data.idReponse,NOW())", function (err, result) {
          if (err) throw err;
           console.log("Pas d'erreur")
        });
      });
    }



  })
 
















*/

