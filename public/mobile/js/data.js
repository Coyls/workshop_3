let tab


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
    console.log(data)

    if (data.type === "dataPage") {
        console.log(data)
        tab = data
    }
}















//////////////////////////////////////////////////////////////////////////////////////////////////////

let moyG = 70;
let red
let green
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
            moyGTo += 0.3-(1/(moyG-moyGTo))*0.1
        }
        if (moyGTo < 50) {
            red = 219
            green = 135+((219-135) / 50) * moyGTo
        } else {
            red = 135+((219-135) / 50) *(100-moyGTo)
            green = 219
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
        ctx.fillStyle = `rgb(${red},${green},135)`
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










    let repN = 100
    let repP =100-repN
    let dirRan1 = 1
    let waveRan1 = [];
    let waveRanTo1 = [];
    let speedWave1 = [];
    let dirRan2 = -1
    let waveRan2 = [];
    let waveRanTo2 = [];
    let speedWave2 = [];

    let radius1,radius2,color1,color2
    if (repN<=repP){
        radius2 = repN
        color2 = "rgb(135,219,89)"
        color1 = "rgb(219,135,89)"

        radius1 = repP
    }else{
        radius2 = repP
        color2 = "rgb(219,135,89)"
        color1 = "rgb(135,219,89)"
        radius1 = repN
    }
    for (let i = 0; i < 8; i++) {
        waveRan1[i] = ((Math.random()/2+0.5)* dirRan1 + 1) * 10 * ((radius1+5)/100);
        waveRanTo1[i] = (Math.random()/2+0.5)*5 * ((radius1+5)/100);
        speedWave1[i] = 1 + Math.random()
        waveRan2[i] = ((Math.random()/2+0.5)*dirRan2 + 1) * 10 * ((radius2+5)/50);
        waveRanTo2[i] = (Math.random()/2+0.5)*5 * ((radius2+5)/50);
        speedWave2[i] = 1 + Math.random()
        console.log(waveRan2[i])
        console.log(waveRan1[i])
        if (dirRan1 === 1) {
            dirRan1 = -1
            dirRan2 = -1
        } else {
            dirRan1 = 1
            dirRan2 = -1
        }

    }


    let canvasQ = document.querySelector("#canvasQ1");
    let ctx2 = canvasQ.getContext('2d');
    loop2();

    function loop2() {

        for (let i = 0; i < 8; i++) {
            if (waveRan1[i] > 10) {
                if (waveRanTo1[i] < waveRan1[i]) {
                    waveRanTo1[i] += speedWave1[i] / 10
                } else {
                    waveRan1[i] = ((Math.random()/2+0.5)* -1 + 1) * 10 * ((radius1+5)/100);
                    speedWave1[i] = 0.5 + Math.random()
                }
            } else {
                if (waveRanTo1[i] > waveRan1[i]) {
                    waveRanTo1[i] -= speedWave1[i] / 10
                } else {
                    waveRan1[i] = (Math.random()/2+0.5 + 1) * 10 * ((radius1+5)/100);
                    speedWave1[i] = 0.5 + Math.random()
                }
            }


            if (waveRan2[i] > 10) {
                if (waveRanTo2[i] < waveRan2[i]) {
                    waveRanTo2[i] += speedWave2[i] / 15
                } else {
                    waveRan2[i] = ((Math.random()/2+0.5)* -1 + 1) * 10 * ((radius2+5)/50);
                    speedWave2[i] = 0.5 + Math.random()

                }
            } else {
                if (waveRanTo2[i] > waveRan2[i]) {
                    waveRanTo2[i] -= speedWave2[i] / 15
                } else {
                    waveRan2[i] = (Math.random()/2+0.5 + 1) * 10 * ((radius2+5)/50);
                    speedWave2[i] = 0.5 + Math.random()
                }
            }
        }


        draw2()
        requestAnimationFrame(loop2)
    }

    function draw2() {
        ctx2.fillStyle = "#ffffff"
        ctx2.fillRect(0, 0, 302, 302)
        ctx2.fillStyle =color2
        ctx2.beginPath();
        ctx2.moveTo(165-55/50*radius1-waveRanTo1[0], 165);
        ctx2.bezierCurveTo(165-55/50*radius1-waveRanTo1[0], 165-(55/50*radius1)/4, 165-55/50*radius1*(Math.sqrt(2)/2)-55/50*radius1*(Math.sqrt(2)/2)/4-waveRanTo1[1], 165-55/50*radius1*(Math.sqrt(2)/2)+55/50*radius1*(Math.sqrt(2)/2)/4-waveRanTo1[1], 165-55/50*radius1*(Math.sqrt(2)/2)-waveRanTo1[1], 165-55/50*radius1*(Math.sqrt(2)/2)-waveRanTo1[1]);
        ctx2.bezierCurveTo(165-55/50*radius1*(Math.sqrt(2)/2)+55/50*radius1*(Math.sqrt(2)/2)/4-waveRanTo1[1], 165-55/50*radius1*(Math.sqrt(2)/2)-55/50*radius1*(Math.sqrt(2)/2)/4-waveRanTo1[1], 165-(55/50*radius1)/4, 165-55/50*radius1-waveRanTo1[2], 165, 165-55/50*radius1-waveRanTo1[2]);
        ctx2.bezierCurveTo(165+(55/50*radius1)/4, 165-55/50*radius1-waveRanTo1[2], 165+55/50*radius1*(Math.sqrt(2)/2)-55/50*radius1*(Math.sqrt(2)/2)/4 + waveRanTo1[3], 165-55/50*radius1*(Math.sqrt(2)/2)-55/50*radius1*(Math.sqrt(2)/2)/4 -waveRanTo1[3], 165+55/50*radius1*(Math.sqrt(2)/2)+waveRanTo1[3], 165-55/50*radius1*(Math.sqrt(2)/2)-waveRanTo1[3]);
        ctx2.bezierCurveTo(165+55/50*radius1*(Math.sqrt(2)/2)+55/50*radius1*(Math.sqrt(2)/2)/4 +waveRanTo1[3], 165-55/50*radius1*(Math.sqrt(2)/2)+55/50*radius1*(Math.sqrt(2)/2)/4-waveRanTo1[3], 165+55/50*radius1+waveRanTo1[4], 165-(55/50*radius1)/4,165+55/50*radius1+waveRanTo1[4], 165);
        ctx2.bezierCurveTo(165+55/50*radius1+waveRanTo1[4], 165+(55/50*radius1)/4, 165+55/50*radius1*(Math.sqrt(2)/2)+55/50*radius1*(Math.sqrt(2)/2)/4+waveRanTo1[5], 165+55/50*radius1*(Math.sqrt(2)/2)-55/50*radius1*(Math.sqrt(2)/2)/4+waveRanTo1[5], 165+55/50*radius1*(Math.sqrt(2)/2)+waveRanTo1[5], 165+55/50*radius1*(Math.sqrt(2)/2)+waveRanTo1[5]);
        ctx2.bezierCurveTo(165+55/50*radius1*(Math.sqrt(2)/2)-55/50*radius1*(Math.sqrt(2)/2)/4+waveRanTo1[5], 165+55/50*radius1*(Math.sqrt(2)/2)+55/50*radius1*(Math.sqrt(2)/2)/4+waveRanTo1[5], 165+(55/50*radius1)/4, 165+55/50*radius1+waveRanTo1[6], 165, 165+55/50*radius1+waveRanTo1[6]);
        ctx2.bezierCurveTo(165-(55/50*radius1)/4, 165+55/50*radius1+waveRanTo1[6], 165-55/50*radius1*(Math.sqrt(2)/2)+55/50*radius1*(Math.sqrt(2)/2)/4-waveRanTo1[7], 165+55/50*radius1*(Math.sqrt(2)/2)+55/50*radius1*(Math.sqrt(2)/2)/4+waveRanTo1[7], 165-55/50*radius1*(Math.sqrt(2)/2)-waveRanTo1[7], 165+55/50*radius1*(Math.sqrt(2)/2)+waveRanTo1[7]);
        ctx2.bezierCurveTo(165-55/50*radius1*(Math.sqrt(2)/2)-55/50*radius1*(Math.sqrt(2)/2)/4-waveRanTo1[7], 165+55/50*radius1*(Math.sqrt(2)/2)-55/50*radius1*(Math.sqrt(2)/2)/4+waveRanTo1[7], 165-55/50*radius1-waveRanTo1[0], 165+(55/50*radius1)/4,165-55/50*radius1-waveRanTo1[0], 165);
        ctx2.fill()
        ctx2.closePath();
        ctx2.fillStyle =color1
        ctx2.beginPath();
        ctx2.moveTo(90-55/50*radius2-waveRanTo2[0], 90);
        ctx2.bezierCurveTo(90-55/50*radius2-waveRanTo2[0], 90-(55/50*radius2)/4, 90-55/50*radius2*(Math.sqrt(2)/2)-55/50*radius2*(Math.sqrt(2)/2)/4-waveRanTo2[1], 90-55/50*radius2*(Math.sqrt(2)/2)+55/50*radius2*(Math.sqrt(2)/2)/4-waveRanTo2[1], 90-55/50*radius2*(Math.sqrt(2)/2)-waveRanTo2[1], 90-55/50*radius2*(Math.sqrt(2)/2)-waveRanTo2[1]);
        ctx2.bezierCurveTo(90-55/50*radius2*(Math.sqrt(2)/2)+55/50*radius2*(Math.sqrt(2)/2)/4-waveRanTo2[1], 90-55/50*radius2*(Math.sqrt(2)/2)-55/50*radius2*(Math.sqrt(2)/2)/4-waveRanTo2[1], 90-(55/50*radius2)/4, 90-55/50*radius2-waveRanTo2[2], 90, 90-55/50*radius2-waveRanTo2[2]);
        ctx2.bezierCurveTo(90+(55/50*radius2)/4, 90-55/50*radius2-waveRanTo2[2], 90+55/50*radius2*(Math.sqrt(2)/2)-55/50*radius2*(Math.sqrt(2)/2)/4 + waveRanTo2[3], 90-55/50*radius2*(Math.sqrt(2)/2)-55/50*radius2*(Math.sqrt(2)/2)/4 -waveRanTo2[3], 90+55/50*radius2*(Math.sqrt(2)/2)+waveRanTo2[3], 90-55/50*radius2*(Math.sqrt(2)/2)-waveRanTo2[3]);
        ctx2.bezierCurveTo(90+55/50*radius2*(Math.sqrt(2)/2)+55/50*radius2*(Math.sqrt(2)/2)/4 +waveRanTo2[3], 90-55/50*radius2*(Math.sqrt(2)/2)+55/50*radius2*(Math.sqrt(2)/2)/4-waveRanTo2[3], 90+55/50*radius2+waveRanTo2[4], 90-(55/50*radius2)/4,90+55/50*radius2+waveRanTo2[4], 90);
        ctx2.bezierCurveTo(90+55/50*radius2+waveRanTo2[4], 90+(55/50*radius2)/4, 90+55/50*radius2*(Math.sqrt(2)/2)+55/50*radius2*(Math.sqrt(2)/2)/4+waveRanTo2[5], 90+55/50*radius2*(Math.sqrt(2)/2)-55/50*radius2*(Math.sqrt(2)/2)/4+waveRanTo2[5], 90+55/50*radius2*(Math.sqrt(2)/2)+waveRanTo2[5], 90+55/50*radius2*(Math.sqrt(2)/2)+waveRanTo2[5]);
        ctx2.bezierCurveTo(90+55/50*radius2*(Math.sqrt(2)/2)-55/50*radius2*(Math.sqrt(2)/2)/4+waveRanTo2[5], 90+55/50*radius2*(Math.sqrt(2)/2)+55/50*radius2*(Math.sqrt(2)/2)/4+waveRanTo2[5], 90+(55/50*radius2)/4, 90+55/50*radius2+waveRanTo2[6], 90, 90+55/50*radius2+waveRanTo2[6]);
        ctx2.bezierCurveTo(90-(55/50*radius2)/4, 90+55/50*radius2+waveRanTo2[6], 90-55/50*radius2*(Math.sqrt(2)/2)+55/50*radius2*(Math.sqrt(2)/2)/4-waveRanTo2[7], 90+55/50*radius2*(Math.sqrt(2)/2)+55/50*radius2*(Math.sqrt(2)/2)/4+waveRanTo2[7], 90-55/50*radius2*(Math.sqrt(2)/2)-waveRanTo2[7], 90+55/50*radius2*(Math.sqrt(2)/2)+waveRanTo2[7]);
        ctx2.bezierCurveTo(90-55/50*radius2*(Math.sqrt(2)/2)-55/50*radius2*(Math.sqrt(2)/2)/4-waveRanTo2[7], 90+55/50*radius2*(Math.sqrt(2)/2)-55/50*radius2*(Math.sqrt(2)/2)/4+waveRanTo2[7], 90-55/50*radius2-waveRanTo2[0], 90+(55/50*radius2)/4,90-55/50*radius2-waveRanTo2[0], 90);
        ctx2.fill()
        ctx2.closePath();
        ctx2.fillStyle = "#797979"
        ctx2.strokeStyle = "#000000"

        ctx2.beginPath();
        ctx2.ellipse(((90+55/50*radius2+waveRanTo2[4])+(90-55/50*radius2-waveRanTo2[0]))/2,((90+55/50*radius2+waveRanTo2[6])+(90-55/50*radius2-waveRanTo2[2]))/2,4,4,0,0,2* Math.PI,2* Math.PI);
        ctx2.fill()
        ctx2.moveTo(((90+55/50*radius2+waveRanTo2[4])+(90-55/50*radius2-waveRanTo2[0]))/2-3,((90+55/50*radius2+waveRanTo2[6])+(90-55/50*radius2-waveRanTo2[2]))/2-3)
        ctx2.lineTo(((90+55/50*radius2+waveRanTo2[4])+(90-55/50*radius2-waveRanTo2[0]))/2-60,((90+55/50*radius2+waveRanTo2[6])+(90-55/50*radius2-waveRanTo2[2]))/2-40)
        ctx2.lineTo(((90+55/50*radius2+waveRanTo2[4])+(90-55/50*radius2-waveRanTo2[0]))/2-80,((90+55/50*radius2+waveRanTo2[6])+(90-55/50*radius2-waveRanTo2[2]))/2-40)
        ctx2.stroke()
        ctx2.closePath();
        ctx2.font="20px Poppins serif"
        ctx2.textAlign = "end"
        ctx2.fillText(`${radius2}%`,((90+55/50*radius2+waveRanTo2[4])+(90-55/50*radius2-waveRanTo2[0]))/2-83,((90+55/50*radius2+waveRanTo2[6])+(90-55/50*radius2-waveRanTo2[2]))/2-35)
        ctx2.beginPath();
        ctx2.ellipse(((165+55/50*radius1+waveRanTo1[4])+(165-55/50*radius1-waveRanTo1[0]))/2,((165+55/50*radius1+waveRanTo1[6])+(165-55/50*radius1-waveRanTo1[2]))/2,4,4,0,0,2* Math.PI,2* Math.PI);
        ctx2.fill()
        ctx2.moveTo(((165+55/50*radius1+waveRanTo1[4])+(165-55/50*radius1-waveRanTo1[0]))/2+3,((165+55/50*radius1+waveRanTo1[6])+(165-55/50*radius1-waveRanTo1[2]))/2-3)
        ctx2.lineTo(((165+55/50*radius1+waveRanTo1[4])+(165-55/50*radius1-waveRanTo1[0]))/2+55/50*radius1+waveRanTo1[4]-20,((165+55/50*radius1+waveRanTo1[6])+(165-55/50*radius1-waveRanTo1[2]))/2-30)
        ctx2.lineTo(((165+55/50*radius1+waveRanTo1[4])+(165-55/50*radius1-waveRanTo1[0]))/2+55/50*radius1+waveRanTo1[4]+10,((165+55/50*radius1+waveRanTo1[6])+(165-55/50*radius1-waveRanTo1[2]))/2-30)

        ctx2.stroke()
        ctx2.closePath();
        ctx2.font="20px Poppins serif"
        ctx2.textAlign = "start"
        ctx2.fillText(`${radius1}%`,((165+55/50*radius1+waveRanTo1[4])+(165-55/50*radius1-waveRanTo1[0]))/2+55/50*radius1+waveRanTo1[4]+13,((165+55/50*radius1+waveRanTo1[6])+(165-55/50*radius1-waveRanTo1[2]))/2-25)
    }
})

