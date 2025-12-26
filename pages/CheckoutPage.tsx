import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CreditCard, Loader } from 'lucide-react';
import { initializePaystack, generateReference, toSmallestUnit, detectCurrency, formatAmount } from '../lib/paystack';
import { createPurchase } from '../lib/supabase';

const CheckoutPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Get course data from URL params
    const courseId = searchParams.get('courseId');
    const courseName = searchParams.get('courseName') || 'Selected Course';
    const coursePrice = parseInt(searchParams.get('coursePrice') || '0');
    const courseDescription = searchParams.get('courseDescription') || '';

    // Form state
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentError, setPaymentError] = useState('');

    if (!courseId || !coursePrice) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <button onClick={() => navigate('/')} className="text-brand-cyan hover:underline">Return Home</button>
            </div>
        );
    }

    const currency = detectCurrency(coursePrice);

    // Email validation
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handlePayment = () => {
        setEmailError('');
        setPaymentError('');

        // Validate email
        if (!email) {
            setEmailError('Email is required');
            return;
        }

        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            return;
        }

        setIsProcessing(true);

        // Initialize Paystack payment
        const reference = generateReference();

        initializePaystack({
            key: '', // Will be filled from config
            email: email,
            amount: toSmallestUnit(coursePrice),
            currency: currency,
            ref: reference,
            metadata: {
                courseName: courseName,
                courseId: courseId,
                custom_fields: [
                    {
                        display_name: 'Course',
                        variable_name: 'course_name',
                        value: courseName
                    }
                ]
            },
            onSuccess: async (response) => {
                console.log('Payment successful:', response);

                // Save purchase to Supabase
                try {
                    await createPurchase({
                        email: email,
                        productId: courseId!,
                        productName: courseName,
                        amount: coursePrice,
                        currency: currency,
                        paymentMethod: 'card',
                        transactionId: response.reference,
                    });
                    console.log('Purchase saved to database');
                } catch (error) {
                    console.error('Failed to save purchase:', error);
                    // Continue to success page even if database save fails
                }

                // Redirect to success page
                navigate(`/success?reference=${response.reference}&course=${encodeURIComponent(courseName)}`);
            },
            onCancel: () => {
                setIsProcessing(false);
                setPaymentError('Payment was cancelled. Please try again.');
            }
        });
    };

    return (
        <div className="min-h-screen pt-20 pb-12 px-4 bg-brand-dark">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Complete Your Enrollment
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Secure payment powered by Paystack
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Order Summary */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
                        <div className="bg-brand-surface border border-white/10 rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-white mb-2">{courseName}</h3>
                            <p className="text-gray-400 text-sm mb-6">{courseDescription}</p>
                            <div className="flex justify-between items-center border-t border-white/10 pt-4">
                                <span className="text-gray-400">Total</span>
                                <span className="text-2xl font-bold text-brand-cyan">
                                    {formatAmount(coursePrice, currency)}
                                </span>
                            </div>
                        </div>

                        {/* Security Badge */}
                        <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-green-300 font-medium text-sm">Secure Payment</p>
                                    <p className="text-green-400/70 text-xs">Protected by Paystack</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Form */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">Payment Details</h2>
                        <div className="bg-brand-surface border border-white/10 rounded-2xl p-8">
                            {paymentError && (
                                <div className="mb-6 bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-200">
                                    {paymentError}
                                </div>
                            )}

                            <div className="mb-6">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setEmailError('');
                                        setPaymentError('');
                                    }}
                                    placeholder="you@example.com"
                                    className={`w-full bg-brand-dark border ${emailError ? 'border-red-500' : 'border-white/20'} rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent`}
                                    disabled={isProcessing}
                                />
                                {emailError && (
                                    <p className="text-red-400 text-sm mt-2">{emailError}</p>
                                )}
                                <p className="text-gray-500 text-xs mt-2">
                                    Receipt and course access will be sent to this email
                                </p>
                            </div>

                            <button
                                onClick={handlePayment}
                                disabled={isProcessing}
                                className="w-full py-4 bg-brand-cyan text-brand-dark font-bold rounded-lg hover:bg-brand-cyan/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader className="w-5 h-5 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <CreditCard className="w-5 h-5" />
                                        Pay {formatAmount(coursePrice, currency)}
                                    </>
                                )}
                            </button>

                            <p className="text-xs text-center text-gray-500 mt-4">
                                By completing this purchase, you agree to our Terms of Service
                            </p>
                        </div>

                        {/* Payment Methods Info */}
                        <div className="mt-6 p-4 bg-brand-dark border border-white/10 rounded-lg">
                            <p className="text-sm text-gray-400 mb-2 font-medium">We accept:</p>
                            <div className="flex flex-wrap gap-2">
                                <span className="text-xs px-3 py-1 bg-white/10 rounded-full text-gray-300">Visa</span>
                                <span className="text-xs px-3 py-1 bg-white/10 rounded-full text-gray-300">Mastercard</span>
                                <span className="text-xs px-3 py-1 bg-white/10 rounded-full text-gray-300">M-Pesa</span>
                                <span className="text-xs px-3 py-1 bg-white/10 rounded-full text-gray-300">Bank Transfer</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back Button */}
                <div className="text-center mt-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-gray-400 hover:text-white transition-colors"
                        disabled={isProcessing}
                    >
                        ← Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
