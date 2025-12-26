// Email validation utilities

export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const isDisposableEmail = (email: string): boolean => {
    // Common disposable email domains
    const disposableDomains = [
        'tempmail.com',
        'guerrillamail.com',
        '10minutemail.com',
        'throwaway.email',
        'mailinator.com',
        'trashmail.com',
    ];

    const domain = email.split('@')[1]?.toLowerCase();
    return disposableDomains.includes(domain);
};

export const validateEmail = (email: string): { valid: boolean; error?: string } => {
    if (!email) {
        return { valid: false, error: 'Email is required' };
    }

    if (!isValidEmail(email)) {
        return { valid: false, error: 'Please enter a valid email address' };
    }

    if (isDisposableEmail(email)) {
        return { valid: false, error: 'Please use a permanent email address' };
    }

    return { valid: true };
};

// Phone number validation for M-Pesa (Kenyan format)
export const formatPhoneNumber = (phone: string): string => {
    // Remove all non-digits
    const digits = phone.replace(/\D/g, '');

    // Format as 07XX XXX XXX
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)}`;
};

export const validateKenyanPhone = (phone: string): { valid: boolean; error?: string } => {
    const digits = phone.replace(/\D/g, '');

    if (!digits) {
        return { valid: false, error: 'Phone number is required' };
    }

    // Kenyan mobile numbers start with 07 or +254 7
    if (digits.length === 10 && digits.startsWith('07')) {
        return { valid: true };
    }

    if (digits.length === 12 && digits.startsWith('2547')) {
        return { valid: true };
    }

    return { valid: false, error: 'Please enter a valid Kenyan mobile number (07XX XXX XXX)' };
};

// Card number validation using Luhn algorithm
export const formatCardNumber = (cardNumber: string): string => {
    const digits = cardNumber.replace(/\D/g, '');
    const groups = digits.match(/.{1,4}/g) || [];
    return groups.join(' ').substring(0, 19); // Max 16 digits with spaces
};

export const validateCardNumber = (cardNumber: string): { valid: boolean; error?: string } => {
    const digits = cardNumber.replace(/\D/g, '');

    if (!digits) {
        return { valid: false, error: 'Card number is required' };
    }

    if (digits.length < 13 || digits.length > 19) {
        return { valid: false, error: 'Card number must be 13-19 digits' };
    }

    // Luhn algorithm
    let sum = 0;
    let isEven = false;

    for (let i = digits.length - 1; i >= 0; i--) {
        let digit = parseInt(digits[i], 10);

        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        isEven = !isEven;
    }

    if (sum % 10 !== 0) {
        return { valid: false, error: 'Invalid card number' };
    }

    return { valid: true };
};

// Card expiry validation
export const formatCardExpiry = (expiry: string): string => {
    const digits = expiry.replace(/\D/g, '');
    if (digits.length >= 2) {
        return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }
    return digits;
};

export const validateCardExpiry = (expiry: string): { valid: boolean; error?: string } => {
    const digits = expiry.replace(/\D/g, '');

    if (!digits || digits.length < 4) {
        return { valid: false, error: 'Expiry date is required (MM/YY)' };
    }

    const month = parseInt(digits.slice(0, 2), 10);
    const year = parseInt(digits.slice(2, 4), 10);

    if (month < 1 || month > 12) {
        return { valid: false, error: 'Invalid month' };
    }

    // Check if card is expired
    const now = new Date();
    const currentYear = now.getFullYear() % 100; // Last 2 digits
    const currentMonth = now.getMonth() + 1;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
        return { valid: false, error: 'Card has expired' };
    }

    return { valid: true };
};

// CVV validation
export const validateCVV = (cvv: string): { valid: boolean; error?: string } => {
    const digits = cvv.replace(/\D/g, '');

    if (!digits) {
        return { valid: false, error: 'CVV is required' };
    }

    if (digits.length < 3 || digits.length > 4) {
        return { valid: false, error: 'CVV must be 3-4 digits' };
    }

    return { valid: true };
};
