import AsyncStorage from "@react-native-async-storage/async-storage";

import { CouponService } from "../service/CouponService";

import Coupon from "../model/Coupon";

/**
 * Controller que contém todos métodos referentes a cupom
 */
export const CouponController: any =  {
    /**
     * TryGetCoupon, método que, de acordo com a chance calculada com base nos pontos, sorteia um cupom aleatório disponível em mock api
     * @param { number } currentPoints pontuação atual após finalizar partida
     * @param { CallableFunction } SetLoading método que atualiza o estado do componente Loader na interface
     * @param { CallableFunction } SetGettedCoupon método que atualiza o estado do cupom obtido, ou da tentativa
     * @returns { Promise<void> } retorna uma promise para acessar o then() após executar a ação
     */
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
    },
    /**
     * GetCachedCoupon, método que obtém o cupom (quando ganho no minigame), e retorna o objeto serializado
     * @param { CallableFunction } SetCouponText método que atualiza o estado do texto que informa a hash do cupom
     * @returns { Promise<Coupon | undefined> } retorna uma promise, que ao ser acessada, disponibiliza o cupom através do método then()
     */
    GetCachedCoupon: async function(SetCouponText: CallableFunction): Promise<Coupon | undefined> {
        let data: string | null = await AsyncStorage.getItem("coupon");
        
        if(data) {
            let coupon: Coupon = JSON.parse(data);
            SetCouponText(coupon.hash);

            return coupon;
        }
    },
    /**
     * CheckCouponToInsert, método que verifica se o cupom pode ser utilizado ou não na tela do pedido
     * @param { string } couponText texto atual do cupom na tela
     * @param { CallableFunction } SetCoupon método que atualiza o estado do cupom a ser demonstrado em tela
     * @param { CallableFunction } SetModalIsVisible método que atualiza o estado de visibilidade do componente Modal
     * @param { CallableFunction } SetModalMessage método que atualiza o estado da mensagem do modal
     * @returns { Promise<void> } retorna uma promise para acessar o then() após executar a ação
     */
    CheckCouponToInsert: async function(couponText: string, SetCoupon: CallableFunction, SetModalIsVisible: CallableFunction, SetModalMessage: CallableFunction): Promise<void> {
        CouponService.GetCouponByHash(couponText).then((response: any): void => {
            let coupons: Coupon[] = response.data;

            if(coupons.length > 0 && coupons[0].isAvailable) {
                CouponService.UpdateCouponAvailability(coupons[0].id, false).then((response: any): void => {
                    let usedCoupon: Coupon = response.data;
                    SetCoupon(usedCoupon);
                });
            } else {
                SetModalIsVisible(true);
                SetModalMessage("Sorry... this coupon invalid or not found");
            }
        });
    },
    /**
     * SaveCoupon, método que salva o cupom obtido no sorteio a partir da ação do usuário, esse save é feito em AsyncStorage
     * @param { any } gettedCoupon cupom obtido no sorteio
     * @param { boolean } couponIsCopied flag que indica se o cupom foi copiado ou não
     * @param { CallableFunction } SetCouponIsCopied método que atualiza a flag da variável anterior
     */
    SaveCoupon: function(gettedCoupon: any, couponIsCopied: boolean, SetCouponIsCopied: CallableFunction): void {
        if(couponIsCopied == false) {
            SetCouponIsCopied(true);
            let couponString: string = JSON.stringify(gettedCoupon.coupon);
            AsyncStorage.setItem("coupon", couponString);
        }
    }
}