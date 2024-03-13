const cartModel = (id, userId, created_at, updated_at) => {
    return {
        id: id,
        userId: userId,
        created_at: created_at,
        updated_at: updated_at
    }
}

const createCartModel = (userId, created_at, updated_at) => {
    return {
        userId: userId,
        created_at: created_at,
        updated_at: updated_at
    }
}

export { cartModel, createCartModel }

