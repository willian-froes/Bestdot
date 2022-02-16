import React from 'react';
import { Text, View } from 'react-native';

import style from './style';

interface Props {
    description: string,
    value: number
}
    
const ScoreLabel: React.FC<Props> = ({ description, value }: Props) => {
    return(
        <View style={style.scoreLabel}>
            <Text style={style.scoreDescription}>{description}:</Text>
            <Text style={style.scoreValue}>{value} pts.</Text>
        </View>
    );
}

export default ScoreLabel;