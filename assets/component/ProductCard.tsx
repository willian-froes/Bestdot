import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';

interface Rating {
    rate: number,
    count: number
}

interface Product {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: Rating
}

interface Props {
    product: Product;
}
    
const ProductCard: React.FC<Props> = ({ product }) => {
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

                <Text style={{ flex: 1, flexWrap: 'wrap', fontSize: 16, color: '#000000', fontWeight: 'bold' }} numberOfLines={2}>{product.title}</Text>
                
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                        <Text style={{ color: '#00C851', fontWeight: 'bold', 'fontSize': 20 }}>{`$ ${(Math.round(product.price * 100) / 100).toFixed(2)}`}</Text>
                        <TouchableOpacity style={{ backgroundColor: '#FF6E63', paddingHorizontal: 15, paddingVertical: 10, borderRadius: 20 }}>
                            <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>buy</Text>
                        </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default ProductCard;