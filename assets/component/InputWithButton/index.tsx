import { TextInput, View, Image, TouchableOpacity } from 'react-native';
import style from './style';
import { MaterialIcons } from '@expo/vector-icons';
import { ReactElement } from 'react';

interface Props {
    /** Método a ser executado quando o botão é acionado */
    callableMethod: CallableFunction,
    /** Método que remove o conteúdo do campo de entrada de texto */
    callableCancelMethod: CallableFunction,
    /** Variável do placeholder definido */
    inputPlaceholder: string,
    /** Icone a ser renderizado no botão, como padrão é utilizado vector-icon */
    buttonIcon: ReactElement,
    /** Setter de estado responsável por atualizar o estado baseando-se no valor do campo de entrada */
    callableSetter: CallableFunction,
    /** Variável de estado do conteúdo informado no input */
    value: string
}

/**
 * Componente do input com botão de ação incluso
 * @param { Props } Props parâmetro que contém as propriedades que o componente recebe
 * @returns { ReactElement } arvore de elementos que compõem o componente
 */
const InputWithButton: React.FC<Props> = ({ callableMethod, callableCancelMethod, inputPlaceholder, buttonIcon, callableSetter, value }: Props): ReactElement => {
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