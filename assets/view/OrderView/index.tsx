import { ReactElement, useEffect, useState } from 'react';
import { StatusBar, Text, View, FlatList, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

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

import CartItem from '../../model/CartItem';
import Coupon from '../../model/Coupon';

import style from './style';

interface Props {
    navigation: StackNavigationProp<any, any>
}

const MainView: React.FC<Props> = ({ navigation }) => {
    const [detailedCart, SetDetailedCart] = useState<CartItem[]>([]);

    const [couponText, SetCouponText] = useState<string>("");
    const [coupon, SetCoupon] = useState<Coupon | null>();

    const [totalItems, SetTotalItems] = useState<any>(0);
    const [totalPrice, SetTotalPrice] = useState<any>(0);

    const [modalIsVisible, SetModalIsVisible] = useState(false);
    const [modalMessage, SetModalMessage] = useState("");

    const [isLoading, SetIsLoading] = useState<boolean>(false);

    useEffect((): void => {
        SetIsLoading(true);
        CartController.GetDetailedCart().then((detailedCart: CartItem[]): void => {
            SetDetailedCart(detailedCart);
            CartController.UpdateTotalPrice(detailedCart, SetTotalPrice);
            CartController.UpdateTotalItems(detailedCart, SetTotalItems);

            CartController.GetCachedCoupon(SetCouponText).then((coupon: Coupon): void => {
                if(coupon) {
                    SetModalIsVisible(true);
                    SetModalMessage(`You have a coupon with code ${coupon.hash.toUpperCase()}, we paste this in coupon input for you!`);
                }
                SetIsLoading(false);
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

                        <View style={style.orderProgressDetail}>
                            <OrderStepIndicator selected={true} icon={require("../../image/cart-white-icon.png")} />
                            <Line />
                            <OrderStepIndicator selected={false} icon={require("../../image/location-icon.png")} />
                            <Line />
                            <OrderStepIndicator selected={false} icon={require("../../image/payment-icon.png")} />
                        </View>

                        <Text style={style.orderProgressText}>First, check your items here!</Text>
                    </View>
                }

            </Navbar>

            {isLoading
                ?
                <Loader description="Wait, we check yout cart!" />
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
                                            callableMethod={async (): Promise<void> => CartController.CheckCouponToInsert(couponText, SetCoupon, SetModalIsVisible, SetModalMessage)}
                                            callableCancelMethod={(): void => SetCouponText("")}
                                            inputPlaceholder={"Have coupon? Insert here!"}
                                            buttonIcon={require("../../image/check-coupon-icon.png")}
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

export default MainView;