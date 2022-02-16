import { useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import Product from '../../model/Product';

import style from './style';

interface Props {
    product: Product,
    callableAddMethod: CallableFunction,
    callableRemoveMethod: CallableFunction
}
    
const ProductCard: React.FC<Props> = ({ product, callableAddMethod, callableRemoveMethod }: Props) => {
    const [hasInTheCart, SetHasInTheCart] = useState<boolean>(product.isBought ? true : false);

    return(
        <View style={style.card}>
            <View style={style.ratingLabel}>
                <MaterialIcons style={style.ratingIcon} name="star" size={24} color="#F0AD4E" />
                <Text style={style.ratingText}>{product.rating.rate} </Text>
                <Text style={style.ratingCountText}>({product.rating.count})</Text>
            </View>

            <View style={style.productImageLabel}>
                <Image style={style.productImage} source={{ uri: product.image }}/>
            </View>

            <View style={style.productDataLabel}>
                <View style={style.productCategoryLabel}>
                    <View style={style.productTarget} />
                    <Text style={style.productCategory}>{product.category}</Text>
                </View>

                <View style={style.productTitleLabel}>
                    <Text style={style.productTitle} numberOfLines={2}>{product.title}</Text>
                </View>
                
                <View style={style.cardFooter}>
                    <Text style={style.productPrice}>{`$ ${(Math.round(product.price * 100) / 100).toFixed(2)}`}</Text>
                    
                    {hasInTheCart && product.isBought
                        ?
                        <TouchableOpacity style={style.removeButton} onPress={(): void => { callableRemoveMethod(); SetHasInTheCart(false); product.isBought = false; }}>
                            <MaterialIcons name="remove-shopping-cart" size={26} color="#EC2B2B" />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={style.addInCartButton} onPress={(): void => { callableAddMethod(); SetHasInTheCart(true); product.isBought = true; }}>
                            <MaterialIcons name="shopping-cart" size={24} color="#ffffff" />
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    );
}

export default ProductCard;