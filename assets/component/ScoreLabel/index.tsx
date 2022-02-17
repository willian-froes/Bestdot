import React, { ReactElement } from 'react';
import { Text, View } from 'react-native';

import style from './style';

interface Props {
    /** Descrição da informação */
    description: string,
    /** Valor a ser disponibilizado */
    value: number
}

/**
 * Componente que demonstra uma informação do score no minigame
 * @param { Props } Props parâmetro que contém as propriedades que o componente recebe
 * @returns { ReactElement } arvore de elementos que compõem o componente
 */
const ScoreLabel: React.FC<Props> = ({ description, value }: Props): ReactElement => {
    return(
        <View style={style.scoreLabel}>
            <Text style={style.scoreDescription}>{description}:</Text>
            <Text style={style.scoreValue}>{value} pts.</Text>
        </View>
    );
}

export default ScoreLabel;