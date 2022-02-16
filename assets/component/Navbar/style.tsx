import { StyleSheet, StyleProp } from "react-native";

const style: StyleProp<any> = StyleSheet.create({
    container: { 
        backgroundColor: '#ffffff' 
    },
    usernameText: { 
        color: '#000000', 
        fontSize: 26, 
        fontWeight: 'bold', 
        marginBottom: 15, 
        marginHorizontal: 10  
    },
    welcomeText: { 
        color: '#B5B5B5', 
        fontWeight: 'bold', 
        marginHorizontal: 10  
    },
    navbarLabel: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 10 
    },
    pageTitleLabel: { 
        flexDirection: 'row' 
    },
    titleBlackText: { 
        fontSize: 36, 
        fontWeight: 'bold', 
        color: '#000000' 
    },
    titleDefaultText: { 
        fontSize: 36, 
        fontWeight: 'bold', 
        color: '#FF5A4D' 
    },
    secundaryPageTitle: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: 10 
    },
    returnButton: { 
        backgroundColor: '#FF6E63', 
        borderTopRightRadius: 15, 
        borderBottomRightRadius: 15,
        marginRight: 10 
    },
    returnButtonText: { 
        width: 25, 
        height: 25, 
        marginRight: 20, 
        marginLeft: 30, 
        marginVertical: 22 
    },
    rightContentLabel: { 
        flexDirection: 'row',
        alignItems: 'center' 
    },
    cartButton: { 
        backgroundColor: '#FF5A4D', 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 10, 
        borderRadius: 15, 
        marginRight: 12 
    },
    cartSize: { 
        color: '#ffffff', 
        fontWeight: 'bold', 
        marginRight: 10 
    },
    cartIcon: { 
        width: 20, 
        height: 20 
    },
    userImage: { 
        width: 42, 
        height: 42, 
        borderRadius: 42, 
        borderWidth: 3, 
        borderColor: '#FF5A4D'
    },
    divider: { 
        width: '100%', 
        height: 3, 
        backgroundColor: '#FF5A4D', 
        marginTop: 10 
    }
});

export default style;