interface Coupon {
    createdAt: Date,
    hash: string,
    discount: number,
    isAvailable: boolean,
    id: number
}

export default Coupon;