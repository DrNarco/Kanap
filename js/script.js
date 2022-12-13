fetch("http://localhost:3000/api/products") 
.then((response) => response.json()) .then((result) => { return addProducts(result) })

function addProducts(result) {
    const id = result[0]._id
    const imageUrl = result[0].imageUrl
    const altTxt = result[0].altTxt
    const name = result[0].name
    const description = result[0].description

    const link = manageLink(id)

    const article = document.createElement("article")
    const image = makeImage(imageUrl, altTxt)
    const h3 = makeH3(name)
    const p = makeParagraphe(description)

    article.appendChild(image)
    article.appendChild(h3)
    article.appendChild(p)
    childAppend(link, article)
}

function manageLink(id) {
    const link = document.createElement("a")
    link.href = "./product.html?id=" +id
    return link
}

function childAppend(link, article) {
    const items = document.querySelector("#items")
    items.appendChild(link)
    link.appendChild(article)
}

function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    return image
}

function makeH3(name) {
const h3 = document.createElement("h3")
h3.textContent = name
h3.classList.add("productName")
return h3
}

function makeParagraphe(description) {
const p = document.createElement("p")
p.textContent = description
p.classList.add("productDescription")
return p
}