interface CartItem {
    id: number,
    image: string,
    title: string,
    totalPrice?: number,
    price: number,
    quantity?: number
}

export default CartItem;