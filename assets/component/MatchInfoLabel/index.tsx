import { ReactElement } from 'react';
import { Text, View } from 'react-native';

import style from './style';

interface Props {
    /** Descrição da informação */
    description: string,
    /** Informação do score a ser renderizada */
    value: string
}

/**
 * Componente responsável por demonstrar uma informação da partida atual no minigame
 * @param { Props } Props parâmetro que contém as propriedades que o componente recebe
 * @returns { ReactElement } arvore de elementos que compõem o componente
 */
const MatchInfoLabel: React.FC<Props> = ({ description, value }: Props): ReactElement => {
    return(
        <View style={style.infoLabel}>
            <Text style={style.infoValue}>{value}</Text>
            <Text style={style.infoDescription}>{description}</Text>
        </View>
    );
}

export default MatchInfoLabel;