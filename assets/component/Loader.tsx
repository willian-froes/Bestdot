import React from 'react';
import { ActivityIndicator, View, Text } from 'react-native';

interface Props {
    description: string
}
    
const Loader: React.FC<Props> = ({ description }) => {
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View>
                <ActivityIndicator size="large" color="#FF6E63" />
                <Text style={{ color: '#B5B5B5', fontWeight: 'bold', marginTop: 20 }}>{description}</Text>
            </View>
        </View>
    );
}

export default Loader;