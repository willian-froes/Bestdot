import { StyleSheet, StyleProp } from "react-native";

const style: StyleProp<any> = StyleSheet.create({
    modalBackground: { 
        position: 'absolute', 
        zIndex: 100, 
        backgroundColor: 'rgba(0, 0, 0, 0.6)' , 
        width: '100%', 
        height: '100%', 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    modalLabel: { 
        backgroundColor: '#ffffff', 
        width: '70%', 
        borderRadius: 15, 
        paddingTop: 20 
    },
    modalDescription: { 
        fontWeight: 'bold', 
        color: '#000000', 
        fontSize: 16, 
        marginHorizontal: 10, 
        textAlign: 'center', 
        marginBottom: 10 
    }
});

export default style;