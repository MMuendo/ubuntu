import config from '../config';

// Paystack Popup Types
interface PaystackPopupOptions {
    key: string;
    email: string;
    amount: number; // in kobo/cents (multiply by 100)
    currency: 'NGN' | 'GHS' | 'ZAR' | 'USD' | 'KES';
    ref: string; // unique transaction reference
    metadata?: {
        courseName?: string;
        courseId?: string;
        custom_fields?: Array<{
            display_name: string;
            variable_name: string;
            value: string;
        }>;
    };
    onSuccess: (response: PaystackResponse) => void;
    onCancel: () => void;
}

interface PaystackResponse {
    reference: string;
    status: string;
    transaction: string;
    message: string;
}

// Extend Window to include PaystackPop
declare global {
    interface Window {
        PaystackPop?: any;
    }
}

/**
 * Initialize Paystack payment popup
 */
export function initializePaystack(options: PaystackPopupOptions): void {
    // Load Paystack inline script if not already loaded
    if (!window.PaystackPop) {
        const script = document.createElement('script');
        script.src = 'https://js.paystack.co/v1/inline.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            openPaystackPopup(options);
        };
    } else {
        openPaystackPopup(options);
    }
}

function openPaystackPopup(options: PaystackPopupOptions): void {
    const handler = window.PaystackPop.setup({
        key: config.paystackPublicKey,
        email: options.email,
        amount: options.amount,
        currency: options.currency,
        ref: options.ref,
        metadata: options.metadata,
        callback: (response: PaystackResponse) => {
            options.onSuccess(response);
        },
        onClose: () => {
            options.onCancel();
        },
    });

    handler.openIframe();
}

/**
 * Generate unique transaction reference
 */
export function generateReference(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000000);
    return `UAIQ-${timestamp}-${random}`;
}

/**
 * Convert amount to smallest currency unit (kobo/cents)
 * Paystack requires amounts in the smallest unit (100 kobo = 1 NGN/KES)
 */
export function toSmallestUnit(amount: number): number {
    return Math.round(amount * 100);
}

/**
 * Detect currency based on amount or location
 * Default to KES for Kenya market
 */
export function detectCurrency(_amount: number): 'KES' | 'USD' {
    return 'KES';
}

/**
 * Format amount for display
 */
export function formatAmount(amount: number, currency: string): string {
    if (currency === 'KES') {
        return `KES ${amount.toLocaleString()}`;
    }
    return `$${amount.toLocaleString()}`;
}
