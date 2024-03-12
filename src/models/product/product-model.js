const productModel = (id, name, price, stock, created_at, updated_at) => {
    return {
        id: id,
        name: name,
        price: price,
        stock: stock,
        created_at: created_at,
        updated_at: updated_at
    }
}

const createProductModel = (name, price, stock) => {
    return {
        name: name,
        price: price,
        stock: stock,
    }
}

export { productModel, createProductModel }

