import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text, View, StyleSheet, FlatList, Image } from 'react-native';

import InputWithButton from '../../component/InputWithButton';
import CartItemCard from '../../component/CartItemCard';
import Navbar from '../../component/Navbar';
import Loader from '../../component/Loader';
import LargeButton from '../../component/LargeButton';

import { RouteProp } from '@react-navigation/native';

import { ProductService }  from '../../service/ProductService';
import { CouponService }  from '../../service/CouponService';

import CartProduct from '../../model/CartProduct';
import CartItem from '../../model/CartItem';
import Coupon from '../../model/Coupon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import style from './style';
import Modal from '../../component/Modal';
import OrderStepIndicator from '../../component/OrderStepIndicator';
import Line from '../../component/Line/Line';
import OrderValueItem from '../../component/OrderValueItem';

interface Props {
    navigation: StackNavigationProp<any, any>,
    route: RouteProp<any, any>
}

const MainView: React.FC<Props> = ({ navigation, route }) => {
    const [couponText, SetCouponText] = useState<string>("");

    const [detailedCart, SetDetailedCart] = useState<CartItem[]>([]);
    const [cartSize, SetCartSize] = useState<number>(0);

    const [totalItems, SetTotalItems] = useState<any>(0);
    const [totalPrice, SetTotalPrice] = useState<any>(0);

    const [coupon, SetCoupon] = useState<Coupon | null>();

    const GetTotalItems = () => {
        if(route.params) {
            let value = route.params.cart.reduce((totalItemsSum: number, { quantity }: { quantity: number}) => quantity ? totalItemsSum + quantity : totalItemsSum, 0);
            SetTotalItems(value);
        }
    }

    const GetTotalPrice = (cart: CartItem[]) => {
        if(route.params) {
            let value = cart.reduce((totalPriceSum: number, { quantity, price }) => quantity ? totalPriceSum + (quantity * price) : 0, 0);
            SetTotalPrice(value);
        }
    }

    const GetCachedCoupon = async () => {
        let data: any = await AsyncStorage.getItem("coupon");
        if(data) {
            let coupon = JSON.parse(data);
            SetCouponText(coupon.hash);

            SetModalIsVisible(true);
            SetModalMessage(`You have a coupon with code ${coupon.hash.toUpperCase()}, we paste this in coupon input for you!`);
        }
    }

    useEffect(() => {
        const cart: CartProduct[] = route.params ? route.params.cart : [];

        if(detailedCart?.length == 0) {
            cart.forEach(async (item)=> {
                await ProductService.GetProductById(item).then(async (response) => {
                    let product: any = response.data;

                    detailedCart.push({ 
                        id: product.id,
                        image: product.image,
                        title: product.title,
                        totalPrice: item.quantity? product.price * item.quantity : product.price,
                        price: product.price,
                        quantity: item.quantity 
                    })
                    SetDetailedCart(detailedCart);
                    SetCartSize(cartSize+1);
                });
                GetTotalPrice(detailedCart);
            });
        }
        
        GetTotalItems();
        GetCachedCoupon();
    }, []);

    const [modalIsVisible, SetModalIsVisible] = useState(false);
    const [modalMessage, SetModalMessage] = useState("");

    return (
        <View style={style.container}>
            <StatusBar style='dark' backgroundColor='#ffffff' translucent={false} />

            {modalIsVisible
                ?
                <Modal description={modalMessage} buttonTitle='Ok!' method={() => {
                    SetModalIsVisible(false); 
                    SetModalMessage("");
                }} />
                :
                <></>
            }

            <Navbar isMain={false} callableGoTo={() => navigation.goBack()} title="Your bests" >
                {cartSize == 0
                    ?
                    <></>
                    :
                    <View style={{ alignItems: 'center' }}>
                        <Text style={style.orderProgressText}>Done order in 3 steps</Text>

                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 5 }}>
                            <OrderStepIndicator selected={true} icon={require("../image/cart-white-icon.png")} />
                            <Line />
                            <OrderStepIndicator selected={false} icon={require("../image/location-icon.png")} />
                            <Line />
                            <OrderStepIndicator selected={false} icon={require("../image/payment-icon.png")} />
                        </View>

                        <Text style={style.orderProgressText}>First, check your items here!</Text>
                    </View>
                }

            </Navbar>

            {cartSize == 0
                ?
                <Loader description="Wait, we get the bests for you!" />
                :
                <>
                    <FlatList<CartItem>
                        ListHeaderComponent={
                            <View style={style.couponInputContainer}>
                                <InputWithButton 
                                    callableMethod={() => {
                                        CouponService.GetCouponByHash(couponText).then((response) => {
                                            let coupons: any = response.data;

                                            if(coupons.length > 0 && coupons[0].isAvailable) {
                                                CouponService.UpdateCouponAvailability(coupons[0].id, false).then((response) => {
                                                    let usedCoupon: any = response.data;
                                                    SetCoupon(usedCoupon);
                                                });
                                            } else {
                                                SetModalIsVisible(true);
                                                SetModalMessage("Sorry... this coupon invalid or not found");
                                            }
                                        });
                                    }}
                                    callableCancelMethod={()=> {
                                        SetCouponText("");
                                    }}
                                    inputPlaceholder={"Have coupon? Insert here!"}
                                    buttonIcon={require("../image/check-coupon-icon.png")}
                                    callableSetter={SetCouponText}
                                    value={couponText}
                                />
                            </View>
                        }
                        data={detailedCart}
                        renderItem={({ item }) => {
                            let SetCart, SetCartLength: any;

                            if(route.params) {
                                SetCart = route.params.callableSetCart;
                                SetCartLength = route.params.callableSetCartLength;
                            }
                            
                            return(
                                <CartItemCard 
                                    item={item} callableSetCart={SetCart} 
                                    cart={route.params ? route.params.cart : []} 
                                    callableSetCartLength={SetCartLength} 
                                    cartLength={route.params ? route.params.cartLength : 0} 
                                    callableSetDetailedCart={SetDetailedCart} 
                                    detailedCart={detailedCart}
                                    callableGetTotalItems={() => {
                                        GetTotalItems();
                                        route.params?.callableSetCartLength(route.params?.cartLength);
                                    }}
                                    callableSetTotalItems={SetTotalItems}
                                    callableGetTotalPrice={GetTotalPrice}
                                    callableSetTotalPrice={SetTotalPrice}
                                    totalPrice={totalPrice}
                                    totalItems={totalItems}
                                />
                            );
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />

                    <View>
                        <View style={{ width: '100%', height: 3, backgroundColor: '#FF5A4D', marginBottom: 10 }}/>

                        <OrderValueItem description={`Products (${totalItems} item${totalItems > 0 ? 's' : ''}):`} value={`$ ${(Math.round(totalPrice * 100) / 100).toFixed(2)}`} />
                        {coupon
                            ?
                            <OrderValueItem description={`Coupon ${coupon?.hash} discount:`} value={`-$ ${(Math.round((totalPrice * coupon?.discount) * 100) / 100).toFixed(2)}`} />
                            :
                            <></>
                        }
                        <OrderValueItem description={"Subtotal:"} value={`$ ${(Math.round((coupon ? totalPrice-(totalPrice * coupon.discount) : totalPrice) * 100) / 100).toFixed(2)}`} />
                        
                        <LargeButton title="Check and confirm receiving address" method={() => {}}/>
                    </View>
                </>
            }
        </View>
    );
}

export default MainView;