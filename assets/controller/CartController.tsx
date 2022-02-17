import AsyncStorage from "@react-native-async-storage/async-storage";

import { ProductService } from "../service/ProductService";

import CartItem from "../model/CartItem";
import CartProduct from "../model/CartProduct";

import Product from "../model/Product";

/**
 * Controller que contém todos métodos referentes ao carrinho de compras
 */
export const CartController: any = {
    /**
     * SaveCart, método responsável por parsear a lista de itens no carrinho e armazenar em AsyncStorage
     * @param { CartProduct[] } cart carrinho de compras, contém uma lista de CartProduct
     */
    SaveCart: function(cart: CartProduct[]): void {
        if(cart.length > 0) {
            const newCart: string = JSON.stringify(cart);
            AsyncStorage.setItem("cart", newCart);
        }
    },
    /**
     * LoadCart, método que acessa o AsyncStorage, obtém o carrinho armazenado, serializa e retorna a lista de itens representando o carrinho
     * @returns { Promise<CartProduct[]> } retorna uma promise, que ao ser acessada, fornece o carrinho através do método then()
     */
    LoadCart: async function(): Promise<CartProduct[]> {
        let cartString: string | null = await AsyncStorage.getItem("cart");
        let myCart: CartProduct[] = [];

        if(cartString != null) myCart = JSON.parse(cartString);
        return myCart;
    },
    /**
     * InsertProductInCart, método que adiciona um novo item no carrinho e utiliza o método SaveCart para atualizar o carrinho em AsyncStorage
     * @param { CartProduct[] } cart carrinho de compras, contém uma lista de CartProduct
     * @param { Product | CartItem } item  item a ser adicionado, é definido como Produto ou CartItem, pois na tela Main e Order podem variar
     * @returns { Promise<CartProduct[]> } retorna uma promise, que ao ser acessada, fornece o carrinho através do método then()
     */
    InsertProductInCart: async function(cart: CartProduct[], item: Product | CartItem): Promise<CartProduct[]> {
        const newCart: CartProduct[] = cart;

        newCart.push({ productId: item.id, quantity: 1 });
        CartController.SaveCart(newCart);

        return newCart;
    },
    /**
     * RemoveProductFromCart, método que remove um item do carrinho de compras e atualiza o carrinho em AsyncStorage
     * @param { CartProduct[] } cart carrinho de compras, contém uma lista de CartProduct
     * @param { Product | CartItem } item a ser removido, é definido como Produto ou CartItem, pois na tela Main e Order podem variar
     * @returns { Promise<CartProduct[]> } retorna uma promise, que ao ser acessada, fornece o carrinho através do método then()
     */
    RemoveProductFromCart: async function(cart: CartProduct[], item: Product | CartItem): Promise<CartProduct[]> {
        let newCart: CartProduct[] = cart;
        
        const index: number = newCart.map(product => product.productId).indexOf(item.id);
        newCart.splice(index, 1);

        let newCartString: string = JSON.stringify(newCart);
        await AsyncStorage.setItem("cart", newCartString);
        
        return newCart;
    },
    /**
     * GetDetailedCart, método que, atráves do método LoadCart, acessa o carrinho de compras e, a partir do productId, carrega as informações invidualmente
     * @returns { Promise<CartItem[]> } retorna uma promise, que ao ser acessada, fornece o carrinho detalhado através do método then()
     */
    GetDetailedCart: async function(): Promise<CartItem[]> {
        const cart: CartProduct[] = await CartController.LoadCart();
        const detailedCart: CartItem[] = [];
        let itemIndex: number = 0;

        do {
            await ProductService.GetProductById(cart[itemIndex]).then(async (response: any): Promise<void> => {
                let product: any = response.data;

                detailedCart.push({ 
                    id: product.id,
                    image: product.image,
                    title: product.title,
                    totalPrice: cart[itemIndex].quantity || 1 * product.price,
                    price: product.price,
                    quantity: cart[itemIndex].quantity 
                });
            });
            itemIndex += 1;
        } while(detailedCart.length < cart.length);

        return detailedCart;
    },
    /**
     * UpdateTotalItems, método que a partir das informações detalhadas no carrinho, atualiza o estado da contagem de total de itens no carrinho, é executado quando quantidade é alterada
     * @param { CartProduct[] } detailedCart carrinho de compras, contém uma lista de CartProduct
     * @param { CallableFunction } SetTotalItems método que atualiza o estado total de itens no carrinho
     */
    UpdateTotalItems: function(detailedCart: CartItem[], SetTotalItems: CallableFunction): void {
        let value: number = detailedCart.reduce((totalItemsSum: number, { quantity }) => quantity ? totalItemsSum + quantity : totalItemsSum, 0);
        SetTotalItems(value);
    },
    /**
     * UpdateTotalPrice, método que a partir das informações detalhadas no carrinho, atualiza o estado da soma total de valores dos itens no carrinho, é executado quando um item é removido ou quantidade é alterada
     * @param { CartProduct[] } detailedCart carrinho de compras, contém uma lista de CartProduct
     * @param { CallableFunction } SetTotalPrice método que atualiza o estado da soma total de valores de itens no carrinho
     */
    UpdateTotalPrice: function(detailedCart: CartItem[], SetTotalPrice: CallableFunction): void {
        let value: number = detailedCart.reduce((totalPriceSum: number, { quantity, price }) => quantity ? totalPriceSum + (quantity * price) : 0, 0);
        SetTotalPrice(value);
    },
    /**
     * SetItemQuantity, método que atualiza a quantidade de um determinado item e, logo atualiza o carrinho renderizado na interface
     * @param { boolean } isIncrement flag para indicar se o método deve aumenta rou diminiur a quantidade do produto
     * @param { CartItem[] } detailedCart carrinho detalhado atual
     * @param { CartItem } item item a ser alterada a quantidade
     * @param { number } itemQuantity variável de estado que contém a quantidade do item renderizado
     * @param { CallableFunction } SetItemQuantity método que atualiza a variável de estado da quantidade do item renderizado
     * @param { CallableFunction } callableSetDetailedCart método que atualiza o carrinho detalhado renderizado
     * @param { CallableFunction } callableGetTotalItems método que atualiza o estado da contagem total de itens
     * @param { CallableFunction } callableGetTotalPrice método que atualiza a soma total dos valores baseando-se na quantidade de itens
     */
    SetItemQuantity: function(isIncrement: boolean, detailedCart: CartItem[], item: CartItem, itemQuantity: number, SetItemQuantity: CallableFunction, callableSetDetailedCart: CallableFunction, callableGetTotalItems: CallableFunction, callableGetTotalPrice: CallableFunction): void {
        let cartAux: CartProduct[] = [];

        CartController.LoadCart().then((myCart: CartProduct[]): void => {
            cartAux = myCart;
            detailedCart.filter((cartItem: CartItem): void => {
                if(item.id == cartItem.id && cartItem.quantity && item.quantity) {
                    item.quantity = isIncrement ? item.quantity + 1 : itemQuantity > 1 ? item.quantity - 1 : 1;
                    SetItemQuantity(item.quantity);
                }
            });
            cartAux.filter((cartItem: CartProduct): void => {
                if(cartItem.productId == item.id && cartItem.quantity) {
                    if(isIncrement) {
                        cartItem.quantity += 1;
                    } else {
                        cartItem.quantity -= 1;
                    }
                }
            });

            CartController.SaveCart(cartAux);
            callableSetDetailedCart(detailedCart);
            CartController.GetTotalResume(detailedCart, callableGetTotalItems, callableGetTotalPrice);
        });
    },
    /**
     * GetTotalResume, método que atualiza o estado atual do resumo do pedido
     * @param { CartItem[] } detailedCart carrinho de itens detalhado
     * @param { CallableFunction } callableGetTotalItems método que atualiza o estado da contagem total de itens
     * @param { CallableFunction } callableGetTotalPrice método que atualiza a soma total dos valores baseando-se na quantidade de itens
     */
    GetTotalResume: function(detailedCart: CartItem[], callableGetTotalItems: CallableFunction, callableGetTotalPrice: CallableFunction): void {
        callableGetTotalItems();
        callableGetTotalPrice(detailedCart);
    },
    /**
     * UpdateCart, método que atualiza o carrinho de compras em AsyncStorage
     * @param { CartItem[] } detailedCart carrinho de compras detalhado
     * @param { CartItem } item item detalhado no carrinho
     * @returns { Promise<void> } retorna uma promise para acessar o then() após executar a ação
     */
    UpdateCart: async function(detailedCart: CartItem[], item: CartItem): Promise<void> {
        let newCart: CartItem[] = detailedCart;
        
        const index: number = newCart.map(product => product.id).indexOf(item.id);
        newCart.splice(index, 1);

        let newCartString: string = JSON.stringify(newCart);
        await AsyncStorage.setItem("cart", newCartString);
    }
}