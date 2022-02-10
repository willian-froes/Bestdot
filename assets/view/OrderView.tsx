import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text, View, StyleSheet, FlatList, Image } from 'react-native';

import InputWithButton from '../component/InputWithButton';
import CartItemCard from '../component/CartItemCard';

import Navbar from '../component/Navbar';
import { RouteProp } from '@react-navigation/native';

import { ProductService }  from '../service/ProductService';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface CartProduct {
    productId: number,
    quantity?: number
}

interface Props {
    navigation: StackNavigationProp<any,any>,
    route: RouteProp<any,any>
}

const MainView: React.FC<Props> = ({ navigation, route }) => {
    const [couponText, SetCouponText] = useState<string>("");

    const [detailedCart, SetDetailedCart] = useState<any>([]);
    const [cartSize, SetCartSize] = useState<number>(0);

    useEffect(() => {
        const cart: CartProduct[] = route.params ? route.params.cart : [];

        if(detailedCart.length == 0) {
            cart.forEach(async (item)=> {
                await ProductService.GetProductById(item).then(async (product) => {
                    detailedCart.push({ ...product, quantity: item.quantity })
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
                <FlatList<any>
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
                        return(
                            <CartItemCard item={item} />
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