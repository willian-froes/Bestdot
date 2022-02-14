import { useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';

import Product from '../../model/Product';
import style from './style';

interface Props {
    product: Product,
    callableAddMethod: CallableFunction,
    callableRemoveMethod: CallableFunction
}
    
const ProductCard: React.FC<Props> = ({ product, callableAddMethod, callableRemoveMethod }) => {
    const [hasInTheCart, SetHasInTheCart] = useState<boolean>(product.isBought ? true : false);

    return(
        <View style={style.card}>
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
                    
                    {hasInTheCart
                        ?
                        <TouchableOpacity style={style.removeButton} onPress={() => {
                            callableRemoveMethod();
                            SetHasInTheCart(false);
                        }}>
                            <Image style={style.removeButtonIcon} source={require("../image/remove-item-icon.png")} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={style.addInCartButton} onPress={() => {
                            callableAddMethod();
                            SetHasInTheCart(true);
                        }}>
                            <Image style={style.addInCartButtonIcon} source={require("../image/cart-white-icon.png")} />
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </View>
    );
}

export default ProductCard;