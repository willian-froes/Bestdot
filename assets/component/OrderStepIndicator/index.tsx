import { useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';

import Product from '../../model/Product';
import LargeButton from '../LargeButton';

import style from './style';

interface Props {
    selected: boolean,
    icon: any
}
    
const OrderStepIndicator: React.FC<Props> = ({ selected, icon }) => {
    return(
        <View style={[style.orderStepIndicator, { backgroundColor: selected ? '#FF6E63' : '#ffffff', borderColor: selected ? '#FF6E63' : '#B5B5B5' }]}>
            <Image style={style.orderStepIcon} source={icon}/>
        </View>
    );
}

export default OrderStepIndicator;