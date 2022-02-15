import { ProductService } from "../service/ProductService";

import CartProduct from "../model/CartProduct";
import Product from "../model/Product";

export const ProductController = {
    LoadProducts: function(SetProductsList: CallableFunction, SetSearchableList: CallableFunction, SetCategoriesList: CallableFunction, SetIsLoading: CallableFunction) {
        SetProductsList([]);

        ProductService.GetProducts().then((response) => {
            let products: any = response.data;

            SetProductsList(products);
            SetSearchableList(products);

            ProductService.GetCategories().then(response => {
                let categories: any = response.data;
                SetCategoriesList(["all", ...categories]);
                SetIsLoading(false);
            });
        });
    
    },
    FilterProductsByText: function(searchableList: Product[], searchText: string, SetProductsList: CallableFunction) {
        let filteredProducts = searchableList.filter((product) => {
            return product.title.toLowerCase().includes(searchText.toLowerCase());
        });

        SetProductsList(filteredProducts);
    },
    ResetProductsFilter: function(productsList: Product[], SetProductsList: CallableFunction, SetSearchText: CallableFunction) {
        SetProductsList(productsList);
        SetSearchText("");
    },
    CheckProductIsBought: function(cart: CartProduct[], item: Product) {
        let boughtItems = cart.filter((cartItem) => cartItem.productId == item.id);
        return boughtItems != undefined && boughtItems.length > 0;
    }
}