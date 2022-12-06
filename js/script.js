fetch("http://localhost:3000/api/products") 
.then((response) => response.json()) .then((result) => addProducts(result))

function addProducts(result) {
    const imageUrl = result[0].imageUrl

    const items = document.querySelector("#items")

    const link = document.createElement("a")
    link.href = imageUrl

    items.appendChild(link)
}


