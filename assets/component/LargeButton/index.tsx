import { ReactElement } from 'react';
import { TouchableOpacity, Text } from 'react-native';

import style from './style';

interface Props {
    /** Texto do botão. */
    title: string,
    /** Método de ação do botão */
    method: CallableFunction
}

/**
 * Componente botão com largura proporcional a tela
 * @param { Props } Props parâmetro que contém as propriedades que o componente recebe
 * @returns { ReactElement } arvore de elementos que compõem o componente
 */
const LargeButton: React.FC<Props> = ({ title, method }: Props): ReactElement => {
    return(
        <TouchableOpacity style={style.button} onPress={(): void => method()}>
            <Text style={style.title}>{title}</Text>
        </TouchableOpacity>
    );
}

export default LargeButton;