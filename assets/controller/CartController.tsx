import AsyncStorage from "@react-native-async-storage/async-storage";

import { ProductService } from "../service/ProductService";
import { CouponService } from "../service/CouponService";

import CartItem from "../model/CartItem";
import CartProduct from "../model/CartProduct";
import Coupon from "../model/Coupon";

export const CartController: any = {
    SaveCart: function(cart: CartProduct[]): void {
        if(cart.length > 0) {
            const newCart: string = JSON.stringify(cart);
            AsyncStorage.setItem("cart", newCart);
        }
    },
    LoadCart: async function(): Promise<CartProduct[]> {
        let cartString: string | null = await AsyncStorage.getItem("cart");
        let myCart: CartProduct[] = [];

        if(cartString != null) myCart = JSON.parse(cartString);
        return myCart;
    },
    InsertProductInCart: async function(cart: CartProduct[], item: any): Promise<CartProduct[]> {
        const newCart: CartProduct[] = cart;

        newCart.push({ productId: item.id, quantity: 1 });
        CartController.SaveCart(newCart);

        return newCart;
    },
    RemoveProductFromCart: async function(cart: any[], item: any): Promise<CartProduct[]> {
        let newCart: CartProduct[] = cart;
        
        const index: number = newCart.map(product => product.productId).indexOf(item.id);
        newCart.splice(index, 1);

        let newCartString: string = JSON.stringify(newCart);
        await AsyncStorage.setItem("cart", newCartString);
        
        return newCart;
    },
    GetDetailedCart: async function(): Promise<any> {
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
    UpdateTotalItems: function(detailedCart: CartItem[], SetTotalItems: CallableFunction): void {
        let value: number = detailedCart.reduce((totalItemsSum: number, { quantity }) => quantity ? totalItemsSum + quantity : totalItemsSum, 0);
        SetTotalItems(value);
    },
    UpdateTotalPrice: function(detailedCart: CartItem[], SetTotalPrice: CallableFunction): void {
        let value: number = detailedCart.reduce((totalPriceSum: number, { quantity, price }) => quantity ? totalPriceSum + (quantity * price) : 0, 0);
        SetTotalPrice(value);
    },
    GetCachedCoupon: async function(SetCouponText: CallableFunction): Promise<Coupon | undefined> {
        let data: string | null = await AsyncStorage.getItem("coupon");
        
        if(data) {
            let coupon: Coupon = JSON.parse(data);
            SetCouponText(coupon.hash);

            return coupon;
        }
    },
    CheckCouponToInsert: async function(couponText: string, SetCoupon: CallableFunction, SetModalIsVisible: CallableFunction, SetModalMessage: CallableFunction): Promise<void> {
        CouponService.GetCouponByHash(couponText).then((response: any): void => {
            let coupons: Coupon[] = response.data;

            if(coupons.length > 0 && coupons[0].isAvailable) {
                CouponService.UpdateCouponAvailability(coupons[0].id, false).then((response: any): void => {
                    let usedCoupon: Coupon = response.data;
                    SetCoupon(usedCoupon);
                });
            } else {
                SetModalIsVisible(true);
                SetModalMessage("Sorry... this coupon invalid or not found");
            }
        });
    },
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
    GetTotalResume: function(detailedCart: CartItem[], callableGetTotalItems: CallableFunction, callableGetTotalPrice: CallableFunction): void {
        callableGetTotalItems();
        callableGetTotalPrice(detailedCart);
    },
    UpdateCart: async function(detailedCart: CartItem[], item: CartItem): Promise<void> {
        let newCart: CartItem[] = detailedCart;
        
        const index: number = newCart.map(product => product.id).indexOf(item.id);
        newCart.splice(index, 1);

        let newCartString: string = JSON.stringify(newCart);
        await AsyncStorage.setItem("cart", newCartString);
    }
}

export default CartController;