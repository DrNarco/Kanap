const orderId = allocateOrderId()
displayOrderId(orderId)
clearCache()

function allocateOrderId() {
    const search = window.location.search
    const urlParams = new URLSearchParams(search)
    return urlParams.get("orderId")
}

function displayOrderId(orderId) {
    const orderIdElement = document.getElementById("orderId")
    orderIdElement.textContent = orderId
}

function clearCache() {
    const cache = window.localStorage
    cache.clear
}