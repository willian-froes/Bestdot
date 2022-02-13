import CartProduct from '../model/CartProduct';

const url: RequestInfo = "https://fakestoreapi.com";

export const ProductService = {
    GetProducts: async function() {
        let init: RequestInit = { method: 'GET' }

        const response: Response = await fetch(`${url}/products`, init);
        const data: JSON = await response.json();

        return ({data, status: response.status});  
    },
    GetCategories: async function() {
        let init: RequestInit = { method: 'GET' }

        const response: Response = await fetch(`${url}/products/categories`, init);
        const data: JSON = await response.json();

        return ({data, status: response.status});     
    },
    GetProductById: async function(item: CartProduct) {
        let init: RequestInit = { method: 'GET' }

        const response: Response = await fetch(`${url}/products/${item.productId}`, init);
        const data: JSON = await response.json();

        return ({data, status: response.status}); 
    }
}