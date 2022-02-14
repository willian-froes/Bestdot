import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
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
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        backgroundColor: '#FF6E63', 
        borderRadius: 15, 
        marginBottom: 10 
    },
    minigameAccessDescription:  { 
        fontWeight: 'bold', 
        color: '#ffffff', 
        fontSize: 18, 
        marginHorizontal: 15, 
        marginVertical: 10 
    },
    minigameAccessButton: { 
        backgroundColor: '#ffffff', 
        borderColor: '#B5B5B5', 
        borderWidth: 1, 
        justifyContent: 'center', 
        borderTopRightRadius: 15, 
        borderBottomRightRadius: 15, 
        paddingHorizontal: 20 
    },
    minigameAccessButtonText: { 
        fontWeight: 'bold', 
        fontSize: 19, 
        color: '#F0AD4E' 
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