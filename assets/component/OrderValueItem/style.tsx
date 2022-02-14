import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
    orderLabel: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginHorizontal: 10 
    },
    orderDescription: { 
        color: '#000000', 
        fontWeight: 'bold', 
        fontSize: 16 
    },
    orderValue: {
        fontWeight: 'bold', 
        fontSize: 16 
    }
});

export default style;