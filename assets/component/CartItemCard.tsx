import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
    
import CartItem from '../model/CartItem';
import CartProduct from '../model/CartProduct';

interface Props {
    item: CartItem,
    callableSetDetailedCart: CallableFunction,
    detailedCart: CartItem[],
    callableSetCart: CallableFunction,
    cart: CartProduct[],
    callableSetCartLength: CallableFunction,
    cartLength: number,
    callableGetTotalItems: CallableFunction,
    callableGetTotalPrice: CallableFunction
}

const CartItemCard: React.FC<Props> = ({ item, callableSetDetailedCart, detailedCart, callableSetCart, cart, callableSetCartLength, cartLength, callableGetTotalItems, callableGetTotalPrice }) => {
    const [itemQuantity, SetItemQuantity] = useState<number>(item.quantity? item.quantity : 1);

    const SetQuantity = (isIncrement: boolean) => {
        detailedCart.filter((cartItem) => {
            if(item.id == cartItem.id && cartItem.quantity && item.quantity) {
                item.quantity = isIncrement ? item.quantity + 1 : itemQuantity > 1 ? item.quantity - 1 : 1;
                SetItemQuantity(item.quantity);
            }
        });
        
        cart.filter((cartItem) => {
            if(item.id == cartItem.productId && cartItem.quantity) {
                cartItem.quantity = isIncrement ? cartItem.quantity + 1 : itemQuantity > 1 ? cartItem.quantity - 1 : 1;
            }
        });
        
        callableSetCart(cart);
        callableSetDetailedCart(detailedCart);

        callableGetTotalItems();
        callableGetTotalPrice(detailedCart);
    }

    return(
        <View style={{ flexDirection: 'row', marginBottom: 10, marginHorizontal: 10 }}>
            <View style={{ flexDirection: 'column' }}>
                <TouchableOpacity style={{ borderWidth: 1, borderColor: '#EC2B2B', padding: 10, borderTopLeftRadius: 15, borderBottomRightRadius: 15 }} onPress={() => {
                    const index = cart.map(product => product.productId).indexOf(item.id);
                    callableSetCartLength(cartLength-1);
                    let detailedCartAux: CartItem[] = [];

                    cart.splice(index, 1);
                    detailedCart.filter((detailedItem) => {
                        if(detailedItem.id !== item.id) detailedCartAux.push(detailedItem);
                    });

                    callableSetCart(cart);
                    callableSetDetailedCart(detailedCartAux);

                }}>
                    <Image style={{ width: 10, height: 10 }} source={require("../image/remove-icon.png")}/>
                </TouchableOpacity>
                <View style={{ flexGrow: 1, borderColor: '#F0F0F0', borderBottomWidth: 1, borderLeftWidth: 1, borderBottomLeftRadius: 15 }}></View>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 10, paddingRight: 10, borderTopWidth: 1, borderRightWidth: 1, borderBottomWidth: 1, borderColor: '#F0F0F0', borderBottomRightRadius: 15, borderTopRightRadius: 15 }}>
                <View style={{ height: 100, width: 78, marginRight: 15 }}>
                    <Image style={{ flex: 1, resizeMode: 'contain', height: undefined, width: undefined }} source={{ uri: item.image }}/>
                </View>
                
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text style={{ flexWrap: 'wrap', fontSize: 16, color: '#000000', fontWeight: 'bold' }} numberOfLines={2}>{item.title}</Text>
                        <Text style={{ color: '#00C851', fontWeight: 'bold', fontSize: 20 }}>{`$ ${(Math.round((item.quantity ? item.price * item.quantity : item.price) * 100) / 100).toFixed(2)}`}</Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ flexWrap: 'wrap', fontSize: 16, color: '#000000', fontWeight: 'bold' }}>{`$ ${(Math.round(item.price * 100) / 100).toFixed(2)}`}</Text>
                            <Text style={{ fontSize: 16, color: '#B5B5B5' }}>/item</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity style={{ borderWidth: 1, borderColor: '#B5B5B5', padding: 8, borderRadius: 10 }} onPress={() => SetQuantity(false)}>
                                <Image style={{ width: 15, height: 15 }} source={require("../image/decrement-icon.png")} />
                            </TouchableOpacity>

                            <Text style={{ fontSize: 16, color: '#FF6E63', fontWeight: 'bold', marginHorizontal: 10 }}>{itemQuantity}</Text>

                            <TouchableOpacity style={{ borderWidth: 1, borderColor: '#FF6E63', backgroundColor: '#FF6E63', padding: 8, borderRadius: 10 }} onPress={() => SetQuantity(true)}>
                                <Image style={{ width: 15, height: 15 }} source={require("../image/increment-icon.png")} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default CartItemCard;