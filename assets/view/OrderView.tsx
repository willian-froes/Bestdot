import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

import InputWithButton from '../component/InputWithButton';
import CartItemCard from '../component/CartItemCard';
import Navbar from '../component/Navbar';
import Loader from '../component/Loader';
import LargeButton from '../component/LargeButton';

import { RouteProp } from '@react-navigation/native';

import { ProductService }  from '../service/ProductService';
import { CouponService }  from '../service/CouponService';

import CartProduct from '../model/CartProduct';
import CartItem from '../model/CartItem';
import Coupon from '../model/Coupon';

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
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style='dark' backgroundColor='#ffffff' translucent={false} />

            <Navbar isMain={false} callableGoTo={() => navigation.goBack()} title="Your bests" >
                {cartSize == 0
                    ?
                    <></>
                    :
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', color: '#000000', fontSize: 16 }}>Done order in 3 steps</Text>

                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 5 }}>
                            <View style={{ backgroundColor: '#FF6E63', padding: 10, borderRadius: 15, borderWidth: 1, borderColor: '#FF6E63' }}>
                                <Image style={{ width: 22, height: 22 }} source={require("../image/cart-white-icon.png")}/>
                            </View>

                            <View style={{ flexGrow: 2, borderTopWidth: 2, height: 1, flexDirection: 'row', borderColor: '#F0F0F0', borderRadius: 1, marginHorizontal: 5 }}></View>

                            <View style={{ backgroundColor: '#ffffff', padding: 10, borderRadius: 15, borderWidth: 1, borderColor: '#B5B5B5' }}>
                                <Image style={{ width: 22, height: 22 }} source={require("../image/location-icon.png")}/>
                            </View>

                            <View style={{ flexGrow: 2, borderTopWidth: 2, height: 1, flexDirection: 'row', borderColor: '#F0F0F0', borderRadius: 1, marginHorizontal: 5 }}></View>

                            <View style={{ backgroundColor: '#ffffff', padding: 10, borderRadius: 15, borderWidth: 1, borderColor: '#B5B5B5' }}>
                                <Image style={{ width: 22, height: 22 }} source={require("../image/payment-icon.png")}/>
                            </View>
                        </View>

                        <Text style={{ fontWeight: 'bold', color: '#B5B5B5', fontSize: 16 }}>First, check your items here!</Text>
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
                            <View style={{ marginVertical: 10 }}>
                                <InputWithButton 
                                    callableMethod={() => {
                                        CouponService.GetCouponByHash(couponText).then((response) => {
                                            let coupons: any = response.data;

                                            if(coupons.length > 0 && coupons[0].isAvailable) {
                                                CouponService.UpdateCouponAvailability(coupons[0].id, false).then((response) => {
                                                    let usedCoupon: any = response.data;
                                                    
                                                    if(usedCoupon.isAvailable) {
                                                        SetCoupon(usedCoupon);
                                                    } else {
                                                        console.log("Oops... fail to use this coupon, try it again");
                                                    }
                                                });
                                            } else {
                                                console.log("Sorry... this coupon invalid or not found");
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
                                        console.log(detailedCart.length);
                                        // if(detailedCart.length == 1) {
                                            route.params?.callableSetCartLength(route.params?.cartLength);
                                        // }
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

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10 }}>
                            <Text style={{ color: '#000000', fontWeight: 'bold', fontSize: 16 }}>Products ({totalItems} {`item${totalItems > 0 ? 's' : ''}`}):</Text>
                            <Text style={{ color: '#00C851', fontWeight: 'bold', fontSize: 16 }}>{`$ ${(Math.round(totalPrice * 100) / 100).toFixed(2)}`}</Text>
                        </View>

                        {coupon
                            ?
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10, marginTop: 10 }}>
                                <Text style={{ color: '#000000', fontWeight: 'bold', fontSize: 16 }}>Coupon {coupon?.hash} discount:</Text>
                                <Text style={{ color: '#EC2B2B', fontWeight: 'bold', fontSize: 16 }}>{`-$ ${(Math.round((totalPrice * coupon?.discount) * 100) / 100).toFixed(2)}`}</Text>
                            </View>
                            :
                            <></>
                        }

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10, marginTop: 10 }}>
                            <Text style={{ color: '#000000', fontWeight: 'bold', fontSize: 16 }}>Subtotal:</Text>
                            <Text style={{ color: '#00C851', fontWeight: 'bold', fontSize: 16 }}>{`$ ${(Math.round((coupon ? totalPrice-(totalPrice * coupon.discount) : totalPrice) * 100) / 100).toFixed(2)}`}</Text>
                        </View>
                        
                        <LargeButton title="Check and confirm receiving address" method={() => {}}/>
                        
                    </View>
                </>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});

export default MainView;