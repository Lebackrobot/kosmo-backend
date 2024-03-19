const cartCreateModel = (userId) => {
    return { userId }
}

const cartReadModel = ( id, userId, createdAt, updatedAt ) => {
    return { id, userId, createdAt, updatedAt }
}

export { cartCreateModel, cartReadModel }