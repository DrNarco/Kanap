const search = window.location.search;
const urlParams = new URLSearchParams(search)
const id = urlParams.get("id")
if (id != null) {
    let productPrice = 0
    let imgUrl, altText, articleName
}

fetch(`http://localhost:3000/api/products/${id}`)
.then(response => response.json())
.then((result) => handleData(result))

function handleData(couch) {
    const { altTxt, colors, description, imageUrl, name, price, _id} = couch
    productPrice = price
     imgUrl = imageUrl
     altText = altTxt
     articleName = name
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
    button.addEventListener("click", handleClick)


function handleClick() {
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value
    if (failedOrderValidation(color, quantity)) return
    saveCart(color, quantity)
    redirectToCart()
}

function saveCart(color, quantity) {
    const data = {
        id: id,
        color: color,
        quantity: Number(quantity),
        price: productPrice,
        imageUrl: imgUrl,
        altTxt: altText,
        name: articleName
    }
    localStorage.setItem(id, JSON.stringify(data))
}

function failedOrderValidation(color, quantity) {
    if (color == null || color === "" || quantity == null || quantity == 0) { alert("Veuillez choisir une couleur et un nombre d'articles") 
    return true
}
}

function redirectToCart() {
    window.location.href = "cart.html"
}