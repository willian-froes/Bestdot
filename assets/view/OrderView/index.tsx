import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

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
    navigation: StackNavigationProp<any, any>,
    route: RouteProp<any, any>
}

const MainView: React.FC<Props> = ({ navigation, route }) => {
    const [detailedCart, SetDetailedCart] = useState<CartItem[]>([]);

    const [couponText, SetCouponText] = useState<string>("");
    const [coupon, SetCoupon] = useState<Coupon | null>();

    const [totalItems, SetTotalItems] = useState<any>(0);
    const [totalPrice, SetTotalPrice] = useState<any>(0);

    const [modalIsVisible, SetModalIsVisible] = useState(false);
    const [modalMessage, SetModalMessage] = useState("");

    useEffect(() => {
        CartController.GetDetailedCart().then(detailedCart => {
            SetDetailedCart(detailedCart);
            CartController.UpdateTotalPrice(detailedCart, totalPrice, SetTotalPrice);
            CartController.UpdateTotalItems(detailedCart, totalItems, SetTotalItems);
            CartController.GetCachedCoupon(SetCouponText).then((coupon) => {
                SetModalIsVisible(true);
                SetModalMessage(`You have a coupon with code ${coupon.hash.toUpperCase()}, we paste this in coupon input for you!`);
            });
        });
    }, []);

    return (
        <View style={style.container}>
            <StatusBar style='dark' backgroundColor='#ffffff' translucent={false} />

            {modalIsVisible
                ?
                <Modal description={modalMessage} buttonTitle='Ok!' method={() => { SetModalIsVisible(false); SetModalMessage(""); }} />
                :
                <></>
            }

            <Navbar isMain={false} callableGoTo={() => navigation.goBack()} title="Your bests" >
                {detailedCart.length == 0
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

            {detailedCart.length == 0
                ?
                <Loader description="Wait, we get the bests for you!" />
                :
                <>
                    <FlatList<CartItem>
                        ListHeaderComponent={
                            <View style={style.couponInputContainer}>
                                <InputWithButton 
                                    callableMethod={async () => CartController.CheckCouponToInsert(couponText, SetCoupon, SetModalIsVisible, SetModalMessage)}
                                    callableCancelMethod={()=> SetCouponText("")}
                                    inputPlaceholder={"Have coupon? Insert here!"}
                                    buttonIcon={require("../../image/check-coupon-icon.png")}
                                    callableSetter={SetCouponText}
                                    value={couponText}
                                />
                            </View>
                        }
                        data={detailedCart}
                        renderItem={({ item }) => {        
                            return(
                                <CartItemCard 
                                    item={item}
                                    callableSetDetailedCart={SetDetailedCart} 
                                    detailedCart={detailedCart}
                                    callableGetTotalItems={() => CartController.UpdateTotalItems(detailedCart, totalItems, SetTotalItems)}
                                    callableGetTotalPrice={() => CartController.UpdateTotalPrice(detailedCart, totalPrice, SetTotalPrice)}
                                />
                            );
                        }}
                        keyExtractor={(item, index) => index.toString()}
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
                        
                        <LargeButton title="Check and confirm receiving address" method={() => {}}/>
                    </View>
                </>
            }
        </View>
    );
}

export default MainView;