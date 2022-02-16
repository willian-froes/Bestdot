import { StyleSheet, StyleProp } from "react-native";

const style: StyleProp<any> = StyleSheet.create({
    categoryButton: {  
        paddingHorizontal: 20, 
        borderRadius: 30, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginHorizontal: 5 
    },
    categoryText: {
        fontWeight: 'bold'
    }
});

export default style;