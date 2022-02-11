import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text, View, StyleSheet, FlatList } from 'react-native';

import InputWithButton from '../component/InputWithButton';
import CartItemCard from '../component/CartItemCard';

import Navbar from '../component/Navbar';
import { RouteProp } from '@react-navigation/native';

import { ProductService }  from '../service/ProductService';

import CartProduct from '../model/CartProduct';
import CartItem from '../model/CartItem';
import { TouchableOpacity } from 'react-native-gesture-handler';

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

        if(detailedCart.length == 0) {
            cart.forEach(async (item)=> {
                await ProductService.GetProductById(item).then(async (product) => {
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

            <Navbar isMain={false} callableGoTo={() => navigation.goBack()} >
                <Text>My order progress...</Text>
            </Navbar>

            {cartSize == 0
                ?
                <Text>Loading cart...</Text>
                :
                <FlatList<CartItem>
                    ListHeaderComponent={
                        <View style={{ marginVertical: 10 }}>
                            <InputWithButton 
                                callableMethod={() => {
                                    console.log("coupon!");
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
                        let SetCart, SetCartLength;

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
                                callableGetTotalItems={GetTotalItems}
                                callableGetTotalPrice={GetTotalPrice}
                            />
                        );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
            }

            <View>
                <View style={{ width: '100%', height: 3, backgroundColor: '#FF5A4D', marginBottom: 10 }}/>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10 }}>
                    <Text style={{ color: '#000000', fontWeight: 'bold', fontSize: 16 }}>Products ({totalItems} items):</Text>
                    <Text style={{ color: '#00C851', fontWeight: 'bold', fontSize: 16 }}>{`$ ${(Math.round(totalPrice * 100) / 100).toFixed(2)}`}</Text>
                </View>
                
                <TouchableOpacity style={{ backgroundColor: '#FF6E63', margin: 10, borderRadius: 15, padding: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#ffffff' }}>Check and confirm receiving address</Text>
                </TouchableOpacity>
            </View>
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