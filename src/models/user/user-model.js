const userModel = (id, name, email, password, created_at, updated_at) => {
    return {
        id: id,
        name: name,
        email: email,
        password: password,
        created_at: created_at,
        updated_at: updated_at
    }
}

const createUserModel = (name, email, password) => {
    return {
        name: name,
        email: email,
        password: password,
    }
}

export { userModel, createUserModel }

