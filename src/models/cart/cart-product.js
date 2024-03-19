const cartProductCreateModel = (cartId, productId) => {
    return { cartId, productId }
}

const cartProductReadModel = ( id, cart, products) => {
    return { id, cart, products }
}

export { cartProductCreateModel, cartProductReadModel }