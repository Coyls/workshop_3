console.log("SCREEN"); //// SCREEN

//Video declarations
let video1Neg = document.querySelector("#negative");
let video1Pos = document.querySelector("#positive");
let loopNeutralVideo = document.querySelector("#neutral");

let flash = document.querySelector("#flashes");

//Boolean declarations
let video1NegBool = false;
let video1PosBool = false;

let animationIsEnded = {
    type : 'isEnd'
}

const url = 'ws://vps215076.ovh.net:3000'
const serveurSocket = new WebSocket(url)

let params = (new URL(document.location)).searchParams;
let screenId = parseInt(params.get('screen_id'));

loopNeutralVideo.innerHTML = '<source src="./media/videos/neutral_'+screenId+'.mp4">'
video1Neg.innerHTML = '<source src="./media/videos/negative_'+screenId+'.mp4">'
video1Pos.innerHTML = '<source src="./media/videos/positive_'+screenId+'.mp4">'

//let video = document.querySelectorAll(".video")

//video.removeAttribute("muted");

// Object Init ---------------------------------------
let screenInit = {
    type: "init",
    deviceType: "screen",
    screenId: screenId,
};

console.log(screenInit)

// Connection WebSocket ---------------------------
serveurSocket.onopen = () => {
    serveurSocket.send(JSON.stringify(screenInit))
}
serveurSocket.onerror = (error) => {
    console.log(`WebSocket error: ${error}`)
}

// message ----------------------------------------
serveurSocket.onmessage = (event) => {
    const data = JSON.parse(event.data)

    console.log(data)

    if (data.type === "post") {
        console.log(data.message); //"humeurReceive"
        console.log(data.moodId); //1 positive ou 2 negative

        //if mood positive
        if (data.moodId === 1){
            //the positive video bool is true
            video1PosBool = true;
            flash.classList.add('flash_anim');
        }
        //if mood negative
        else if (data.moodId === 2){
            //the negative video bool is true
            video1NegBool = true;
            flash.classList.add('flash_anim');
        }

    } else if (data.type === 'screenData') {
        console.log(data.question)

    }
}

flash.addEventListener("animationend", () => {
    flash.classList.remove('flash_anim');
})

//When the neutral video ends
loopNeutralVideo.addEventListener('ended', () => {

    //if the negative video bool is true
    if (video1NegBool) {
        //hide the neutral video
        loopNeutralVideo.style.display = "none";

        //display and play the negative video
        video1Neg.style.display = "block";
        video1Neg.play();

        //reset the bool at false
        video1NegBool = false;

    }
    //if the positive video bool is true
    else if (video1PosBool){
        //hide the neutral video
        loopNeutralVideo.style.display = "none";

        //display and play the positive video
        video1Pos.style.display = "block";
        video1Pos.play();

        //reset the bool at false
        video1PosBool = false;

    }
    else {
        //else play again the neutral video
        loopNeutralVideo.play();
    }

})

//When the negative video ends
video1Neg.addEventListener('ended', () => {
    //hide the negative video
    video1Neg.style.display = 'none';
    //display and play the neutral video
    loopNeutralVideo.style.display = "block";
    loopNeutralVideo.play();

    serveurSocket.send(JSON.stringify(animationIsEnded))
})

//When the positive video ends
video1Pos.addEventListener('ended', () => {
    //hide the negative video
    video1Pos.style.display = 'none';
    //display and play the neutral video
    loopNeutralVideo.style.display = "block";
    loopNeutralVideo.play();

    serveurSocket.send(JSON.stringify(animationIsEnded))
})











































// ?screenId=1

