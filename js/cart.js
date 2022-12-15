const cart = []

allocateCacheItems()
cart.forEach((item) => showItem(item))

const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", (e) => fillForm(e))

function allocateCacheItems() {
    const numberOfItems = localStorage.length
    for(let i = 0; i < numberOfItems; i++) {
        const item = localStorage.getItem(localStorage.key(i))
        const itemObject = JSON.parse(item)
        cart.push(itemObject)
    }
}

function showItem(item) {
    const article = makeArticle(item)
    displayArticle(article)
    const imageDiv = makeImageDiv(item)
    article.appendChild(imageDiv)
    const cartItemContent = doCartContent(imageDiv, item)
    article.appendChild(cartItemContent)
    displayArticle(article)
    showTotalQuantity()
    showTotalPrice()
}

function showTotalQuantity() {
    const displayTotalQuantity = document.querySelector("#totalQuantity")
    const total = cart.reduce((total, item) => total + item.quantity, 0)
    displayTotalQuantity.textContent = total
}

function showTotalPrice() {
    let total = 0
    const totalPrice = document.querySelector("#totalPrice")
    cart.forEach(item => {
        const totalUnitPrice = item.price * item.quantity
        total += totalUnitPrice
    })
    totalPrice.textContent = total
}

function doCartContent(div, item) {
    const cartItemContent = document.createElement("div")
    cartItemContent.classList.add("cart__item__content")

    const description = makeDescription(div, item)
    const settings = doSettings(item)

    cartItemContent.appendChild(description)
    cartItemContent.appendChild(settings)
    return cartItemContent
}

function doSettings(item) {
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")

    addQuantityToSettings(settings, item)
    addDeleteToSettings(settings, item)
    return settings
}

function addDeleteToSettings(settings, item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    div.addEventListener("click", () => deleteItem(item))
    const p = document.createElement("p")
    p.textContent = "Supprimer"
    div.appendChild(p)
    settings.appendChild(div)
}

function deleteItem(item) {
    const itemToDelete = cart.find((product) => product.id === item.id && product.color === item.color)
    cart.splice(itemToDelete, 1)
    showTotalQuantity()
    showTotalPrice()
    deleteCacheData(item)
    removeProductFromCart(item)
}

function removeProductFromCart(item) {
    const productToDelete = document.querySelector(`article[data-id="${item.id}"][data-color="${item.color}"]`)
    productToDelete.remove()
}

function deleteCacheData(item) {
    const key = `${item.id}-${item.color}`
    localStorage.removeItem(key)
}

function addQuantityToSettings(settings, item) {
    const quantity = document.createElement("div")
    quantity.classList.add("cart__item__content__settings__quantity")
    const p = document.createElement("p")
    p.textContent = "Qté : "
    quantity.appendChild(p)
    const input = document.createElement("input")
    input.type = "number"
    input.classList.add("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = item.quantity
    input.addEventListener("input", () => updatePriceAndQuantity(item.id, input.value, item))
    quantity.appendChild(input)
    settings.appendChild(quantity)
}

function updatePriceAndQuantity(id, newValue, item) {
    const itemToUpdate = cart.find(item => item.id === id)
    itemToUpdate.quantity = Number(newValue)
    item.quantity = itemToUpdate.quantity
    showTotalQuantity()
    showTotalPrice()
    updateCacheData(item)
}

function updateCacheData(item) {
    const dataToSave = JSON.stringify(item)
    const key = `${item.id}-${item.color}`
    localStorage.setItem(key, dataToSave)
}

function makeDescription(div, item) {
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")

    const h2 = document.createElement("h2")
    h2.textContent = item.name
    const p = document.createElement("p")
    p.textContent = item.color
    const p2 = document.createElement("p")
    p2.textContent = item.price + " €"

    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(p2)
    div.appendChild(description)
    return div
}

function displayArticle(article) {
    document.querySelector("#cart__items").appendChild(article)
}

function makeArticle(item) {
    const article = document.createElement("article")
    article.classList.add("cart__item")
    article.dataset.id = item.id
    article.dataset.color = item.color
    return article
}

function makeImageDiv(item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__img")
    const image = document.createElement("img")
    image.src = item.imageUrl
    image.alt = item.altTxt
    div.appendChild(image)
    return div
}

function fillForm(e) {
    e.preventDefault()
    if (cart.length === 0) {
        alert("Veuillez ajouter des produits à votre cart")
        return
    }
    if (formInvalid()) return
    if (emailInvalid()) return
    const body = doRequestBody()
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
}

function emailInvalid() {
    const email = document.querySelector("#email").value
    const regex = /^[A-Za-z0-9+_.-]+@(.+)$/
        if (regex.test(email) === false) {
            alert("Veuillez utiliser une addresse email valide")
            return true
        }
        return false
    }

function formInvalid() {
    const form = document.querySelector(".cart__order__form")
    const inputs = form.querySelectorAll("input")
    inputs.forEach((input) => {
        if (input.value === "") {
            alert("Merci de bien vouloir remplir tous les champs")
            return true
        }
        return false
    })
}

function doRequestBody() {
    const form = document.querySelector(".cart__order__form")
    const firstName = form.elements.firstName.value
    const lastName = form.elements.lastName.value
    const adress = form.elements.adress.value
    const city = form.elements.city.value
    const email = form.elements.email.value
    const body = {
        contact: {
            firstName: firstName,
            lastName: lastName,
            adress: adress,
            city: city,
            email: email
        },
        products: retrieveCacheIds()
    }
    return body
}

function retrieveCacheIds() {
    const numberOfItems = localStorage.length
    const ids = []
    for (let i = 0; i < numberOfItems; i++) {
    const key = localStorage.key(i)
    const id = key.split("-")[0]
    ids.push(id)
    }
    return ids
}


