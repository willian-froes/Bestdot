import { ProductService } from "../service/ProductService";
import CartController from "./CartController";

import CartProduct from "../model/CartProduct";
import Product from "../model/Product";

/**
 * Controller que contém todos métodos referentes a produto
 */
export const ProductController: any = {
    /**
     * LoadProducts, método que obtem os produtos a partir do ProductService e verifica, a partir dos produtos no carrinho 
     * se cada produto foi vendido ou não, além disso obtém as categorias
     * @param { CallableFunction } SetProductsList método que atualiza o estado atual da lista de produtos renderizada
     * @param { CallableFunction } SetSearchableList método que atualiza o estado atual da cópia da lista de produtos
     * @param { CallableFunction } SetCategoriesList método que atualiza o estado atual das categorias encontradas
     * @param { CallableFunction } SetIsLoading método que atualiza o estado atual do componente Loader
     */
    LoadProducts: function(SetProductsList: CallableFunction, SetSearchableList: CallableFunction, SetCategoriesList: CallableFunction, SetIsLoading: CallableFunction): void {
        SetProductsList([]);

        ProductService.GetProducts().then((response: any): void => {
            let products: Product[] = response.data;

            CartController.LoadCart().then((cart: CartProduct[]) => { 
                products.forEach((product: Product): void => {
                    cart.forEach((cartItem: CartProduct) => {
                        if(cartItem.productId == product.id) product.isBought = true;
                    });
                });

                SetProductsList(products);
                SetSearchableList(products);
    
                ProductService.GetCategories().then((response: any): void => {
                    let categories: any = response.data;
                    SetCategoriesList(["all", ...categories]);
                    SetIsLoading(false);
                });
            });

        });
    
    },
    /**
     * FilterProductsByText, método que filtra a lista de produtos de acordo com um texto informado no campo de pesquisa, filtro realizado pelo título
     * @param { Product[] } searchableList cópia da lista de produtos
     * @param { string } searchText texto informado a partir do campo de entrada
     * @param { CallableFunction } SetProductsList método que atualiza o estado atual da lista de produtos renderizados com base na cópia filtrada
     */
    FilterProductsByText: function(searchableList: Product[], searchText: string, SetProductsList: CallableFunction): void {
        let filteredProducts: Product[] = searchableList.filter((product: Product): boolean => {
            return product.title.toLowerCase().includes(searchText.toLowerCase());
        });

        SetProductsList(filteredProducts);
    },
    /**
     * FilterProductsByCategory, método que filtra a lista de produtos de acordo com a categoria selecionada
     * @param { Product[] } searchableList cópia da lista de produtos
     * @param { string } category nome da categoria obtida a partir da seleção
     * @param { CallableFunction } SetProductsList método que atualiza o estado atual da lista de produtos renderizados com base na cópia filtrada
     */
    FilterProductsByCategory: function(searchableList: Product[], category: string, SetProductsList: CallableFunction): void {
        let filteredProducts: Product[] = searchableList.filter((product: Product): boolean => {
            return product.category === category.toLowerCase();
        });

        SetProductsList(filteredProducts);
    },
    /**
     * ResetProductsFilter, método reseta a lista de produtos renderizados para a quantidade de itens original
     * @param { Product[] } productsList cópia da lista de produtos
     * @param { CallableFunction } SetProductsList método que atualiza o estado atual da lista de produtos renderizados com base na cópia filtrada
     * @param { CallableFunction } SetSearchText método que atualiza o estado atual do texto de pesquisa quando há algum valor informado
     */
    ResetProductsFilter: function(productsList: Product[], SetProductsList: CallableFunction, SetSearchText?: CallableFunction): void {
        SetProductsList(productsList);
        if(SetSearchText) SetSearchText("");
    },
    /**
     * CheckProductIsBought, método que verifica se um determinado produto renderizado está incluso no carrinho, indicando que foi comprado
     * @param { CartProduct[] } cart cópia da lista de produtos
     * @param { Product } item método que atualiza o estado atual da lista de produtos renderizados com base na cópia filtrada
     * @returns { boolean } retorna uma flag indicando se o produto foi vendido
     */
    CheckProductIsBought: function(cart: CartProduct[], item: Product): boolean {
        let boughtItems: CartProduct[] = cart.filter((cartItem: CartProduct) => cartItem.productId == item.id);
        return boughtItems != undefined && boughtItems.length > 0;
    }
}