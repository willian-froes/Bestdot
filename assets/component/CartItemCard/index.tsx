import { useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';

import SmallSquareButton from '../SmallSquareButton';

import { CartController } from '../../controller/CartController';

import CartItem from '../../model/CartItem';

import style from './style';

interface Props {
    item: CartItem,
    callableSetDetailedCart: CallableFunction,
    detailedCart: CartItem[],
    callableGetTotalItems: CallableFunction,
    callableGetTotalPrice: CallableFunction
}

const CartItemCard: React.FC<Props> = ({ item, callableSetDetailedCart, detailedCart, callableGetTotalItems, callableGetTotalPrice }: Props) => {
    const [itemQuantity, SetItemQuantity] = useState<number>(item.quantity? item.quantity : 1);

    return(
        <View style={style.cartItemCard}>
            <View style={style.removeButtonLabel}>
                <TouchableOpacity style={style.removeButton} onPress={async (): Promise<void> => {
                    CartController.UpdateCart(detailedCart, item);
                    callableGetTotalItems();
                    callableGetTotalPrice(detailedCart);
                }}>
                    <Image style={style.removeIcon} source={require("../../image/remove-icon.png")}/>
                </TouchableOpacity>
                <View style={style.removeButtonAuxLabel}></View>
            </View>

            <View style={style.cardContentLabel}>
                <View style={style.itemImageLabel}>
                    <Image style={style.itemImage} source={{ uri: item.image }}/>
                </View>
                
                <View style={style.itemInfoLabel}>
                    <View style={style.itemTopContentLabel}>
                        <Text style={style.itemTitle} numberOfLines={2}>{item.title}</Text>
                        <Text style={style.itemQuantityTotalPrice}>{`$ ${(Math.round((item.quantity ? item.price * item.quantity : item.price) * 100) / 100).toFixed(2)}`}</Text>
                    </View>

                    <View style={style.itemBottomContentLabel}>
                        <View style={style.itemPriceLabel}>
                            <Text style={style.itemPrice}>{`$ ${(Math.round(item.price * 100) / 100).toFixed(2)}`}</Text>
                            <Text style={style.itemPriceIndicator}>/item</Text>
                        </View>
                        <View style={style.itemQuantityLabel}>
                            <SmallSquareButton icon={require("../../image/decrement-icon.png")} method={(): void => CartController.SetItemQuantity(false, detailedCart, item, itemQuantity, SetItemQuantity, callableSetDetailedCart, callableGetTotalItems, callableGetTotalPrice)} isDefault={false} />
                            <Text style={style.itemQuantity}>{itemQuantity}</Text>
                            <SmallSquareButton icon={require("../../image/increment-icon.png")} method={(): void => CartController.SetItemQuantity(true, detailedCart, item, itemQuantity, SetItemQuantity, callableSetDetailedCart, callableGetTotalItems, callableGetTotalPrice)} isDefault={true} />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default CartItemCard;