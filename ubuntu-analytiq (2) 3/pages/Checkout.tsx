import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PaymentMethod } from '../types';

interface LocationState {
  courseId: string;
  price: number;
  title: string;
}

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  
  const [method, setMethod] = useState<PaymentMethod>(PaymentMethod.MPESA);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Fallback if accessed directly without state
  const course = state || { title: 'Standard Consultancy', price: 5000, courseId: 'consult' };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      // In a real app, we'd wait for callback
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-brand-darker flex items-center justify-center p-4">
        <div className="bg-gray-900 border border-brand-primary rounded-xl p-8 max-w-md w-full text-center shadow-2xl">
          <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
          <p className="text-gray-400 mb-6">You have successfully enrolled in <strong className="text-brand-primary">{course.title}</strong>.</p>
          <div className="bg-gray-800 p-4 rounded text-left text-sm text-gray-300 mb-6">
            <p>Check your email/SMS for:</p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>Course access credentials</li>
              <li>Receipt</li>
              <li>Calendar invite</li>
            </ul>
          </div>
          <button onClick={() => navigate('/')} className="w-full bg-brand-primary text-black font-bold py-3 rounded-lg hover:bg-brand-accent transition-colors">
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-darker py-20 px-4">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        
        {/* Order Summary */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 h-fit">
          <h2 className="text-xl font-bold text-white mb-6 border-b border-gray-800 pb-4">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-gray-300">
              <span>Item</span>
              <span className="font-medium text-white">{course.title}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Subtotal</span>
              <span>KES {course.price.toLocaleString()}</span>
            </div>
            <div className="border-t border-gray-800 pt-4 flex justify-between text-xl font-bold text-brand-primary">
              <span>Total</span>
              <span>KES {course.price.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Payment Method</h2>
          
          <div className="flex space-x-4 mb-8">
            <button 
              onClick={() => setMethod(PaymentMethod.MPESA)}
              className={`flex-1 py-3 px-4 rounded-lg border flex items-center justify-center space-x-2 transition-all ${method === PaymentMethod.MPESA ? 'bg-green-600/20 border-green-500 text-white' : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'}`}
            >
              <span>M-Pesa</span>
            </button>
            <button 
              onClick={() => setMethod(PaymentMethod.GLOBAL)}
              className={`flex-1 py-3 px-4 rounded-lg border flex items-center justify-center space-x-2 transition-all ${method === PaymentMethod.GLOBAL ? 'bg-blue-600/20 border-blue-500 text-white' : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'}`}
            >
              <span>Global Pay</span>
            </button>
          </div>

          <form onSubmit={handlePayment}>
            {method === PaymentMethod.MPESA ? (
              <div className="mb-6">
                <label className="block text-gray-400 text-sm mb-2">M-Pesa Phone Number</label>
                <div className="relative">
                   <span className="absolute left-3 top-3 text-gray-500">+254</span>
                   <input 
                    type="tel" 
                    required
                    placeholder="712 345 678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-gray-800 text-white pl-14 pr-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-green-500"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">You will receive a prompt on your phone to complete payment.</p>
              </div>
            ) : (
               <div className="mb-6 bg-gray-800 p-4 rounded text-center text-gray-400 text-sm">
                 Redirecting to Stripe/PayPal secure gateway...
               </div>
            )}

            <button 
              type="submit" 
              disabled={isProcessing}
              className={`w-full font-bold py-3 rounded-lg transition-all ${isProcessing ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-brand-primary text-black hover:bg-brand-accent'}`}
            >
              {isProcessing ? 'Processing...' : `Pay KES ${course.price.toLocaleString()}`}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
