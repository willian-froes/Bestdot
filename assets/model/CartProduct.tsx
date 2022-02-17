/**
 * Modelo do item no carrinho
 */
interface CartProduct {
    /** Identificação do produto */
    productId: number,
    /** Quantidade do item no carrinho */
    quantity?: number
}

export default CartProduct;