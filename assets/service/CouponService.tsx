const url: RequestInfo = "https://6206a65992dd6600171c0ba5.mockapi.io/bestdot/v1";

export const CouponService = {
    GetCouponByHash: async function(hash: string) {
        let init: RequestInit = { method: 'GET' }

        const response: Response = await fetch(`${url}/coupons?hash=${hash}&isAvailable=${true}`, init);
        const data: JSON = await response.json();

        return ({data, status: response.status}); 
    },
    UpdateCouponAvailability: async function(id: number, availability: boolean) {
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