<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10 }}>
    <Text style={{ color: '#000000', fontWeight: 'bold', fontSize: 16 }}>{}</Text>
    <Text style={{ color: '#00C851', fontWeight: 'bold', fontSize: 16 }}>{}</Text>
</View>

import { useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';

import Product from '../../model/Product';
import LargeButton from '../LargeButton';

import style from './style';

interface Props {
    description: string,
    value: string,
    valueTextColor: string
}
    
const OrderValueItem: React.FC<Props> = ({ description, value, valueTextColor }) => {
    return(
        <View style={style.orderLabel}>
            <Text style={style.orderDescription}>{description}</Text>
            <Text style={[style.orderValue, { color: valueTextColor }]}>{value}</Text>
        </View>
    );
}

export default OrderValueItem;