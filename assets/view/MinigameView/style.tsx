import { StyleSheet, StyleProp } from 'react-native';

const style: StyleProp<any> = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    scoreLabel: { flex: 1, 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderLeftWidth: 1, 
        borderColor: '#B5B5B5' 
    },
    scoreTitle: { 
        color: '#FF6E63', 
        fontWeight: 'bold', 
        fontSize: 20, 
        textTransform: 'uppercase' 
    },
    minigameScene: { 
        backgroundColor: '#ECEBED', 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        zIndex: -9999 
    },
    dotStateImage: { 
        width: 230, 
        height: 230, 
        alignSelf: 'center' 
    },
    winnerTitle: { 
        fontSize: 36, 
        fontWeight: 'bold', 
        color: '#00C851', 
        textAlign: 'center', 
        marginTop: 10 
    },
    couponLabel: { 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    coupon: { 
        flexDirection: 'column' 
    },
    couponDiscountLabel: { 
        backgroundColor: '#FF6E63', 
        alignItems: 'center', 
        borderTopLeftRadius: 15, 
        borderTopRightRadius: 15, 
        paddingHorizontal: 30, 
        paddingVertical: 10 
    },
    couponDiscountText: { 
        textTransform: 'uppercase', 
        fontSize: 58, 
        color: '#ffffff' 
    },
    couponSaleText: { 
        textTransform: 
        'uppercase', 
        fontSize: 46, 
        color: '#ffffff' 
    },
    couponHashLabel: { 
        alignItems: 'center', 
        borderColor: '#B5B5B5', 
        borderLeftWidth: 1, 
        borderRightWidth: 1, 
        borderBottomWidth: 1, 
        borderBottomLeftRadius: 15, 
        borderBottomRightRadius: 15, 
        padding: 10 
    },
    couponHashText: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        color: '#B5B5B5' 
    },
    couponSaveButton: { 
        alignItems: 'center', 
        borderColor: '#B5B5B5', 
        borderWidth: 1, 
        borderRadius: 15, 
        padding: 20 
    },
    couponSaveButtonText: { 
        fontSize: 14,
        fontWeight: 'bold' 
    },
    feedbackLabel: { 
        alignItems: 'center' 
    },
    feedbackTitle: { 
        fontSize: 36, 
        fontWeight: 'bold', 
        color: '#EC2B2B', 
        marginBottom: 10 
    },
    feedbackMessage: { 
        fontWeight: 'bold', 
        color: '#404040',
        fontSize: 16, 
        textAlign: 'center', 
        marginHorizontal: 70 
    },
    footer: { 
        flexDirection: 'row', 
        marginHorizontal: 5,
        marginBottom: 10 
    },
    tryAgainButton: { 
        flex: 1, 
        backgroundColor: '#FF6E63', 
        borderRadius: 15, 
        padding: 20, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginHorizontal: 5 
    },
    tryAgainButtonText: { 
        fontWeight: 'bold', 
        fontSize: 16, 
        color: '#ffffff' 
    },
    getCouponButton: { 
        flex: 1, 
        backgroundColor: '#ffffff', 
        borderWidth: 1, 
        borderColor: '#00C851', 
        borderRadius: 15, 
        padding: 20, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginHorizontal: 5 
    },
    getCouponButtonText: { 
        fontWeight: 'bold', 
        fontSize: 16, 
        color: '#00C851' 
    }
});

export default style;