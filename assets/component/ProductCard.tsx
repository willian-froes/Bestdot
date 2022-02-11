import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';

import Product from '../model/Product';

interface Props {
    product: Product,
    callableAddMethod: CallableFunction,
    callableRemoveMethod: CallableFunction
}
    
const ProductCard: React.FC<Props> = ({ product, callableAddMethod, callableRemoveMethod }) => {
    const [hasInTheCart, SetHasInTheCart] = useState<boolean>(false);

    return(
        <View style={{ width: '48%', marginHorizontal: 5, marginBottom: 10 }}>
            <View style={{ width: '80%', height: 180, alignSelf: 'center', marginVertical: 10 }}>
                <Image style={{ flex: 1, resizeMode: 'contain', height: undefined, width: undefined }} source={{ uri: product.image }}/>
            </View>

            <View style={{ borderColor: '#FF6E63', borderWidth: 1, borderTopRightRadius: 15, borderBottomLeftRadius: 15, borderBottomRightRadius: 15, padding: 10 }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 15, height: 15, backgroundColor: '#ffffff', borderRadius: 15, borderColor: '#FF6E63', borderWidth: 1 }}/>
                    <Text style={{ fontWeight: 'bold', color: '#B5B5B5', marginLeft: 10, marginBottom: 2 }}>{product.category}</Text>
                </View>

                <View style={{ height: 40, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ flex: 1, flexWrap: 'wrap', fontSize: 16, color: '#000000', fontWeight: 'bold' }} numberOfLines={2}>{product.title}</Text>
                </View>
                
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                    <Text style={{ color: '#00C851', fontWeight: 'bold', fontSize: 20 }}>{`$ ${(Math.round(product.price * 100) / 100).toFixed(2)}`}</Text>
                    
                    {hasInTheCart 
                        ?
                        <TouchableOpacity style={{ backgroundColor: '#ffffff', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 20, borderWidth: 1, borderColor: '#EC2B2B' }} onPress={() => {
                            callableRemoveMethod();
                            SetHasInTheCart(false);
                        }}>
                            <Image style={{ height: 20, width: 20 }} source={require("../image/remove-item-icon.png")} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={{ backgroundColor: '#FF6E63', paddingHorizontal: 17, paddingVertical: 7, borderRadius: 20 }} onPress={() => {
                            callableAddMethod();
                            SetHasInTheCart(true);
                        }}>
                            <Image style={{ height: 18, width: 18 }} source={require("../image/cart-white-icon.png")} />
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    );
}

export default ProductCard;