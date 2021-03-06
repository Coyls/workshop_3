const express = require('express');
const app = express();
const http = require('http');
const port = process.env.PORT || 3000;
const WebSocket = require('ws');
const mysql = require('mysql');
const {
  disconnect
} = require('process');

const server = http.createServer(app);

const socket = new WebSocket.Server({
  server
})

// Connexion mySQL -------------------------------------
const con = mysql.createConnection({
  host: "localhost",
  user: "pma",
  password: "pmapass",
  database: "comment_ca_va"
});

//////////////////////////////////////////////////////////
const requestData = "SELECT questions.name_question AS 'question', questions.id_question AS 'questionId', mood.name_mood AS 'mood', mood.id_mood AS 'moodId',posts.id_post AS 'post' FROM posts LEFT JOIN reponses ON posts.id_reponse=reponses.id_reponse LEFT JOIN questions ON reponses.id_question=questions.id_question LEFT JOIN mood ON reponses.id_mood=mood.id_mood"
const requestScreen = "SELECT screen.id_screen AS 'screen', questions.name_question AS 'questions' FROM screen LEFT JOIN questions ON screen.id_screen=questions.id_screen"
const requestMobile = "SELECT questions.id_question AS 'questionId', questions.format AS 'format', screen.id_screen AS 'screen', questions.name_question AS 'questions',reponses.name_reponse AS 'reponses', reponses.id_reponse AS 'responseID', mood.id_mood AS 'moodId' FROM screen LEFT JOIN questions ON screen.id_screen=questions.id_screen LEFT JOIN reponses ON questions.id_question=reponses.id_question LEFT JOIN mood ON reponses.id_mood=mood.id_mood"
const requestPost = "INSERT INTO posts(id_reponse, date) VALUES"
//////////////////////////////////////////////////////////
let questions
let questionsReponses
/////////////////////////////////////////////////////////
con.connect(function (err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
  con.query(requestScreen, function (err, result) {
    if (err) throw err;
    questions = result
  });
  con.query(requestMobile, function (err, result) {
    if (err) throw err;
    questionsReponses = result
  });
});
/////////////////////////////////////////////////////////

let screens = [];
let mobiles = [];
let whitelists = [
  [],
  [],
  [],
  [],
  [],
  []
];


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
          if (screens[index]) {
            let linkScreen = screens[index].socket

            let post = {
              type: 'post',
              message: `Envoi du mobile ${mobile.mobileId} vers screen ${screens[index].screenId}`,
              moodId: data.moodId
            }

            linkScreen.send(JSON.stringify(post))

            ////////
            con.query(requestPost + "('" + data.idResponse + "',NOW())", function (err, result) {
              if (err) throw err;
            });
            ////////
          } else {
            const errorToCatch = {
              type: "crash"
            }

            console.log("As crash")

            mobile.socket.send(JSON.stringify(errorToCatch))


          }

        }
      })

    } else if (type === 'data') {

      con.query(requestData, function (err, result) {
        if (err) throw err;
        let dataPage = {
          type: "dataPage",
          stats: result
        }

        ws.send(JSON.stringify(dataPage))
      });


    } else if (type === 'isEnd') {

      screens.forEach(screen => {
        if (screen.socket === ws) {
          let linkMobile = whitelists[screen.screenId - 1][0]

          if (linkMobile) {

            let disconnect = {
              type: 'disconnecte',
              message: `Envoi du screen ${screen.screenId} vers mobile ${linkMobile}`,
              isEnd: true
            }

            linkMobile.socket.send(JSON.stringify(disconnect))
          }
        }
      })
    }
  })

  // Functions Init -------------------------
  const initScreen = (data, ws) => {
    let screen = {
      screenId: data.screenId,
      socket: ws
    }
    screens.push(screen)
    console.log("L'écran " + data.screenId + " c'est connecté")

    const index = questions.findIndex(question => question.screen === data.screenId)
    let screenData = {
      type: "screenData",
      question: questions[index]
    }

    screen.socket.send(JSON.stringify(screenData))
  }
  const initMobile = (data, ws) => {
    let mobile = {
      mobileId: data.screenId,
      socket: ws
    }

    const screenIsConnect = screens.findIndex(screen => screen.screenId === data.screenId)
    console.log("screenIsConnect", screenIsConnect)

    if (screenIsConnect === -1) {
      const errorToCatch = {
        type: "crash"
      }

      console.log("L'ecran " + data.screenId + " n'est pas connecter, l'utilisateur à été deconnecté")

      mobile.socket.send(JSON.stringify(errorToCatch))

    }

    console.log("Un mobile c'est connecté à l'ecran " + data.screenId)

    let mobileWl = {
      mobileId: data.screenId,
      socket: ws,
      wl: ""
    }

    mobiles.push(mobile)
    whitelists[data.screenId - 1].push(mobileWl)

    let questionReponseToSend = []
    questionsReponses.forEach(questionReponse => {
      if (questionReponse.screen === data.screenId) {
        questionReponseToSend.push(questionReponse)
      }

    })

    let mobileData = {
      type: "mobileData",
      question: questionReponseToSend
    }

    mobile.socket.send(JSON.stringify(mobileData))

    if (whitelists[data.screenId - 1][0] === mobileWl) {
      mobileWl.wl = "actif"
      console.log(mobileWl.mobileId + " est " + mobileWl.wl)
    } else {
      mobileWl.wl = "inactif"
      console.log(mobileWl.mobileId + " est " + mobileWl.wl)
    }

    let mobileState = {
      type: "mobileState",
      state: mobileWl.wl,
    }

    mobileWl.socket.send(JSON.stringify(mobileState))

  }

  // Disconnect Screen and mobile -----------------
  ws.on('close', () => {
    screens.forEach((screen, id) => {
      if (screen.socket === ws) {
        console.log("Screen n°" + screen.screenId + " disconnecte")
        screens.splice(id, 1)
      }
    })
    mobiles.forEach((mobile, id) => {
      whitelists[mobile.mobileId - 1].forEach((connexion, id) => {
        if (connexion.socket === ws) {
          console.log(connexion.mobileId + " est sortie de la whitelist")
          whitelists[mobile.mobileId - 1].splice(id, 1)

          whitelists[mobile.mobileId - 1].forEach(wlElement => {
            if (whitelists[mobile.mobileId - 1].indexOf(wlElement) === 0) {
              wlElement.wl = "actif"
              console.log(wlElement.mobileId + " est " + wlElement.wl)
            } else {
              wlElement.wl = "inactif"
              console.log(wlElement.mobileId + " est " + wlElement.wl)
            }

            let mobileState = {
              type: "mobileState",
              state: wlElement.wl,
            }

            wlElement.socket.send(JSON.stringify(mobileState))
          })

          console.log("La whitelist " + mobile.mobileId + " contient " + whitelists[mobile.mobileId - 1].length + " personnes")
        }
      })
      if (mobile.socket === ws) {
        console.log("Un mobile connecté a l'ecran " + mobile.mobileId + " c'est deconnecter")
        mobiles.splice(id, 1)
      }
    })
  })
});




server.listen(port, () => {
  console.log(`server running at http://localhost:${port}/`);
});