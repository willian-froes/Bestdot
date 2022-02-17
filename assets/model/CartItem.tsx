/**
 * Modelo do item detalhado no carrinho
 */
interface CartItem {
    /** Identificação do item */
    id: number, 
    /** Imagem do produto */
    image: string,
    /** Título que indica o nome do produto */
    title: string,
    /** Preço total baseando-se na quantidade x preço */
    totalPrice?: number,
    /** Preço do produto */
    price: number,
    /** Quantidade do item no carrinho */
    quantity?: number
}

export default CartItem;