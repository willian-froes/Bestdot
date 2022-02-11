const url: RequestInfo = "https://6206a65992dd6600171c0ba5.mockapi.io/bestdot/v1";

export const CouponService = {
    GetCouponByHash: async function(hash: string) {
        let init: RequestInit = {
            method: 'GET'
        }

        const request = await fetch(`${url}/coupons?hash=${hash}&isAvailable=${true}`, init);
        const response = await request.json();

        return response;  
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

        const request = await fetch(`${url}/coupons/${id}`, init);
        const response = await request.json();

        return response; 
    }
}