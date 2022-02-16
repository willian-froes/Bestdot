import { StyleSheet, StyleProp } from "react-native";

const style: StyleProp<any> = StyleSheet.create({
    container: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingLeft: 10 
    },
    input: { 
        backgroundColor: '#F0F0F0', 
        flex: 1, 
        flexDirection: 'row', 
        fontWeight: 'bold', 
        paddingLeft: 20, 
        paddingVertical: 10, 
        borderTopLeftRadius: 15, 
        borderBottomLeftRadius: 15 
    },
    cancelButton: {
        paddingVertical: 13.35, 
        backgroundColor: '#F0F0F0',
        paddingHorizontal: 15,
        justifyContent: 'center'
    },
    methodButton: {
        backgroundColor: '#FF6E63', 
        borderTopLeftRadius: 15, 
        borderBottomLeftRadius: 15 
    },
    methodButtonIcon: { 
        marginLeft: 20, 
        marginRight: 60, 
        marginVertical: 18 
    }
});

export default style;