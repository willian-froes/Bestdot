import { StatusBar } from 'expo-status-bar';
import { StackNavigationProp } from '@react-navigation/stack';

import { Text, View, StyleSheet } from 'react-native';

interface Props {
    navigation: StackNavigationProp<any,any>
}

const MainView: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar style='dark' backgroundColor='#ffffff' translucent={false} />

            <Text>Products Cart Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});

export default MainView;