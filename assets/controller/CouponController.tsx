import { CouponService } from "../service/CouponService";

import Coupon from "../model/Coupon";

export const CouponController: any =  {
    TryGetCoupon: async function(currentPoints: number, SetLoading: CallableFunction, SetGettedCoupon: CallableFunction): Promise<void> {
        let luckNumber: number = currentPoints + (currentPoints / 2);
        let random: number = Math.random() * 100;

        SetLoading(true);
        if(random <= luckNumber) {
            CouponService.GetCoupons(true).then((response: any): void => {
                let coupons: Coupon[] = response.data;

                if(coupons.length > 0) {
                    let couponIndex: number = Math.floor(Math.random() * coupons.length);
                    SetGettedCoupon({ coupon: coupons[couponIndex], state: 'found' });
                } else {
                    SetGettedCoupon({ coupon: null, state: 'not-found' });
                }
            }).then((): void =>  SetLoading(false));
        } else {
            SetLoading(false);
            SetGettedCoupon({ coupon: null, state: 'not-found' });
        }
    }
}