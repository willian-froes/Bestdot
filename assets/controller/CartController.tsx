import AsyncStorage from "@react-native-async-storage/async-storage";

import { ProductService } from "../service/ProductService";
import { CouponService } from "../service/CouponService";

import Product from "../model/Product";
import CartItem from "../model/CartItem";
import CartProduct from "../model/CartProduct";

export const CartController =  {
    SaveCart: function(cart: CartProduct[]) {
        if(cart.length > 0) {
            const newCart: string = JSON.stringify(cart);
            AsyncStorage.setItem("cart", newCart);
        }
    },
    LoadCart: async function() {
        let cartString: any = await AsyncStorage.getItem("cart");
        let myCart: CartProduct[] = [];

        if(cartString != null) {
            myCart = JSON.parse(cartString);
        }

        return myCart;
    },
    InsertProductInCart: async function(cart: CartProduct[], item: any) {
        const newCart = cart;
        newCart.push({ productId: item.id, quantity: 1 });
        CartController.SaveCart(newCart);

        return newCart;
    },
    RemoveProductFromCart: async function(cart: CartProduct[], item: any) {
        let newCart = cart;
        
        const index = newCart.map(product => product.productId).indexOf(item.id);
        newCart.splice(index, 1);

        let newCartString = JSON.stringify(newCart);
        await AsyncStorage.setItem("cart", newCartString);
        
        return newCart;
    },
    GetDetailedCart: async function() {
        const cart: CartProduct[] = await CartController.LoadCart();
        const detailedCart: CartItem[] = [];

        return Promise.all(cart.map(async (item) => {
            await ProductService.GetProductById(item).then(async (response) => {
                let product: any = response.data;

                detailedCart.push({ 
                    id: product.id,
                    image: product.image,
                    title: product.title,
                    totalPrice: item.quantity? product.price * item.quantity : product.price,
                    price: product.price,
                    quantity: item.quantity 
                });
            });
        })).then(() => { 
            return detailedCart;
        });
    },
    UpdateTotalItems: function(detailedCart: CartItem[], totalItems: number, SetTotalItems: CallableFunction) {
        let value = detailedCart.reduce((totalItemsSum: number, { quantity }) => quantity ? totalItemsSum + quantity : totalItemsSum, 0);
        SetTotalItems(value);
    },
    UpdateTotalPrice: function(detailedCart: CartItem[], totalPrice: number, SetTotalPrice: CallableFunction) {
        let value = detailedCart.reduce((totalPriceSum: number, { quantity, price }) => quantity ? totalPriceSum + (quantity * price) : 0, 0);
        SetTotalPrice(value);
    },
    GetCachedCoupon: async function(SetCouponText: CallableFunction) {
        let data: any = await AsyncStorage.getItem("coupon");
        if(data) {
            let coupon = JSON.parse(data);
            SetCouponText(coupon.hash);

            return coupon;
        }
    },
    CheckCouponToInsert: async function(couponText: string, SetCoupon: CallableFunction, SetModalIsVisible: CallableFunction, SetModalMessage: CallableFunction) {
        console.log(couponText);
        CouponService.GetCouponByHash(couponText).then((response) => {
            let coupons: any = response.data;
            console.log(response);
            console.log(response.data);
            if(coupons.length > 0 && coupons[0].isAvailable) {
                CouponService.UpdateCouponAvailability(coupons[0].id, false).then((response) => {
                    let usedCoupon: any = response.data;
                    console.log(usedCoupon);
                    SetCoupon(usedCoupon);
                    console.log(response);
                });
            } else {
                SetModalIsVisible(true);
                SetModalMessage("Sorry... this coupon invalid or not found");
            }
        });
    }
}