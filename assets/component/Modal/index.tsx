import { ReactElement } from 'react';
import { Text, View } from 'react-native';

import LargeButton from '../LargeButton';

import style from './style';

interface Props {
    /** Informação a ser disponibilizada no modal. */
    description: string,
    /** Texto do botão */
    buttonTitle: string,
    /** Método a ser executado ao clicar no botão */
    method: CallableFunction
}

/**
 * Componente modal com botão responsivo de acordo com a largura da tela incluso
 * @param { Props } Props parâmetro que contém as propriedades que o componente recebe
 * @returns { ReactElement } arvore de elementos que compõem o componente
 */
const Modal: React.FC<Props> = ({ description, buttonTitle, method }: Props): ReactElement => {
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