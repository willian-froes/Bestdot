import React from 'react';
import { TextInput, View, Image, TouchableOpacity } from 'react-native';

interface Props {
    callableMethod: CallableFunction,
    callableCancelMethod: CallableFunction,
    inputPlaceholder: string,
    buttonIcon: Object,
    callableSetter: CallableFunction,
    value: string
}
    
const InputWithButton: React.FC<Props> = ({ callableMethod, callableCancelMethod, inputPlaceholder, buttonIcon, callableSetter, value }) => {
    return(
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
            <TextInput style={{ backgroundColor: '#F0F0F0', flex: 1, flexDirection: 'row', fontWeight: 'bold', paddingLeft: 20, paddingVertical: 10, borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }} placeholderTextColor={"#B5B5B5"} placeholder={inputPlaceholder} onChangeText={(text: string) => callableSetter(text)} value={value}/>
            
            {value != "" && value != null
                ?
                <TouchableOpacity style={{ backgroundColor: '#F0F0F0', paddingVertical: 18, paddingHorizontal: 15 }} onPress={() => callableCancelMethod()}>
                    <Image style={{ width: 12, height: 12 }} source={require("../image/close-gray-icon.png")} />
                </TouchableOpacity>
                :
                <></>
            }

            <TouchableOpacity style={{ backgroundColor: '#FF6E63', borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }} onPress={() => callableMethod()}>
                <Image style={{ width: 25, height: 25, marginLeft: 20, marginRight: 80, marginVertical: 22 }} source={buttonIcon} />
            </TouchableOpacity>
        </View>
    );
}

export default InputWithButton;