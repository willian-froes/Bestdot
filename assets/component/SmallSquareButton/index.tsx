import React, { ReactElement } from 'react';
import { TouchableOpacity } from 'react-native';

import style from './style';

interface Props {
    /** Icone do botão, renderiza um vector-icon. */
    icon: ReactElement,
    /** Método a ser execudado quando o botão é acionado */
    method: CallableFunction,
    /** Flag para alternar o estilo do botão, vazado cinza ou preenchido salmão */
    isDefault: boolean
}

/**
 * Componente botão quadrado pequeno
 * @param { Props } Props parâmetro que contém as propriedades que o componente recebe
 * @returns { ReactElement } arvore de elementos que compõem o componente
 */
const SmallSquareButton: React.FC<Props> = ({ icon, method, isDefault }: Props): ReactElement => {
    return(
        <TouchableOpacity style={[style.button, { backgroundColor: isDefault ? '#FF6E63' : '#ffffff', borderColor: isDefault ? '#FF6E63' : '#B5B5B5' }]} onPress={(): void => method()}>
            {icon}
        </TouchableOpacity>
    );
}

export default SmallSquareButton;