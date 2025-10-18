
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // in cents
  imageUrl: string;
}

export type PaymentStatus = 'idle' | 'processing' | 'success' | 'error';

export interface YocoPaymentResult {
  success: boolean;
  chargeId?: string;
  errorMessage?: string;
}

// --- Yoco SDK Type Definitions ---
// These types define the structure of the Yoco SDK for TypeScript.

interface YocoPopupOptions {
  checkoutId: string;
  amount: number;
  currency: string;
  productName: string;
  productDescription: string;
}

interface YocoPopupResult {
  result: 'SUCCESSFUL' | 'FAILED' | 'CANCELLED';
  chargeId?: string;
  errorCode?: string;
  errorMessage?: string;
}

interface YocoSDKInstance {
  showPopup: (options: YocoPopupOptions, callback: (result: YocoPopupResult) => void) => void;
}

interface YocoSDKConstructor {
  new (options: { publicKey: string }): YocoSDKInstance;
}

// Extend the global Window interface to include the YocoSDK
declare global {
  interface Window {
    YocoSDK: YocoSDKConstructor;
  }
}
