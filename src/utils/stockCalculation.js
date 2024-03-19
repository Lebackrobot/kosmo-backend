import stockService from '../services/stock/stock-service.js'

const haveStock = async (productId, quantity) => {
    const { quantity: stockQuantity } = await stockService.getStockByProdcutId(productId)
    return stockQuantity >= quantity
}

export { haveStock }