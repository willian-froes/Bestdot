import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

import style from './style';

interface Props {
    icon: any,
    method: CallableFunction,
    isDefault: boolean
}
    
const SmallSquareButton: React.FC<Props> = ({ icon, method, isDefault }: Props) => {
    return(
        <TouchableOpacity style={[style.button, { backgroundColor: isDefault ? '#FF6E63' : '#ffffff', borderColor: isDefault ? '#FF6E63' : '#B5B5B5' }]} onPress={(): void => method()}>
            <Image style={style.icon} source={icon} />
        </TouchableOpacity>
    );
}

export default SmallSquareButton;