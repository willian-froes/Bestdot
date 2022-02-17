/**
 * Modelo do cupom 
 */
interface Coupon {
    /** Data de criação do cupom */
    createdAt: Date,
    /** Hash do produto, indica o nome */
    hash: string,
    /** Percentual de desconto do cupom */
    discount: number,
    /** Flag que indica se o cupom está disponível */
    isAvailable: boolean,
    /** Identificação do cupom */
    id: number
}

export default Coupon;