import { StyleSheet, StyleProp } from "react-native";

const style: StyleProp<any> = StyleSheet.create({
    loaderLabel: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    description: { 
        color: '#B5B5B5', 
        fontWeight: 'bold', 
        marginTop: 20 
    }
});

export default style;