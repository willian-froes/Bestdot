import { TextInput, View, Image, TouchableOpacity } from 'react-native';
import style from './style';

interface Props {
    callableMethod: CallableFunction,
    callableCancelMethod: CallableFunction,
    inputPlaceholder: string,
    buttonIcon: Object,
    callableSetter: CallableFunction,
    value: string
}
    
const InputWithButton: React.FC<Props> = ({ callableMethod, callableCancelMethod, inputPlaceholder, buttonIcon, callableSetter, value }: Props) => {
    return(
        <View style={style.container}>
            <TextInput style={style.input} placeholderTextColor={"#B5B5B5"} placeholder={inputPlaceholder} onChangeText={(text: string) => callableSetter(text)} value={value}/>
            
            {value != "" && value != null
                ?
                <TouchableOpacity style={style.cancelButton} onPress={() => callableCancelMethod()}>
                    <Image style={style.canelButtonIcon} source={require("../../image/close-gray-icon.png")} />
                </TouchableOpacity>
                :
                <></>
            }

            <TouchableOpacity style={style.methodButton} onPress={() => callableMethod()}>
                <Image style={style.methodButtonIcon} source={buttonIcon} />
            </TouchableOpacity>
        </View>
    );
}

export default InputWithButton;