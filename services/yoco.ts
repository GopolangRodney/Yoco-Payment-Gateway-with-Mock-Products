
import { YocoPaymentResult } from '../types';

interface YocoPopupParams {
  publicKey: string;
  checkoutId: string;
  amount: number;
  currency: string;
  productName: string;
  productDescription: string;
}

export const showYocoPopup = (params: YocoPopupParams): Promise<YocoPaymentResult> => {
  return new Promise((resolve) => {
    if (!window.YocoSDK) {
      console.error('Yoco SDK not loaded!');
      resolve({ success: false, errorMessage: 'Yoco SDK not available.' });
      return;
    }
    
    const yoco = new window.YocoSDK({
      publicKey: params.publicKey,
    });

    yoco.showPopup({
      checkoutId: params.checkoutId,
      amount: params.amount,
      currency: params.currency,
      productName: params.productName,
      productDescription: params.productDescription,
    }, (result) => {
        if (result.result === 'SUCCESSFUL') {
          resolve({ success: true, chargeId: result.chargeId });
        } else {
          resolve({ success: false, errorMessage: result.errorMessage || 'Payment was canceled or failed.' });
        }
    });
  });
};
