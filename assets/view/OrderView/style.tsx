import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    orderProgressLabel: { 
        alignItems: 'center' 
    },
    orderProgressText: { 
        fontWeight: 'bold', 
        color: '#000000', 
        fontSize: 16 
    },
    orderProgressDetail: { 
        width: '100%', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        paddingHorizontal: 10,
        paddingVertical: 5 
    },
    couponInputContainer: { 
        marginVertical: 10 
    },
    footer: {
        width: '100%', 
        height: 3, 
        backgroundColor: '#FF5A4D', 
        marginBottom: 10 
    }
});

export default style;