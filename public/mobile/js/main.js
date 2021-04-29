/*----------------------------------------------Menu---------------------------------------------*/

const menuBtn = document.querySelector('#menu-btn')
const menuBtnActive = document.querySelector("#menu-btn-active")
const body = document.querySelector("body")

let menuOpen = false
const navLink = document.querySelectorAll(".nav-link")

screen.orientation.lock("portrait")

menuBtn.onclick = () => {

    const tlMenuList = new TimelineLite()

    if (menuOpen === false) {
        menuBtn.classList.add('open')
        menuBtnActive.classList.add('active')
        menuOpen = true
        body.style.height = "100vh"
        body.style.width = "100vw"
        body.style.overflowY = "hidden"
        tlMenuList.fromTo(navLink, 1, { opacity: 0}, { opacity: 1, stagger: 0.3, ease: "cubic-bezier(0.84, 0, 0.08, 0.99)"})
    } else {
        menuBtn.classList.remove('open')
        menuBtnActive.classList.remove('active')
        menuOpen = false
    }
}
