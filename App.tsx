
import React, { useState } from 'react';
import { Product, PaymentStatus } from './types';
import { mockProducts } from './constants';
import { createCheckout } from './services/yocoService';
import { showYocoPopup } from './services/yoco';

import Header from './components/Header';
import ProductCard from './components/ProductCard';
import PaymentStatusModal from './components/PaymentStatusModal';
import Footer from './components/Footer';

// IMPORTANT: Replace with your actual Yoco Public Key
const YOCO_PUBLIC_KEY = 'pk_test_34b79bf18f43D116aB7A';

const App: React.FC = () => {
  const [products] = useState<Product[]>(mockProducts);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [processingProductId, setProcessingProductId] = useState<string | null>(null);

  const handleBuyNow = async (product: Product) => {
    if (processingProductId) return; // Prevent multiple payments

    setProcessingProductId(product.id);
    setPaymentStatus('processing');
    
    try {
      // 1. Simulate backend call to create a checkout and get a checkoutId
      const checkoutResponse = await createCheckout(product.price, 'ZAR');
      const checkoutId = checkoutResponse.checkoutId;

      if (!checkoutId) {
        throw new Error('Failed to create checkout.');
      }
      
      // 2. Show the Yoco Popup using the checkoutId
      const result = await showYocoPopup({
        publicKey: YOCO_PUBLIC_KEY,
        checkoutId: checkoutId,
        amount: product.price,
        currency: 'ZAR',
        productName: product.name,
        productDescription: product.description,
      });

      // 3. Handle the payment result
      if (result.success) {
        console.log('Payment Successful!', { chargeId: result.chargeId });
        setPaymentStatus('success');
      } else {
        console.error('Payment Failed or Canceled:', result.errorMessage);
        setPaymentStatus('error');
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      setPaymentStatus('error');
    } finally {
      setIsModalOpen(true);
      setProcessingProductId(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Reset status after a short delay to allow modal to fade out
    setTimeout(() => {
      if (paymentStatus !== 'processing') {
          setPaymentStatus('idle');
      }
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Our Premium Products</h1>
          <p className="mt-2 text-lg text-gray-500">Select a product to purchase securely with Yoco.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onBuy={handleBuyNow}
              isProcessing={processingProductId === product.id}
              isDisabled={processingProductId !== null && processingProductId !== product.id}
            />
          ))}
        </div>
      </main>
      <Footer />

      <PaymentStatusModal
        isOpen={isModalOpen}
        onClose={closeModal}
        status={paymentStatus}
      />
    </div>
  );
};

export default App;
