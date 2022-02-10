import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text, View, StyleSheet } from 'react-native';

import InputWithButton from '../component/InputWithButton';
import Navbar from '../component/Navbar';

interface Props {
    navigation: StackNavigationProp<any,any>
}

const MainView: React.FC<Props> = ({ navigation }) => {
    const [couponText, SetCouponText] = useState<string>("");

    return (
        <View style={styles.container}>
            <StatusBar style='dark' backgroundColor='#ffffff' translucent={false} />

            <Navbar isMain={false} callableGoTo={() => navigation.goBack()} >
                <Text>My order progress...</Text>
            </Navbar>

            <View style={{ marginVertical: 10 }}>
                <InputWithButton 
                    callableMethod={() => {
                        console.log("coupon!");
                    }}
                    callableCancelMethod={()=> {
                        SetCouponText("");
                    }}
                    inputPlaceholder={"Have coupon? Insert here!"}
                    buttonIcon={require("../image/check-coupon-icon.png")}
                    callableSetter={SetCouponText}
                    value={couponText}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});

export default MainView;