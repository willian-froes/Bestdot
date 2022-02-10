const url: RequestInfo = "https://fakestoreapi.com";

interface CartProduct {
    productId: number,
    quantity?: number
}

export const ProductService = {
    GetProducts: async function() {
        let init: RequestInit = {
            method: 'GET'
        }

        const request = await fetch(`${url}/products`, init);
        const response = await request.json();

        return response;  
    },
    GetCategories: async function() {
        let init: RequestInit = {
            method: 'GET'
        }

        const request = await fetch(`${url}/products/categories`, init);
        const response = await request.json();

        return response;  
    },
    GetProductById: async function(item: CartProduct) {
        let init: RequestInit = {
            method: 'GET'
        }

        const request = await fetch(`${url}/products/${item.productId}`, init);
        const response = await request.json();

        return response;  
    }
}