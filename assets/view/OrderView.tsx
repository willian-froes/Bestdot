import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text, View, StyleSheet, FlatList, Image } from 'react-native';

import InputWithButton from '../component/InputWithButton';
import CartItemCard from '../component/CartItemCard';

import Navbar from '../component/Navbar';
import { RouteProp } from '@react-navigation/native';

import { ProductService }  from '../service/ProductService';

import CartProduct from '../model/CartProduct';
import CartItem from '../model/CartItem';

interface Props {
    navigation: StackNavigationProp<any, any>,
    route: RouteProp<any, any>
}

const MainView: React.FC<Props> = ({ navigation, route }) => {
    const [couponText, SetCouponText] = useState<string>("");

    const [detailedCart, SetDetailedCart] = useState<CartItem[]>([]);
    const [cartSize, SetCartSize] = useState<number>(0);

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
            });
        }
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
                            <CartItemCard item={item} callableSetCart={SetCart} cart={route.params ? route.params.cart : []} callableSetCartLength={SetCartLength} cartLength={route.params ? route.params.cartLength : 0} callableSetDetailedCart={SetDetailedCart} detailedCart={detailedCart} />
                        );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
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