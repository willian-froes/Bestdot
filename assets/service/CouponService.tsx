/** Url que disponibiliza a mock API de cupons */
const url: RequestInfo = "https://6206a65992dd6600171c0ba5.mockapi.io/bestdot/v1";

/**
 * Service que contém consumo de api relacionado a cupom
 */
export const CouponService = {
    /**
     * GetCoupons, método que realiza uma requisição do tipo GET para obter todos cupons de acordo com a flag que indica a disponibilidade
     * @param { boolean } availability disponibilidade do cupom
     * @returns { Promise<any> } retorna uma promise, que ao ser acessada, fornece um objeto que contém o status e a lista de cupons
     */
    GetCoupons: async function(availability: boolean): Promise<any> {
        let init: RequestInit = { method: 'GET' }

        const response: Response = await fetch(`${url}/coupons?isAvailable=${availability}`, init);
        const data: JSON = await response.json();

        return ({data, status: response.status}); 
    },
    /**
     * GetCouponByHash, método que realiza uma requisição do tipo GET para obter um cupom disponível de acordo com a hash informada
     * @param { string } hash hash que representa o nome do cupom
     * @returns { Promise<any> } retorna uma promise, que ao ser acessada, fornece um objeto que contém um cupom disponível
     */
    GetCouponByHash: async function(hash: string): Promise<any>  {
        let init: RequestInit = { method: 'GET' }

        const response: Response = await fetch(`${url}/coupons?hash=${hash}&isAvailable=${true}`, init);
        const data: JSON = await response.json();

        return ({data, status: response.status}); 
    },
    /**
     * UpdateCouponAvailability, método que realiza uma requisição do tipo PUT para altera a disponibilidade de um cupom
     * @param { number } id id do cupom
     * @param { boolean } availability disponibilidade a ser atualizada
     * @returns { Promise<any> } retorna uma promise, que ao ser acessada, fornece um objeto que contém um cupom modificado
     */
    UpdateCouponAvailability: async function(id: number, availability: boolean): Promise<any>  {
        let init: RequestInit = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                "isAvailable": availability 
            })
        }

        const response: Response = await fetch(`${url}/coupons/${id}`, init);
        const data: JSON = await response.json();

        return ({data, status: response.status});  
    }
}