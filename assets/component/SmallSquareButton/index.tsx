import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import style from './style';

interface Props {
    icon: any,
    method: CallableFunction
}
    
const SmallSquareButton: React.FC<Props> = ({ icon, method }) => {
    return(
        <TouchableOpacity style={style.button} onPress={() => method()}>
            <Image style={style.icon} source={icon} />
        </TouchableOpacity>
    );
}

export default SmallSquareButton;