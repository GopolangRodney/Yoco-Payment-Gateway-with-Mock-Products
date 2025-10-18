
import React from 'react';
import { Product } from '../types';
import { LoadingSpinnerIcon } from './IconComponents';

interface ProductCardProps {
  product: Product;
  onBuy: (product: Product) => void;
  isProcessing: boolean;
  isDisabled: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onBuy, isProcessing, isDisabled }) => {
  const formatPrice = (priceInCents: number) => {
    const rands = priceInCents / 100;
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
    }).format(rands);
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105 ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <img className="w-full h-56 object-cover" src={product.imageUrl} alt={product.name} />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4 h-20">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">{formatPrice(product.price)}</span>
          <button
            onClick={() => onBuy(product)}
            disabled={isProcessing || isDisabled}
            className="flex items-center justify-center bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-wait transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {isProcessing ? (
                <>
                    <LoadingSpinnerIcon />
                    Processing...
                </>
            ) : (
                'Buy Now'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
