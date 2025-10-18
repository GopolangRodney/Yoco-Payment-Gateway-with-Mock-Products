
import React, { Fragment } from 'react';
import { PaymentStatus } from '../types';
import { CheckCircleIcon, XCircleIcon, LoadingSpinnerIcon } from './IconComponents';

interface PaymentStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: PaymentStatus;
}

const PaymentStatusModal: React.FC<PaymentStatusModalProps> = ({ isOpen, onClose, status }) => {
  if (!isOpen) return null;

  const content = {
    success: {
      icon: <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto" />,
      title: 'Payment Successful!',
      message: 'Thank you for your purchase. Your order is being processed.',
      buttonClass: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
    },
    error: {
      icon: <XCircleIcon className="w-16 h-16 text-red-500 mx-auto" />,
      title: 'Payment Failed',
      message: 'There was a problem with your payment. Please try again or contact support.',
      buttonClass: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
    },
    processing: {
      icon: <LoadingSpinnerIcon className="w-16 h-16 text-blue-500 mx-auto" />,
      title: 'Processing Payment',
      message: 'Please wait while we process your payment...',
      buttonClass: 'bg-gray-400 cursor-not-allowed',
    },
    idle: { // Fallback, should not typically be shown
        icon: null,
        title: 'Status',
        message: 'Awaiting payment status.',
        buttonClass: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500',
    }
  };

  const currentContent = content[status];
  
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 transition-opacity duration-300"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto text-center p-6 md:p-8 transform transition-all scale-100 opacity-100">
        <div className="mb-4">
            {currentContent.icon}
        </div>
        <h3 id="modal-title" className="text-2xl font-bold text-gray-900 mb-2">{currentContent.title}</h3>
        <p className="text-gray-600 mb-6">{currentContent.message}</p>
        {status !== 'processing' && (
             <button
                onClick={onClose}
                className={`w-full sm:w-auto inline-block px-8 py-3 text-lg font-semibold text-white rounded-lg shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${currentContent.buttonClass}`}
            >
             Close
            </button>
        )}
      </div>
    </div>
  );
};

export default PaymentStatusModal;
