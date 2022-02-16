import { StyleSheet, StyleProp } from "react-native";

const style: StyleProp<any> = StyleSheet.create({
    scoreLabel: { 
        width: '60%', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between' 
    },
    scoreDescription: { 
        fontWeight: 'bold', 
        color: '#000000', 
        fontSize: 16 
    },
    scoreValue: { 
        fontWeight: 'bold', 
        color: '#B5B5B5', 
        fontSize: 16 
    }
});

export default style;