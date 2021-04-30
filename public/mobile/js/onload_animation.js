const logo = document.querySelector(".onload_animation")

let animItem = bodymovin.loadAnimation({
    wrapper: logo,
    animType: 'svg',
    loop: false,
    path: "./image/onload_animation.json"
});

const waitOnload = (delay) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, delay);
    })
}

waitOnload(3333).then(() => {
    logo.classList.add("noneOnload");
})



