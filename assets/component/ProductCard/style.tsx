import { StyleSheet, StyleProp } from "react-native";

const style: StyleProp<any> = StyleSheet.create({
    card: { 
        width: '48%', 
        marginHorizontal: 5, 
        marginBottom: 10 
    },
    productImageLabel: { 
        width: '80%', 
        height: 180, 
        alignSelf: 'center', 
        marginVertical: 10 
    },
    productImage: { 
        flex: 1, 
        resizeMode: 'contain', 
        height: undefined, 
        width: undefined 
    },
    productDataLabel: { 
        borderColor: '#FF6E63', 
        borderWidth: 1, 
        borderTopRightRadius: 15, 
        borderBottomLeftRadius: 15, 
        borderBottomRightRadius: 15, 
        padding: 10 
    },
    productCategoryLabel: { 
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    productTarget: { 
        width: 15, 
        height: 15, 
        backgroundColor: '#ffffff', 
        borderRadius: 15, 
        borderColor: '#FF6E63', 
        borderWidth: 1 
    },
    productCategory : { 
        fontWeight: 'bold', 
        color: '#B5B5B5', 
        marginLeft: 10, 
        marginBottom: 2 
    },
    productTitleLabel: { 
        height: 40, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    productTitle: { 
        flex: 1, 
        flexWrap: 'wrap',
        fontSize: 16, 
        color: '#000000', 
        fontWeight: 'bold' 
    },
    cardFooter: { 
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginTop: 10 
    },
    productPrice: { 
        color: '#00C851', 
        fontWeight: 'bold', 
        fontSize: 20 
    },
    removeButton: { 
        backgroundColor: '#ffffff', 
        paddingHorizontal: 15, 
        paddingVertical: 5, 
        borderRadius: 20, 
        borderWidth: 1, 
        borderColor: '#EC2B2B' 
    },
    removeButtonIcon: { 
        height: 20, 
        width: 20 
    },
    addInCartButton: { 
        backgroundColor: '#FF6E63', 
        paddingHorizontal: 17, 
        paddingVertical: 7, 
        borderRadius: 20 
    },
    addInCartButtonIcon: { 
        height: 18, 
        width: 18 
    }
});

export default style;