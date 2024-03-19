const userCreateModel = (name, email, password) => {
    return { name, email, password }
}

const userReadModel = (id, name, password, email, createdAt, updatedAt) => {
    return { id, name, password, email, createdAt, updatedAt }
}

export { userCreateModel, userReadModel}