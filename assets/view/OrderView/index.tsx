import { ReactElement, useEffect, useState } from 'react';
import { StatusBar, Text, View, FlatList, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons'; 

import InputWithButton from '../../component/InputWithButton';
import CartItemCard from '../../component/CartItemCard';
import Navbar from '../../component/Navbar';
import Loader from '../../component/Loader';
import LargeButton from '../../component/LargeButton';
import Modal from '../../component/Modal';
import OrderStepIndicator from '../../component/OrderStepIndicator';
import Line from '../../component/Line/Line';
import OrderValueItem from '../../component/OrderValueItem';

import { CartController } from '../../controller/CartController';
import { CouponController } from '../../controller/CouponController';

import CartItem from '../../model/CartItem';
import Coupon from '../../model/Coupon';

import style from './style';

interface Props {
    /** Objeto que possibilita acesso ao navigate */
    navigation: StackNavigationProp<any, any>
}

/**
 * View da tela do carrinho/pedido, responsável por renderizar os items inclusos no carrinho de compras, também disponibiliza um resumo geral do pedido
 * @param { Props } Props parâmetro que contém as propriedades que a view recebe
 * @returns { ReactElement } arvore de elementos que compõem a tela do carrinho/pedido
 */
const OrderView: React.FC<Props> = ({ navigation }: Props): ReactElement => {
    /** Constante de estado do carrinho de compras com as informações completas de cada produto */
    const [detailedCart, SetDetailedCart] = useState<CartItem[]>([]);
    /** Constante de estado do valor de campo de entrada da hash do cupom */
    const [couponText, SetCouponText] = useState<string>("");
    /** Constante de estado do cupom retornado caso disponível */
    const [coupon, SetCoupon] = useState<Coupon | null>();
    /** Constante de estado da contagem total de itens no carrinho */
    const [totalItems, SetTotalItems] = useState<any>(0);
    /** Constante de estado da soma total de preços dos itens no carrinho */
    const [totalPrice, SetTotalPrice] = useState<any>(0);
    /** Constante de estado da flag que indica se o modal está visível */
    const [modalIsVisible, SetModalIsVisible] = useState(false);
    /** Constante de estado que contém a mensagem do modal */
    const [modalMessage, SetModalMessage] = useState("");
    /** Constante de estado da flag que indica se o loader está visível */
    const [isLoading, SetIsLoading] = useState<boolean>(false);

    useEffect((): void => {
        SetIsLoading(true);

        CartController.GetDetailedCart().then((detailedCart: CartItem[]): void => {
            SetDetailedCart(detailedCart);
            CartController.UpdateTotalPrice(detailedCart, SetTotalPrice);
            CartController.UpdateTotalItems(detailedCart, SetTotalItems);
            CouponController.GetCachedCoupon(SetCouponText).then((coupon: Coupon): void => {
                SetIsLoading(false);
                if(coupon) {
                    SetModalIsVisible(true);
                    SetModalMessage(`You have a coupon with code ${coupon.hash.toUpperCase()}, we paste this in coupon input for you!`);
                }
            });
        });
    }, []);

    return (
        <View style={style.container}>
            <StatusBar backgroundColor='#ffffff' barStyle="dark-content" translucent={false} />

            {modalIsVisible
                ?
                <Modal description={modalMessage} buttonTitle='Ok!' method={(): void => { SetModalIsVisible(false); SetModalMessage(""); }} />
                :
                <></>
            }

            <Navbar isMain={false} callableGoTo={(): void => navigation.goBack()} title="Your bests" >
                {isLoading || detailedCart.length == 0
                    ?
                    <></>
                    :
                    <View style={style.orderProgressLabel}>
                        <Text style={style.orderProgressText}>Done order in 3 steps</Text>

                        <View style={[style.orderProgressDetail, { color: "#000000" }]}>
                            <OrderStepIndicator selected={true} icon={<MaterialIcons name="shopping-cart" size={28} color="#ffffff" />} />
                            <Line />  
                            <OrderStepIndicator selected={false} icon={<MaterialIcons name="not-listed-location" size={28} color="#B5B5B5" />} />
                            <Line />
                            <OrderStepIndicator selected={false} icon={<MaterialIcons name="attach-money" size={28} color="#B5B5B5" />} />
                        </View>

                        <Text style={[style.orderProgressText, { color: "#B5B5B5" }]}>First, check your items here!</Text>
                    </View>
                }

            </Navbar>

            {isLoading
                ?
                <Loader description="Wait, we check your cart!" />
                :
                <>
                    {detailedCart.length == 0
                        ?
                        <View style={style.emptyLabel}>
                            <Image style={style.emptyImage} source={require("../../image/undraw_empty_cart.png")} />
                            <View style={style.emptyTextLabel}>
                                <Text style={style.feedbackTitle}>Oops...</Text>
                                <Text style={style.feedbackMessage}>Your cart is empty... Return to products list to get new bets!</Text>
                            </View>
                        </View>
                        :
                        <>
                            <FlatList<CartItem>
                                ListHeaderComponent={
                                    <View style={style.couponInputContainer}>
                                        <InputWithButton 
                                            callableMethod={async (): Promise<void> => CouponController.CheckCouponToInsert(couponText, SetCoupon, SetModalIsVisible, SetModalMessage)}
                                            callableCancelMethod={(): void => SetCouponText("")}
                                            inputPlaceholder={"Have coupon? Insert here!"}
                                            buttonIcon={<MaterialIcons name="send" size={32} color="#ffffff" />}
                                            callableSetter={SetCouponText}
                                            value={couponText}
                                        />
                                    </View>
                                }
                                data={detailedCart}
                                renderItem={({ item }): ReactElement<any, any> => {        
                                    return(
                                        <CartItemCard 
                                            item={item}
                                            callableSetDetailedCart={SetDetailedCart} 
                                            detailedCart={detailedCart}
                                            callableGetTotalItems={(): void => CartController.UpdateTotalItems(detailedCart, SetTotalItems)}
                                            callableGetTotalPrice={(): void => CartController.UpdateTotalPrice(detailedCart, SetTotalPrice)}
                                        />
                                    );
                                }}
                                keyExtractor={(item, index): string => index.toString()}
                            />

                            <View>
                                <View style={style.footer}/>

                                <OrderValueItem description={`Products (${totalItems} item${totalItems > 0 ? 's' : ''}):`} value={`$ ${(Math.round(totalPrice * 100) / 100).toFixed(2)}`} valueTextColor="#00C851" />
                                {coupon
                                    ?
                                    <OrderValueItem description={`Coupon ${coupon?.hash} discount:`} value={`-$ ${(Math.round((totalPrice * coupon?.discount) * 100) / 100).toFixed(2)}`} valueTextColor="#EC2B2B" />
                                    :
                                    <></>
                                }
                                <OrderValueItem description={"Subtotal:"} value={`$ ${(Math.round((coupon ? totalPrice-(totalPrice * coupon.discount) : totalPrice) * 100) / 100).toFixed(2)}`} valueTextColor="#00C851" />
                                
                                <LargeButton title="Check and confirm receiving address" method={(): void => {}}/>
                            </View>
                        </>
                    }
                </>
            }
        </View>
    );
}

export default OrderView;