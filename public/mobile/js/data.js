let tabData
let repGP = 0;
let moyG
let colorG
let repPQuestions = []
let repQuestions = []
let repN = []
let repP = []
let ctxQ = []
let waveRan1 = [];
let waveRanTo1 = [];
let speedWave1 = [];
let dirRan1 = 1
let dirRan2 = -1
let waveRan2 = [];
let waveRanTo2 = [];
let speedWave2 = [];
let radius1 = [], radius2 = [], color1 = [], color2 = []
for (let i = 0; i < 6; i++) {
    waveRan1[i] = [];
    waveRanTo1[i] = [];
    speedWave1[i] = [];
    waveRan2[i] = [];
    waveRanTo2[i] = [];
    speedWave2[i] = [];
}
const url = 'ws://vps215076.ovh.net:3000'
const serveurSocket = new WebSocket(url)

// Object init ---------------------------
let dataPage = {
    type: 'data',
};

console.log(dataPage)

// Connection WebSocket ---------------------------
serveurSocket.onopen = () => {
    serveurSocket.send(JSON.stringify(dataPage))
}
serveurSocket.onerror = (error) => {
    console.log(`WebSocket error: ${error}`)
}

// message ----------------------------------------
serveurSocket.onmessage = (event) => {
    const data = JSON.parse(event.data)

    if (data.type === "dataPage") {
        tabData = data.stats
        for (let i = 0; i < 6; i++) {
            repPQuestions[i] = 0
            repQuestions[i]=0
        }


        for (let i = 0; i < tabData.length; i++) {
            if (tabData[i].moodId === 1) {
                repGP++;
                repPQuestions[tabData[i].questionId-1]++


            }
            repQuestions[tabData[i].questionId-1]++
        }
        for (let i = 0; i < 6; i++) {
            repP[i] = repPQuestions[i]/repQuestions[i]*100
            repN[i] = 100 - repP[i]
        }

        moyG = repGP / tabData.length * 100;
        if (moyG < 50) {
            colorG = "#F2B39B"
        } else {
            colorG = "#B4E9C9"
        }
        for (let i = 0; i < 6; i++) {
            if (repN[i] <= repP[i]) {
                radius2[i] = repN[i]
                color2[i] = "#B4E9C9"
                color1[i] = "#F2B39B"

                radius1[i] = repP[i]
            } else {
                radius2[i] = repP[i]
                color2[i] = "#F2B39B"
                color1[i] = "#B4E9C9"
                radius1[i] = repN[i]
            }
            for (let j = 0; j < 8; j++) {
                waveRan1[i][j] = ((Math.random() / 2 + 0.5) * dirRan1 + 1) * 10 * ((radius1[i] + 5) / 100);
                waveRanTo1[i][j] = (Math.random() / 2 + 0.5) * 5 * ((radius1[i] + 5) / 100);
                speedWave1[i][j] = 1 + Math.random()
                waveRan2[i][j] = ((Math.random() / 2 + 0.5) * dirRan2 + 1) * 10 * ((radius2[i] + 5) / 50);
                waveRanTo2[i][j] = (Math.random() / 2 + 0.5) * 5 * ((radius2[i] + 5) / 50);
                speedWave2[i][j] = 1 + Math.random()
                if (dirRan1 === 1) {
                    dirRan1 = -1
                    dirRan2 = -1
                } else {
                    dirRan1 = 1
                    dirRan2 = -1
                }

            }
        }
    }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////
let moveX,moveY


window.addEventListener('deviceorientation',(event)=> {
    moveX = event.beta  // En degré sur l'interval [-180,180].
    moveY = event.gamma // En degré sur l'interval [-90,90].
    if (moveX >  90) { moveX =  90};
    if (moveX < -90) { moveX = -90};
    console.log("x: "+moveX+"  / y:"+moveY)

})


//////////////////////////////////////////////////////////////////////////////////////////////////////

let moyGTo = 0;
let waveRan = [];
let waveRanTo = [];
let speedWave = [];
let nbWave = 5;
let dirRan = 1;
for (let i = 0; i <= nbWave; i++) {
    waveRan[i] = ((Math.random() + 1) * dirRan) * 35 * (1 / nbWave);
    waveRanTo[i] = 0;
    speedWave[i] = 1 + Math.random()
    if (dirRan === 1) {
        dirRan = -1
    } else {
        dirRan = 1
    }
}

window.addEventListener("load", () => {
    let canvasG = document.querySelector("#canvasG");
    let textMoyG = document.querySelector("#textMoyG");
    let ctx = canvasG.getContext('2d');
    loop();

    function loop() {
        textMoyG.innerHTML = `${Math.round(moyGTo)}%`;
        if (moyGTo <= moyG) {
            moyGTo += 0.3 - (1 / (moyG - moyGTo)) * 0.1
        }

        for (let i = 0; i < nbWave; i++) {
            if (waveRan[i] > 0) {
                if (waveRanTo[i] < waveRan[i]) {
                    waveRanTo[i] += speedWave[i] / 10
                } else {
                    waveRan[i] = (Math.random() + 1) * -35 * (1 / nbWave);
                    speedWave[i] = 1 + Math.random()
                }
            } else {
                if (waveRanTo[i] > waveRan[i]) {
                    waveRanTo[i] -= speedWave[i] / 10
                } else {
                    waveRan[i] = (Math.random() + 1) * 35 * (1 / nbWave);
                    speedWave[i] = 1 + Math.random()
                }
            }
        }

        draw()
        requestAnimationFrame(loop)
    }

    function draw() {
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, 302, 302)
        ctx.fillStyle = colorG
        ctx.beginPath();
        ctx.moveTo(0, 300 / 100 * (100 - moyGTo) + waveRanTo[0]);
        for (let i = 1; i <= nbWave; i++) {
            ctx.bezierCurveTo(300 / nbWave * (i - 1) + (300 / nbWave) / 3, 300 / 100 * (100 - moyGTo) + waveRanTo[i - 2], 300 / nbWave * i - (300 / nbWave) / 3, 300 / 100 * (100 - moyGTo) + waveRanTo[i - 1], 300 / nbWave * i, 300 / 100 * (100 - moyGTo) + waveRanTo[i - 1]);
        }
        ctx.lineTo(303, 300 / 100 * (100 - moyGTo))
        ctx.lineTo(303, 300)
        ctx.lineTo(0, 300)
        ctx.lineTo(0, 300 / 100 * (100 - moyGTo))
        ctx.fill();
        ctx.closePath()
        ctx.fillStyle = "white"
        ctx.beginPath();
        ctx.moveTo(1, 121);
        ctx.bezierCurveTo(1, 61, 41, 1, 101, 1);
        ctx.bezierCurveTo(161, 1, 301, 51, 301, 101);
        ctx.bezierCurveTo(301, 151, 181, 301, 121, 301);
        ctx.bezierCurveTo(61, 301, 1, 181, 1, 121);
        ctx.lineTo(-1, 121)
        ctx.lineTo(-1, 303)
        ctx.lineTo(303, 303)
        ctx.lineTo(303, -1)
        ctx.lineTo(-1, -1)
        ctx.lineTo(-1, 121)
        ctx.fill()
        ctx.closePath();
        ctx.moveTo(1, 121);
        ctx.bezierCurveTo(1, 61, 41, 1, 101, 1);
        ctx.bezierCurveTo(161, 1, 301, 51, 301, 101);
        ctx.bezierCurveTo(301, 151, 181, 301, 121, 301);
        ctx.bezierCurveTo(61, 301, 1, 181, 1, 121);
        ctx.stroke()
        ctx.closePath();
    }











    let canvasQ0 = document.querySelector("#canvasQ0");
    ctxQ[0] = canvasQ0.getContext('2d');
    let canvasQ1 = document.querySelector("#canvasQ1");
    ctxQ[1] = canvasQ1.getContext('2d');
    let canvasQ2 = document.querySelector("#canvasQ2");
    ctxQ[2] = canvasQ2.getContext('2d');
    let canvasQ3 = document.querySelector("#canvasQ3");
    ctxQ[3] = canvasQ3.getContext('2d');
    let canvasQ4 = document.querySelector("#canvasQ4");
    ctxQ[4] = canvasQ4.getContext('2d');
    let canvasQ5 = document.querySelector("#canvasQ5");
    ctxQ[5] = canvasQ5.getContext('2d');
    loop2();

    function loop2() {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 8; j++) {
                if (waveRan1[i][j] > 10) {
                    if (waveRanTo1[i][j] < waveRan1[i][j]) {
                        waveRanTo1[i][j] += speedWave1[i][j] / 10
                    } else {
                        waveRan1[i][j] = ((Math.random() / 2 + 0.5) * -1 + 1) * 10 * ((radius1[i] + 5) / 100);
                        speedWave1[i][j] = 0.5 + Math.random()
                    }
                } else {
                    if (waveRanTo1[i][j] > waveRan1[i][j]) {
                        waveRanTo1[i][j] -= speedWave1[i][j] / 10
                    } else {
                        waveRan1[i][j] = (Math.random() / 2 + 0.5 + 1) * 10 * ((radius1[i] + 5) / 100);
                        speedWave1[i][j] = 0.5 + Math.random()
                    }
                }


                if (waveRan2[i][j] > 10) {
                    if (waveRanTo2[i][j] < waveRan2[i][j]) {
                        waveRanTo2[i][j] += speedWave2[i][j] / 15
                    } else {
                        waveRan2[i][j] = ((Math.random() / 2 + 0.5) * -1 + 1) * 10 * ((radius2[i] + 5) / 50);
                        speedWave2[i][j] = 0.5 + Math.random()

                    }
                } else {
                    if (waveRanTo2[i][j] > waveRan2[i][j]) {
                        waveRanTo2[i][j] -= speedWave2[i][j] / 15
                    } else {
                        waveRan2[i][j] = (Math.random() / 2 + 0.5 + 1) * 10 * ((radius2[i] + 5) / 50);
                        speedWave2[i][j] = 0.5 + Math.random()
                    }
                }
            }
        }


        draw2()
        requestAnimationFrame(loop2)
    }

    function draw2() {
        for (let j = 0; j < 6; j++) {
            ctxQ[j].fillStyle = "#ffffff"
            ctxQ[j].fillRect(0, 0, 420, 302)
            ctxQ[j].fillStyle = color2[j]
            ctxQ[j].beginPath();
            ctxQ[j].moveTo(225 - 55 / 50 * radius1[j] - waveRanTo1[j][0], 165);
            ctxQ[j].bezierCurveTo(225 - 55 / 50 * radius1[j] - waveRanTo1[j][0], 165 - (55 / 50 * radius1[j]) / 4, 225 - 55 / 50 * radius1[j] * (Math.sqrt(2) / 2) - 55 / 50 * radius1[j] * (Math.sqrt(2) / 2) / 4 - waveRanTo1[j][1], 165 - 55 / 50 * radius1[j] * (Math.sqrt(2) / 2) + 55 / 50 * radius1[j] * (Math.sqrt(2) / 2) / 4 - waveRanTo1[j][1], 225 - 55 / 50 * radius1[j] * (Math.sqrt(2) / 2) - waveRanTo1[j][1], 165 - 55 / 50 * radius1[j] * (Math.sqrt(2) / 2) - waveRanTo1[j][1]);
            ctxQ[j].bezierCurveTo(225 - 55 / 50 * radius1[j] * (Math.sqrt(2) / 2) + 55 / 50 * radius1[j] * (Math.sqrt(2) / 2) / 4 - waveRanTo1[j][1], 165 - 55 / 50 * radius1[j] * (Math.sqrt(2) / 2) - 55 / 50 * radius1[j] * (Math.sqrt(2) / 2) / 4 - waveRanTo1[j][1], 225 - (55 / 50 * radius1[j]) / 4, 165 - 55 / 50 * radius1[j] - waveRanTo1[j][2], 225, 165 - 55 / 50 * radius1[j] - waveRanTo1[j][2]);
            ctxQ[j].bezierCurveTo(225 + (55 / 50 * radius1[j]) / 4, 165 - 55 / 50 * radius1[j] - waveRanTo1[j][2], 225 + 55 / 50 * radius1[j] * (Math.sqrt(2) / 2) - 55 / 50 * radius1[j] * (Math.sqrt(2) / 2) / 4 + waveRanTo1[j][3], 165 - 55 / 50 * radius1[j] * (Math.sqrt(2) / 2) - 55 / 50 * radius1[j] * (Math.sqrt(2) / 2) / 4 - waveRanTo1[j][3], 225 + 55 / 50 * radius1[j] * (Math.sqrt(2) / 2) + waveRanTo1[j][3], 165 - 55 / 50 * radius1[j] * (Math.sqrt(2) / 2) - waveRanTo1[j][3]);
            ctxQ[j].bezierCurveTo(225 + 55 / 50 * radius1[j] * (Math.sqrt(2) / 2) + 55 / 50 * radius1[j] * (Math.sqrt(2) / 2) / 4 + waveRanTo1[j][3], 165 - 55 / 50 * radius1[j] * (Math.sqrt(2) / 2) + 55 / 50 * radius1[j] * (Math.sqrt(2) / 2) / 4 - waveRanTo1[j][3], 225 + 55 / 50 * radius1[j] + waveRanTo1[j][4], 165 - (55 / 50 * radius1[j]) / 4, 225 + 55 / 50 * radius1[j] + waveRanTo1[j][4], 165);
            ctxQ[j].bezierCurveTo(225 + 55 / 50 * radius1[j] + waveRanTo1[j][4], 165 + (55 / 50 * radius1[j]) / 4, 225 + 55 / 50 * radius1[j] * (Math.sqrt(2) / 2) + 55 / 50 * radius1[j] * (Math.sqrt(2) / 2) / 4 + waveRanTo1[j][5], 165 + 55 / 50 * radius1[j] * (Math.sqrt(2) / 2) - 55 / 50 * radius1[j] * (Math.sqrt(2) / 2) / 4 + waveRanTo1[j][5], 225 + 55 / 50 * radius1[j] * (Math.sqrt(2) / 2) + waveRanTo1[j][5], 165 + 55 / 50 * radius1[j] * (Math.sqrt(2) / 2) + waveRanTo1[j][5]);
            ctxQ[j].bezierCurveTo(225 + 55 / 50 * radius1[j] * (Math.sqrt(2) / 2) - 55 / 50 * radius1[j] * (Math.sqrt(2) / 2) / 4 + waveRanTo1[j][5], 165 + 55 / 50 * radius1[j] * (Math.sqrt(2) / 2) + 55 / 50 * radius1[j] * (Math.sqrt(2) / 2) / 4 + waveRanTo1[j][5], 225 + (55 / 50 * radius1[j]) / 4, 165 + 55 / 50 * radius1[j] + waveRanTo1[j][6], 225, 165 + 55 / 50 * radius1[j] + waveRanTo1[j][6]);
            ctxQ[j].bezierCurveTo(225 - (55 / 50 * radius1[j]) / 4, 165 + 55 / 50 * radius1[j] + waveRanTo1[j][6], 225 - 55 / 50 * radius1[j] * (Math.sqrt(2) / 2) + 55 / 50 * radius1[j] * (Math.sqrt(2) / 2) / 4 - waveRanTo1[j][7], 165 + 55 / 50 * radius1[j] * (Math.sqrt(2) / 2) + 55 / 50 * radius1[j] * (Math.sqrt(2) / 2) / 4 + waveRanTo1[j][7], 225 - 55 / 50 * radius1[j] * (Math.sqrt(2) / 2) - waveRanTo1[j][7], 165 + 55 / 50 * radius1[j] * (Math.sqrt(2) / 2) + waveRanTo1[j][7]);
            ctxQ[j].bezierCurveTo(225 - 55 / 50 * radius1[j] * (Math.sqrt(2) / 2) - 55 / 50 * radius1[j] * (Math.sqrt(2) / 2) / 4 - waveRanTo1[j][7], 165 + 55 / 50 * radius1[j] * (Math.sqrt(2) / 2) - 55 / 50 * radius1[j] * (Math.sqrt(2) / 2) / 4 + waveRanTo1[j][7], 225 - 55 / 50 * radius1[j] - waveRanTo1[j][0], 165 + (55 / 50 * radius1[j]) / 4, 225 - 55 / 50 * radius1[j] - waveRanTo1[j][0], 165);
            ctxQ[j].fill()
            ctxQ[j].closePath();
            ctxQ[j].fillStyle = color1[j]
            ctxQ[j].beginPath();
            ctxQ[j].moveTo(150 - 55 / 50 * radius2[j] - waveRanTo2[j][0], 90);
            ctxQ[j].bezierCurveTo(150 - 55 / 50 * radius2[j] - waveRanTo2[j][0], 90 - (55 / 50 * radius2[j]) / 4, 150 - 55 / 50 * radius2[j] * (Math.sqrt(2) / 2) - 55 / 50 * radius2[j] * (Math.sqrt(2) / 2) / 4 - waveRanTo2[j][1], 90 - 55 / 50 * radius2[j] * (Math.sqrt(2) / 2) + 55 / 50 * radius2[j] * (Math.sqrt(2) / 2) / 4 - waveRanTo2[j][1], 150 - 55 / 50 * radius2[j] * (Math.sqrt(2) / 2) - waveRanTo2[j][1], 90 - 55 / 50 * radius2[j] * (Math.sqrt(2) / 2) - waveRanTo2[j][1]);
            ctxQ[j].bezierCurveTo(150 - 55 / 50 * radius2[j] * (Math.sqrt(2) / 2) + 55 / 50 * radius2[j] * (Math.sqrt(2) / 2) / 4 - waveRanTo2[j][1], 90 - 55 / 50 * radius2[j] * (Math.sqrt(2) / 2) - 55 / 50 * radius2[j] * (Math.sqrt(2) / 2) / 4 - waveRanTo2[j][1], 150 - (55 / 50 * radius2[j]) / 4, 90 - 55 / 50 * radius2[j] - waveRanTo2[j][2], 150, 90 - 55 / 50 * radius2[j] - waveRanTo2[j][2]);
            ctxQ[j].bezierCurveTo(150 + (55 / 50 * radius2[j]) / 4, 90 - 55 / 50 * radius2[j] - waveRanTo2[j][2], 150 + 55 / 50 * radius2[j] * (Math.sqrt(2) / 2) - 55 / 50 * radius2[j] * (Math.sqrt(2) / 2) / 4 + waveRanTo2[j][3], 90 - 55 / 50 * radius2[j] * (Math.sqrt(2) / 2) - 55 / 50 * radius2[j] * (Math.sqrt(2) / 2) / 4 - waveRanTo2[j][3], 150 + 55 / 50 * radius2[j] * (Math.sqrt(2) / 2) + waveRanTo2[j][3], 90 - 55 / 50 * radius2[j] * (Math.sqrt(2) / 2) - waveRanTo2[j][3]);
            ctxQ[j].bezierCurveTo(150 + 55 / 50 * radius2[j] * (Math.sqrt(2) / 2) + 55 / 50 * radius2[j] * (Math.sqrt(2) / 2) / 4 + waveRanTo2[j][3], 90 - 55 / 50 * radius2[j] * (Math.sqrt(2) / 2) + 55 / 50 * radius2[j] * (Math.sqrt(2) / 2) / 4 - waveRanTo2[j][3], 150 + 55 / 50 * radius2[j] + waveRanTo2[j][4], 90 - (55 / 50 * radius2[j]) / 4, 150 + 55 / 50 * radius2[j] + waveRanTo2[j][4], 90);
            ctxQ[j].bezierCurveTo(150 + 55 / 50 * radius2[j] + waveRanTo2[j][4], 90 + (55 / 50 * radius2[j]) / 4, 150 + 55 / 50 * radius2[j] * (Math.sqrt(2) / 2) + 55 / 50 * radius2[j] * (Math.sqrt(2) / 2) / 4 + waveRanTo2[j][5], 90 + 55 / 50 * radius2[j] * (Math.sqrt(2) / 2) - 55 / 50 * radius2[j] * (Math.sqrt(2) / 2) / 4 + waveRanTo2[j][5], 150 + 55 / 50 * radius2[j] * (Math.sqrt(2) / 2) + waveRanTo2[j][5], 90 + 55 / 50 * radius2[j] * (Math.sqrt(2) / 2) + waveRanTo2[j][5]);
            ctxQ[j].bezierCurveTo(150 + 55 / 50 * radius2[j] * (Math.sqrt(2) / 2) - 55 / 50 * radius2[j] * (Math.sqrt(2) / 2) / 4 + waveRanTo2[j][5], 90 + 55 / 50 * radius2[j] * (Math.sqrt(2) / 2) + 55 / 50 * radius2[j] * (Math.sqrt(2) / 2) / 4 + waveRanTo2[j][5], 150 + (55 / 50 * radius2[j]) / 4, 90 + 55 / 50 * radius2[j] + waveRanTo2[j][6], 150, 90 + 55 / 50 * radius2[j] + waveRanTo2[j][6]);
            ctxQ[j].bezierCurveTo(150 - (55 / 50 * radius2[j]) / 4, 90 + 55 / 50 * radius2[j] + waveRanTo2[j][6], 150 - 55 / 50 * radius2[j] * (Math.sqrt(2) / 2) + 55 / 50 * radius2[j] * (Math.sqrt(2) / 2) / 4 - waveRanTo2[j][7], 90 + 55 / 50 * radius2[j] * (Math.sqrt(2) / 2) + 55 / 50 * radius2[j] * (Math.sqrt(2) / 2) / 4 + waveRanTo2[j][7], 150 - 55 / 50 * radius2[j] * (Math.sqrt(2) / 2) - waveRanTo2[j][7], 90 + 55 / 50 * radius2[j] * (Math.sqrt(2) / 2) + waveRanTo2[j][7]);
            ctxQ[j].bezierCurveTo(150 - 55 / 50 * radius2[j] * (Math.sqrt(2) / 2) - 55 / 50 * radius2[j] * (Math.sqrt(2) / 2) / 4 - waveRanTo2[j][7], 90 + 55 / 50 * radius2[j] * (Math.sqrt(2) / 2) - 55 / 50 * radius2[j] * (Math.sqrt(2) / 2) / 4 + waveRanTo2[j][7], 150 - 55 / 50 * radius2[j] - waveRanTo2[j][0], 90 + (55 / 50 * radius2[j]) / 4, 150 - 55 / 50 * radius2[j] - waveRanTo2[j][0], 90);
            ctxQ[j].fill()
            ctxQ[j].closePath();
            ctxQ[j].fillStyle = "black"
            ctxQ[j].strokeStyle = "#000000"

            ctxQ[j].beginPath();
            ctxQ[j].ellipse(((150 + 55 / 50 * radius2[j] + waveRanTo2[j][4]) + (150 - 55 / 50 * radius2[j] - waveRanTo2[j][0])) / 2, ((90 + 55 / 50 * radius2[j] + waveRanTo2[j][6]) + (90 - 55 / 50 * radius2[j] - waveRanTo2[j][2])) / 2, 2, 2, 0, 0, 2 * Math.PI, 2 * Math.PI);
            ctxQ[j].fill()
            ctxQ[j].moveTo(((150 + 55 / 50 * radius2[j] + waveRanTo2[j][4]) + (150 - 55 / 50 * radius2[j] - waveRanTo2[j][0])) / 2 - 1, ((90 + 55 / 50 * radius2[j] + waveRanTo2[j][6]) + (90 - 55 / 50 * radius2[j] - waveRanTo2[j][2])) / 2 - 1)
            ctxQ[j].lineTo(((150 + 55 / 50 * radius2[j] + waveRanTo2[j][4]) + (150 - 55 / 50 * radius2[j] - waveRanTo2[j][0])) / 2 - 40, ((90 + 55 / 50 * radius2[j] + waveRanTo2[j][6]) + (90 - 55 / 50 * radius2[j] - waveRanTo2[j][2])) / 2 - 40)
            ctxQ[j].lineTo(((150 + 55 / 50 * radius2[j] + waveRanTo2[j][4]) + (150 - 55 / 50 * radius2[j] - waveRanTo2[j][0])) / 2 -80, ((90 + 55 / 50 * radius2[j] + waveRanTo2[j][6]) + (90 - 55 / 50 * radius2[j] - waveRanTo2[j][2])) / 2 - 40)
            ctxQ[j].stroke()
            ctxQ[j].closePath();

            ctxQ[j].font = "17px Poppins"
            ctxQ[j].textAlign = "end"
            ctxQ[j].fillText(`${Math.round(radius2[j])}%`, ((150 + 55 / 50 * radius2[j] + waveRanTo2[j][4]) + (150 - 55 / 50 * radius2[j] - waveRanTo2[j][0])) / 2 -83, ((90 + 55 / 50 * radius2[j] + waveRanTo2[j][6]) + (90 - 55 / 50 * radius2[j] - waveRanTo2[j][2])) / 2 - 34)
            ctxQ[j].beginPath();
            ctxQ[j].ellipse(((225 + 55 / 50 * radius1[j] + waveRanTo1[j][4]) + (225 - 55 / 50 * radius1[j] - waveRanTo1[j][0])) / 2, ((165 + 55 / 50 * radius1[j] + waveRanTo1[j][6]) + (165 - 55 / 50 * radius1[j] - waveRanTo1[j][2])) / 2, 2, 2, 0, 0, 2 * Math.PI, 2 * Math.PI);
            ctxQ[j].fill()
            ctxQ[j].moveTo(((225 + 55 / 50 * radius1[j] + waveRanTo1[j][4]) + (225 - 55 / 50 * radius1[j] - waveRanTo1[j][0])) / 2 + 1, ((165 + 55 / 50 * radius1[j] + waveRanTo1[j][6]) + (165 - 55 / 50 * radius1[j] - waveRanTo1[j][2])) / 2 +1)
            ctxQ[j].lineTo(((225 + 55 / 50 * radius1[j] + waveRanTo1[j][4]) + (225 - 55 / 50 * radius1[j] - waveRanTo1[j][0])) / 2 + 55 / 50 * radius1[j] + waveRanTo1[j][4] - 20, ((165 + 55 / 50 * radius1[j] + waveRanTo1[j][6]) + (165 - 55 / 50 * radius1[j] - waveRanTo1[j][2])) / 2 + 40)
            ctxQ[j].lineTo(((225 + 55 / 50 * radius1[j] + waveRanTo1[j][4]) + (225 - 55 / 50 * radius1[j] - waveRanTo1[j][0])) / 2 + 55 / 50 * radius1[j] + waveRanTo1[j][4] + 10, ((165 + 55 / 50 * radius1[j] + waveRanTo1[j][6]) + (165 - 55 / 50 * radius1[j] - waveRanTo1[j][2])) / 2 + 40)

            ctxQ[j].stroke()
            ctxQ[j].closePath();
            ctxQ[j].font = "17px Poppins"
            ctxQ[j].textAlign = "start"
            ctxQ[j].fillText(`${Math.round(radius1[j])}%`, ((225 + 55 / 50 * radius1[j] + waveRanTo1[j][4]) + (225 - 55 / 50 * radius1[j] - waveRanTo1[j][0])) / 2 + 55 / 50 * radius1[j] + waveRanTo1[j][4] + 13, ((165 + 55 / 50 * radius1[j] + waveRanTo1[j][6]) + (165 - 55 / 50 * radius1[j] - waveRanTo1[j][2])) / 2 + 46)

        }
    }
})



///////////////////////////////////////////////Full Page////////////////////////////////////////////////////////////////////////////////////////////////////////

const data = document.querySelector("#data-wrapper")

new fullpage("#data-wrapper", {
    licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
    slidesNavigation: true,
    slidesNavPosition: 'bottom',
    controlArrows: false,
    fitToSection: true,
});