import { StyleSheet } from "react-native";

const style = StyleSheet.create({
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
        backgroundColor: '#F0F0F0', 
        paddingVertical: 18, 
        paddingHorizontal: 15 
    },
    canelButtonIcon: {
        width: 12, 
        height: 12 
    },
    methodButton: {
        backgroundColor: '#FF6E63', 
        borderTopLeftRadius: 15, 
        borderBottomLeftRadius: 15 
    },
    methodButtonIcon: { 
        width: 25, 
        height: 25, 
        marginLeft: 20, 
        marginRight: 60, 
        marginVertical: 22 
    }
});

export default style;