import { StyleSheet, StyleProp } from "react-native";

const style: StyleProp<any> = StyleSheet.create({
    button: { 
        backgroundColor: '#FF6E63', 
        marginHorizontal: 10,
        marginBottom: 10,
        marginTop: 10, 
        borderRadius: 15, 
        padding: 20, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    title: { 
        fontWeight: 'bold', 
        fontSize: 16, 
        color: '#ffffff' 
    }
});

export default style;