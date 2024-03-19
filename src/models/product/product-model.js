const productReadModel = (id, name, price, quantity) => {
    price = price.toFixed(2)

    return { id, name, price, quantity }
}


const productUpdateModel = (id, quantity) => {
    return { id, quantity }
}


export { productReadModel, productUpdateModel }