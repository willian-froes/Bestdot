import { StyleSheet, StyleProp } from 'react-native';

const style: StyleProp<any> = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    salesBannerContainer: { 
        width: '100%', 
        height: 145, 
        marginVertical: 10 
    },
    salesBanner: { 
        flex: 1, 
        resizeMode: 'contain', 
        height: undefined, 
        width: undefined 
    },
    minigameAccessLabel: { 
        flex:1, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        backgroundColor: '#ffffff', 
        borderRadius: 15, 
        marginBottom: 10,
        borderColor: '#B5B5B5', 
        borderWidth: 1 
    },
    minigameAccessDescription:  { 
        fontWeight: 'bold', 
        color: '#F0AD4E', 
        fontSize: 14,
        marginVertical: 10,
        marginLeft: 15,
    },
    minigameAccessButton: { 
        backgroundColor: '#FF6E63', 
        borderColor: '#FF6E63', 
        borderWidth: 2, 
        justifyContent: 'center', 
        borderRadius: 13, 
        paddingHorizontal: 20 
    },
    minigameAccessButtonText: { 
        fontWeight: 'bold', 
        fontSize: 14, 
        color: '#ffffff' 
    },
    productListTitleContainer: {
        marginHorizontal: 5 
    },
    productListTitle: { 
        color: '#000000', 
        fontSize: 26, 
        fontWeight: 'bold' 
    },
    productListCount: { 
        color: '#B5B5B5', 
        fontWeight: 'bold' 
    },
    categoriesListContainer: { 
        height: 40, 
        marginBottom: 20, 
        marginTop: 15 
    },
    productListContainer: { 
        paddingHorizontal: 5
    }
});

export default style;