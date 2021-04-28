const instagramWrapper = document.querySelector("#instagram-wrapper-part-two")
const projectNumber = 10

for (let i = 0; i < projectNumber; i++) {
    const imageWrapper = document.createElement("div")
    imageWrapper.classList.add("imageWrapper")
    instagramWrapper.append(imageWrapper)
}