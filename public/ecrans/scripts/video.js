//Video declarations
let video1Neg = document.querySelector("#negative");
let video1Pos = document.querySelector("#positive");
let loopNeutralVideo = document.querySelector("#neutral");

let flash = document.querySelector("#flashes");

//Boolean declarations
let video1NegBool = false;
let video1PosBool = false;


//When a key is released
document.addEventListener('keyup', (e) => {

    //if the key is 'a'
    if (e.key.toLowerCase() === "a"){
        //the negative video bool is true
        video1NegBool = true;
        flash.classList.add('flash_anim');
    }

    //if the key is 'e'
    if (e.key.toLowerCase() === "e") {
        //the positive video bool is true
        video1PosBool = true;
        flash.classList.add('flash_anim');
    }
})

flash.addEventListener("animationend", () => {
    flash.classList.remove('flash_anim');
})

//When the neutral video ends
loopNeutralVideo.addEventListener('ended', () => {
    console.log("ended");

    //if the negative video bool is true
    if (video1NegBool) {
        //hide the neutral video
        loopNeutralVideo.style.display = "none";

        //display and play the negative video
        video1Neg.style.display = "block";
        video1Neg.play();
        console.log("neg video");

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
        console.log("pos video");

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
})

//When the positive video ends
video1Pos.addEventListener('ended', () => {
    //hide the negative video
    video1Pos.style.display = 'none';
    //display and play the neutral video
    loopNeutralVideo.style.display = "block";
    loopNeutralVideo.play();
})