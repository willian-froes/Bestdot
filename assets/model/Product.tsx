import Rating from './Rating';

interface Product {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    isBought?: boolean,
    rating: Rating
}

export default Product;