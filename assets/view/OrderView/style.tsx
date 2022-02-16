import { StyleSheet, StyleProp } from 'react-native';

const style: StyleProp<any> = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    orderProgressLabel: { 
        alignItems: 'center' 
    },
    orderProgressText: { 
        fontWeight: 'bold',  
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
    },
    feedbackTitle: { 
        fontSize: 36, 
        fontWeight: 'bold', 
        color: '#EC2B2B', 
        marginBottom: 10 
    },
    feedbackMessage: { 
        fontWeight: 'bold', 
        color: '#404040',
        fontSize: 16, 
        textAlign: 'center', 
        marginHorizontal: 70 
    },
    emptyLabel: { 
        flex: 1, 
        justifyContent: 'space-evenly', 
        alignItems: 'center' 
    },
    emptyImage: { 
        width: '80%', 
        height: '37.4%' 
    },
    emptyTextLabel: { 
        alignItems: 'center' 
    }
});

export default style;