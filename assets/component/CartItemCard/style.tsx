import { StyleSheet, StyleProp } from "react-native";

const style: StyleProp<any> = StyleSheet.create({
    cartItemCard: { 
        flexDirection: 'row', 
        marginBottom: 10, 
        marginHorizontal: 10 
    },
    removeButtonLabel: { 
        flexDirection: 'column' 
    },
    removeButton: { 
        borderWidth: 1, 
        borderColor: '#EC2B2B', 
        padding: 5, 
        borderTopLeftRadius: 15, 
        borderBottomRightRadius: 15 
    },
    removeButtonAuxLabel: { 
        flexGrow: 1, 
        borderColor: '#F0F0F0', 
        borderBottomWidth: 1, 
        borderLeftWidth: 1, 
        borderBottomLeftRadius: 15 
    },
    cardContentLabel: { 
        flex: 1, 
        flexDirection: 'row', 
        paddingVertical: 10, 
        paddingRight: 10, 
        borderTopWidth: 1, 
        borderRightWidth: 1, 
        borderBottomWidth: 1, 
        borderColor: '#F0F0F0', 
        borderBottomRightRadius: 15, 
        borderTopRightRadius: 15 
    },
    itemImageLabel: { 
        height: 100, 
        width: 78, 
        marginRight: 15 
    },
    itemImage: { 
        flex: 1, 
        resizeMode: 'contain', 
        height: undefined, 
        width: undefined 
    },
    itemInfoLabel: { 
        flex: 1, 
        flexDirection: 'column' 
    },
    itemTopContentLabel: { 
        flex: 1, 
        flexDirection: 'column' 
    },
    itemTitle: { 
        flexWrap: 'wrap', 
        fontSize: 16, 
        color: '#000000', 
        fontWeight: 'bold' 
    },
    itemQuantityTotalPrice: { 
        color: '#00C851', 
        fontWeight: 'bold', 
        fontSize: 20 
    },
    itemBottomContentLabel: { 
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
    },
    itemPriceLabel: { 
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    itemPrice: { 
        flexWrap: 'wrap', 
        fontSize: 16, 
        color: '#000000', 
        fontWeight: 'bold' 
    },
    itemPriceIndicator: { 
        fontSize: 16, 
        color: '#B5B5B5' 
    },
    itemQuantityLabel: { 
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    itemQuantity: { 
        fontSize: 16, 
        color: '#FF6E63', 
        fontWeight: 'bold', 
        marginHorizontal: 10 
    }
});

export default style;