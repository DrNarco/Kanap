const search = window.location.search;
const urlParams = new URLSearchParams(search)
const id = urlParams.get("id")
if (id != null) {
    let productPrice = 0
}

fetch(`http://localhost:3000/api/products/${id}`)
.then(response => response.json())
.then((result) => handleData(result))

function handleData(couch) {
    const { altTxt, colors, description, imageUrl, name, price, _id} = couch
    productPrice = price
    makeImage(imageUrl, altTxt)
    makeTitle(name)
    makePrice(price)
    makeDescription(description)
    makeColors(colors)
}

function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    parent.appendChild(image)
}

function makeTitle(name) {
    const h1 = document.querySelector("#title")
    h1.textContent = name
}

function makePrice(price) {
    const span = document.querySelector("#price")
    span.textContent = price
}

function makeDescription(description) {
    const p = document.querySelector("#description")
    p.textContent = description
}

function makeColors(colors) {
    const select = document.querySelector("#colors")
    colors.forEach((color) => {
        const option = document.createElement("option")
        option.value = color
        option.textContent = color
        select.appendChild(option)
    })
}

const button = document.querySelector("#addToCart")
    button.addEventListener("click", (e) => {
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value
    if (color == null || color === "" || quantity == null || quantity === "") alert("Veuillez choisir une couleur et un nombre d'articles")
    const data = {
        id: id,
        color: color,
        quantity: Number(quantity),
        price: productPrice
    }
    localStorage.setItem(id, JSON.stringify(data))
})