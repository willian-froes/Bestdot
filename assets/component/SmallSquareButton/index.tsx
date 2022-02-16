import React, { ReactElement } from 'react';
import { TouchableOpacity } from 'react-native';

import style from './style';

interface Props {
    icon: ReactElement,
    method: CallableFunction,
    isDefault: boolean
}
    
const SmallSquareButton: React.FC<Props> = ({ icon, method, isDefault }: Props) => {
    return(
        <TouchableOpacity style={[style.button, { backgroundColor: isDefault ? '#FF6E63' : '#ffffff', borderColor: isDefault ? '#FF6E63' : '#B5B5B5' }]} onPress={(): void => method()}>
            {icon}
        </TouchableOpacity>
    );
}

export default SmallSquareButton;