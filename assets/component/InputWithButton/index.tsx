import { TextInput, View, Image, TouchableOpacity } from 'react-native';
import style from './style';
import { MaterialIcons } from '@expo/vector-icons';
import { ReactElement } from 'react';

interface Props {
    callableMethod: CallableFunction,
    callableCancelMethod: CallableFunction,
    inputPlaceholder: string,
    buttonIcon: ReactElement,
    callableSetter: CallableFunction,
    value: string
}
    
const InputWithButton: React.FC<Props> = ({ callableMethod, callableCancelMethod, inputPlaceholder, buttonIcon, callableSetter, value }: Props) => {
    return(
        <View style={style.container}>
            <TextInput style={style.input} placeholderTextColor={"#B5B5B5"} placeholder={inputPlaceholder} onChangeText={(text: string): void => callableSetter(text)} value={value}/>
            
            {value != "" && value != null
                ?
                <TouchableOpacity style={style.cancelButton} onPress={(): void => callableCancelMethod()}>
                    <MaterialIcons name="close" size={20} color="#B5B5B5" />
                </TouchableOpacity>
                :
                <></>
            }

            <TouchableOpacity style={style.methodButton} onPress={(): void => callableMethod()}>
                <View style={style.methodButtonIcon}>{buttonIcon}</View>
            </TouchableOpacity>
        </View>
    );
}

export default InputWithButton;