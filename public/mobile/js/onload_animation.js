const logo = document.getElementById("onload_animation")

    let animItem = bodymovin.loadAnimation({
        wrapper: logo,
        animType: 'svg',
        loop: false,
        path: "./image/onload_animation.json"
    });

    