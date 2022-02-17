import Rating from './Rating';

/**
 * Modelo do produto
 */
interface Product {
    /** Identificação do produto */
    id: number,
    /** Título do produto que representa o nome */
    title: string,
    /** Preço do produto */
    price: number,
    /** Descrição geral do produto */
    description: string,
    /** Categoria de produtos que pertence */
    category: string,
    /** Imagem do produto */
    image: string,
    /** Flag que infica se o produto foi comprado */
    isBought?: boolean,
    /** Objeto que indica a avaliação do produto */
    rating: Rating
}

export default Product;