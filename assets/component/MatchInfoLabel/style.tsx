import { StyleSheet, StyleProp } from "react-native";

const style: StyleProp<any> = StyleSheet.create({
    infoLabel: { 
        flex: 1, 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    infoValue: { 
        fontSize: 36, 
        fontWeight: 'bold', 
        color: '#FF5A4D' 
    },
    infoDescription: { 
        fontWeight: 'bold', 
        color: '#B5B5B5', 
        fontSize: 16 
    }
});

export default style;