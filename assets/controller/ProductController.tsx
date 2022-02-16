import { ProductService } from "../service/ProductService";
import CartController from "./CartController";

import CartProduct from "../model/CartProduct";
import Product from "../model/Product";
import CartItem from "../model/CartItem";

export const ProductController: any = {
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
    FilterProductsByText: function(searchableList: Product[], searchText: string, SetProductsList: CallableFunction): void {
        let filteredProducts: Product[] = searchableList.filter((product: Product): boolean => {
            return product.title.toLowerCase().includes(searchText.toLowerCase());
        });

        SetProductsList(filteredProducts);
    },
    FilterProductsByCategory: function(searchableList: Product[], category: string, SetProductsList: CallableFunction): void {
        let filteredProducts: Product[] = searchableList.filter((product: Product): boolean => {
            return product.category === category.toLowerCase();
        });

        SetProductsList(filteredProducts);
    },
    ResetProductsFilter: function(productsList: Product[], SetProductsList: CallableFunction, SetSearchText?: CallableFunction): void {
        SetProductsList(productsList);
        if(SetSearchText) SetSearchText("");
    },
    CheckProductIsBought: function(cart: CartProduct[], item: Product): boolean {
        let boughtItems: CartProduct[] = cart.filter((cartItem: CartProduct) => cartItem.productId == item.id);
        return boughtItems != undefined && boughtItems.length > 0;
    }
}