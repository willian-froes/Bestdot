import React from 'react';
import { Text, View } from 'react-native';

interface Props {
    description: string,
    value: string
}
    
const MatchInfoLabel: React.FC<Props> = ({ description, value }) => {
    return(
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#FF5A4D' }}>{value}</Text>
            <Text style={{ fontWeight: 'bold', color: '#B5B5B5', fontSize: 16 }}>{description}</Text>
        </View>
    );
}

export default MatchInfoLabel;