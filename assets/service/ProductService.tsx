import CartProduct from '../model/CartProduct';

/** Url que disponibiliza a API de produtos */
const url: RequestInfo = "https://fakestoreapi.com";

/**
 * Service que contém consumo de api relacionado a produto
 */
export const ProductService = {
    /**
     * GetProducts, método que realiza uma requisição do tipo GET para obter todos os produtos a venda
     * @returns { Promise<any> } retorna uma promise, que ao ser acessada, fornece um objeto que contém o status e a lista de produtos
     */
    GetProducts: async function(): Promise<any>  {
        let init: RequestInit = { method: 'GET' }
        
        const response: Response = await fetch(`${url}/products`, init);
        const data: JSON = await response.json();

        return ({data, status: response.status});  
    },
    /**
     * GetCategories, método que realiza uma requisição do tipo GET para obter as categorias disponíveis
     * @returns { Promise<any> } retorna uma promise, que ao ser acessada, fornece um objeto que contém o status e a lista de categorias
     */
    GetCategories: async function(): Promise<any>  {
        let init: RequestInit = { method: 'GET' }

        const response: Response = await fetch(`${url}/products/categories`, init);
        const data: JSON = await response.json();

        return ({data, status: response.status});     
    },
    /**
     * GetProductById, método que realiza uma requisição do tipo GET para obter um produto a venda por id
     * @param { CartProduct } item produto que contém a id em questão
     * @returns { Promise<any> } retorna uma promise, que ao ser acessada, fornece um objeto que contém o status e o produto encontrado
     */
    GetProductById: async function(item: CartProduct): Promise<any>  {
        let init: RequestInit = { method: 'GET' }

        const response: Response = await fetch(`${url}/products/${item.productId}`, init);
        const data: JSON = await response.json();

        return ({data, status: response.status}); 
    }
}