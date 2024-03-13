const cartProductsModel = (id, userId, created_at, updated_at) => {
    return {
        id: id,
        id_card: userId,
        id_product: created_at,
        updated_at: updated_at
    }
}

const createCardProdutsModel = (userId, created_at, updated_at) => {
    return {
        userId: userId,
        created_at: created_at,
        updated_at: updated_at
    }
}

export { cartProductsModel, createCardProdutsModel }

