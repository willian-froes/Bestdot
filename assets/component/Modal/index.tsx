import { useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';

import Product from '../../model/Product';
import LargeButton from '../LargeButton';

import style from './style';

interface Props {
    description: string,
    buttonTitle: string,
    method: CallableFunction
}
    
const Modal: React.FC<Props> = ({ description, buttonTitle, method }) => {
    return(
        <View style={style.modalBackground}>
            <View style={style.modalLabel}>
                <Text style={style.modalDescription}>{description}</Text>
                <LargeButton title={buttonTitle} method={method} />
            </View>
        </View>
    );
}

export default Modal;