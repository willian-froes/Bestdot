import { useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
    
import CartItem from '../../model/CartItem';
import CartProduct from '../../model/CartProduct';
import SmallSquareButton from '../SmallSquareButton';
import style from './style';

interface Props {
    item: CartItem,
    callableSetDetailedCart: CallableFunction,
    detailedCart: CartItem[],
    callableSetCart: CallableFunction,
    cart: CartProduct[],
    callableSetCartLength: CallableFunction,
    cartLength: number,
    callableGetTotalItems: CallableFunction,
    callableSetTotalItems: CallableFunction,
    callableSetTotalPrice: CallableFunction,
    callableGetTotalPrice: CallableFunction,
    totalPrice: number,
    totalItems: number
}

const CartItemCard: React.FC<Props> = ({ item, callableSetDetailedCart, detailedCart, callableSetCart, cart, callableSetCartLength, cartLength, callableGetTotalItems, callableSetTotalItems, callableSetTotalPrice, callableGetTotalPrice, totalPrice, totalItems }: Props) => {
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
        <View style={style.cartItemCard}>
            <View style={style.removeButtonLabel}>
                <TouchableOpacity style={style.removeButton} onPress={() => {
                    callableSetCartLength(cartLength-1);
                    const index = cart.map(product => product.productId).indexOf(item.id);
                    let detailedCartAux: CartItem[] = [];

                    cart.splice(index, 1);
                    detailedCart.filter((detailedItem) => {
                        if(detailedItem.id !== item.id) detailedCartAux.push(detailedItem);
                    });

                    callableSetCart(cart);
                    callableSetDetailedCart(detailedCartAux);

                    callableSetTotalPrice(totalPrice-(item.quantity ? item.price*item.quantity : item.price));
                    callableGetTotalItems(totalItems-(item.quantity ? item.quantity : 1));
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
                            <SmallSquareButton icon={require("../../image/decrement-icon.png")} method={() => SetQuantity(false)} isDefault={false} />
                            <Text style={style.itemQuantity}>{itemQuantity}</Text>
                            <SmallSquareButton icon={require("../../image/increment-icon.png")} method={() => SetQuantity(true)} isDefault={true} />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default CartItemCard;