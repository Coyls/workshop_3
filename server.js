const express = require('express');
const app = express();
const http = require('http');
const port = process.env.PORT || 3000;
const WebSocket = require('ws');
const mysql = require('mysql');
const { disconnect } = require('process');

const server = http.createServer(app);

const socket = new WebSocket.Server({ server })

// Connexion mySQL -------------------------------------
const con = mysql.createConnection({
  host: "localhost",
  user: "pma",
  password: "pmapass",
  database: "comment_ca_va"
});

//////////////////////////////////////////////////////////
const requestData = "SELECT questions.name_question AS 'question', questions.id_question AS 'id_question', mood.name_mood AS 'mood',posts.id_post AS 'post' FROM posts LEFT JOIN reponses ON posts.id_reponse=reponses.id_reponse LEFT JOIN questions ON reponses.id_question=questions.id_question LEFT JOIN mood ON reponses.id_mood=mood.id_mood"
const requestScreen = "SELECT screen.id_screen AS 'screen', questions.name_question AS 'questions' FROM screen LEFT JOIN questions ON screen.id_screen=questions.id_screen WHERE screen.id_screen="
//////////////////////////////////////////////////////////

let screens = [];
let mobiles = [];
let whitelists = [[], [], [], [], [], []];

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

    } else if (type === 'post') {
      mobiles.forEach(mobile => {
        if (mobile.socket === ws) {
          const index = screens.findIndex(screen => screen.screenId === mobile.mobileId)
          let linkScreen = screens[index].socket

          let post = {
            type: 'post',
            message: `Envoi du mobile ${mobile.mobileId} vers screen ${screens[index].screenId}`,
            moodId: mobile.moodId
          }

          linkScreen.send(JSON.stringify(post))

        }
      })

    } else if (type === 'data') {

      con.connect(function (err) {
        if (err) throw err;
        con.query(requestData, function (err, result) {
          if (err) throw err;
          let dataPage = {
            type: "dataPage",
            stats: result
          }

          ws.send(JSON.stringify(dataPage))
        });
      });

    }

  })

  // Functions Init -------------------------
  const initScreen = (data, ws) => {
    let screen = {
      screenId: data.screenId,
      socket: ws
    }
    screens.push(screen)
    con.connect(function (err) {
      if (err) throw err;
      console.log("Connecté à la base de données MySQL!");
      con.query(requestScreen+data.screenId, function (err, result) {
        if (err) throw err;
        let screenData = {
          type: "screenData",
          question: result
        }
      
        screen.socket.send(JSON.stringify(screenData))
      });
    });
  }
  const initMobile = (data, ws) => {
    let mobile = {
      mobileId: data.screenId,
      socket: ws
    }

    mobiles.push(mobile)
    whitelists[data.screenId].push(mobile)

    if (whitelists[data.screenId][0] === mobile) {
      console.log(mobile.mobileId + " est actif")
    } else {
      console.log(mobile.mobileId + " est inactif")
    }

    mobile.socket.on('message', msg => {
      const dataMobile = JSON.parse(msg)
    })
  }

  // Disconnect Screen and mobile -----------------
  ws.on('close', () => {
    console.log("Someone disconect")
    screens.forEach((screen, id) => {
      if (screen.socket === ws) {
        console.log(screen.screenId + "disconecte")
        screens.splice(id, 1)
      }
    })
    mobiles.forEach((mobile, id) => {
      whitelists[mobile.mobileId].forEach((connexion, id) => {
        if (connexion.socket === ws) {
          console.log(connexion.mobileId + "est sortie de la whitelist")
          whitelists[mobile.mobileId].splice(id, 1)
        }
      })
      if (mobile.socket === ws) {
        console.log(mobile.mobileId + "disconecte")
        mobiles.splice(id, 1)
      }
    })
  })














});



// Requete type
/* con.connect(function (err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
  con.query("SELECT * FROM mood", function (err, result) {
    if (err) throw err;
    console.log(result)
  });
}); */
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

