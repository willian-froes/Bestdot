import { ReactElement, useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons  } from '@expo/vector-icons'; 

import SmallSquareButton from '../SmallSquareButton';

import { CartController } from '../../controller/CartController';

import CartItem from '../../model/CartItem';

import style from './style';

interface Props {
    /** Item incluso no carrinho, contendo as informações completas */
    item: CartItem,
    /** Método set useState chamado por callback para atualizar o estado do carrinho detalhado na tela do carrinho de compras */
    callableSetDetailedCart: CallableFunction,
    /** Carrinho de compras detalhado */
    detailedCart: CartItem[],
    /** Método chamado por callback responsável por atualizar a quantidade total de itens no carrinho */
    callableGetTotalItems: CallableFunction,
    /** Método chamado por callback responsável por atualizar o preço total baseando-se na quantidade total de itens */
    callableGetTotalPrice: CallableFunction
}

/**
 * Componente card do produto incluso no carrinho, mostra informações detalhadas do produto e também disponibiliza botões de remoção e alterar quantidade do produto
 * @param { Props } Props parâmetro que contém as propriedades que o componente recebe
 * @returns { ReactElement } arvore de elementos que compõem o componente
 */
const CartItemCard: React.FC<Props> = ({ item, callableSetDetailedCart, detailedCart, callableGetTotalItems, callableGetTotalPrice }: Props): ReactElement => {
    /** Constante de estado atual da quantidade do item */
    const [itemQuantity, SetItemQuantity] = useState<number>(item.quantity? item.quantity : 1);

    return(
        <View style={style.cartItemCard}>
            <View style={style.removeButtonLabel}>
                <TouchableOpacity style={style.removeButton} onPress={async (): Promise<void> => {
                    CartController.UpdateCart(detailedCart, item);
                    callableGetTotalItems();
                    callableGetTotalPrice(detailedCart);
                }}>
                    <MaterialIcons name="close" size={20} color="#EC2B2B" />
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
                            <SmallSquareButton icon={<MaterialCommunityIcons name="minus" size={24} color="#B5B5B5" />} method={(): void => CartController.SetItemQuantity(false, detailedCart, item, itemQuantity, SetItemQuantity, callableSetDetailedCart, callableGetTotalItems, callableGetTotalPrice)} isDefault={false} />
                            <Text style={style.itemQuantity}>{itemQuantity}</Text>
                            <SmallSquareButton icon={<MaterialCommunityIcons name="plus" size={24} color="#ffffff" />} method={(): void => CartController.SetItemQuantity(true, detailedCart, item, itemQuantity, SetItemQuantity, callableSetDetailedCart, callableGetTotalItems, callableGetTotalPrice)} isDefault={true} />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default CartItemCard;