let moyG = 50;
let red = 255
let green = 255
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

    let nbPoint = 6;
    let repN = 70
    let repP = 30
    let radius1,radius2,color1,color2
    if (repN<=repP){
        radius1 = repN
        color1 = "rgb(135,219,89)"
        color2 = "rgb(219,135,89)"

        radius2 = repP
    }else{
        radius1 = repP
        color1 = "rgb(219,135,89)"
        color2 = "rgb(135,219,89)"
        radius2 = repN
    }

    let canvasQ = document.querySelector("#canvasQ1");
    let ctx2 = canvasQ.getContext('2d');
    loop2();

    function loop2() {
        draw2()
        requestAnimationFrame(loop2)
    }

    function draw2() {
        ctx2.fillStyle =color1
        ctx2.beginPath();
        ctx2.moveTo(1, 121);
        ctx2.bezierCurveTo(1, 61, 41, 1, 101, 1);
        ctx2.bezierCurveTo(161, 1, 301, 51, 301, 101);
        ctx2.bezierCurveTo(301, 151, 181, 301, 121, 301);
        ctx2.bezierCurveTo(61, 301, 1, 181, 1, 121);
        ctx2.fill()
        ctx2.closePath();
        ctx2.beginPath();
        ctx2.strokeStyle= "black"
        ctx2.ellipse(70,70,radius2,radius2,0,0,0,2*Math.PI)
        ctx2.stroke()
        ctx2.closePath();
    }
})