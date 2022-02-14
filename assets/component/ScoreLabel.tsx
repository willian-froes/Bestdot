import React from 'react';
import { Text, View } from 'react-native';

interface Props {
    description: string,
    value: number
}
    
const ScoreLabel: React.FC<Props> = ({ description, value }) => {
    return(
        <View style={{ width: '60%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: 'bold', color: '#000000', fontSize: 16 }}>{description}:</Text>
            <Text style={{ fontWeight: 'bold', color: '#B5B5B5', fontSize: 16 }}>{value} pts.</Text>
        </View>
    );
}

export default ScoreLabel;