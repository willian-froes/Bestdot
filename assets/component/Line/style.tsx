import { StyleSheet, StyleProp } from "react-native";

const style: StyleProp<any> = StyleSheet.create({
    line: { 
        flexGrow: 2, 
        borderTopWidth: 2, 
        height: 1, 
        flexDirection: 'row', 
        borderColor: '#F0F0F0', 
        borderRadius: 1, 
        marginHorizontal: 5 
    }
});

export default style;