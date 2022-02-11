import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
    
import CartItem from '../model/CartItem';

interface Props {
    item: CartItem
}

const CartItemCard: React.FC<Props> = ({ item }) => {
    return(
        <View style={{ flexDirection: 'row', marginBottom: 10, marginHorizontal: 10 }}>
            <View style={{ flexDirection: 'column' }}>
                <TouchableOpacity style={{ borderWidth: 1, borderColor: '#EC2B2B', padding: 10, borderTopLeftRadius: 15, borderBottomRightRadius: 15 }}>
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
                        <Text style={{ color: '#00C851', fontWeight: 'bold', fontSize: 20 }}>{`$ ${(Math.round(item.price * 100) / 100).toFixed(2)}`}</Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ flexWrap: 'wrap', fontSize: 16, color: '#000000', fontWeight: 'bold' }}>{`$ ${(Math.round(item.price * 100) / 100).toFixed(2)}`}</Text>
                            <Text style={{ fontSize: 16, color: '#B5B5B5' }}>/item</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity style={{ borderWidth: 1, borderColor: '#B5B5B5', padding: 8, borderRadius: 10 }}>
                                <Image style={{ width: 15, height: 15 }} source={require("../image/decrement-icon.png")} />
                            </TouchableOpacity>

                            <Text style={{ fontSize: 16, color: '#FF6E63', fontWeight: 'bold', marginHorizontal: 10 }}>0</Text>

                            <TouchableOpacity style={{ borderWidth: 1, borderColor: '#FF6E63', backgroundColor: '#FF6E63', padding: 8, borderRadius: 10 }}>
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