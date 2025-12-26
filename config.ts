// Environment configuration with validation

interface Config {
    // Gemini API
    geminiApiKey: string;

    // Supabase
    supabaseUrl: string;
    supabaseAnonKey: string;

    // Paystack Payment
    paystackPublicKey: string;

    // Application URLs
    appUrl: string;
    apiUrl: string;
}

function getEnvVar(key: string, required: boolean = true): string {
    const value = import.meta.env[key];

    if (required && !value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }

    return value || '';
}

export const config: Config = {
    geminiApiKey: getEnvVar('VITE_GEMINI_API_KEY', false) || import.meta.env.GEMINI_API_KEY || '',
    supabaseUrl: getEnvVar('VITE_SUPABASE_URL', false),
    supabaseAnonKey: getEnvVar('VITE_SUPABASE_ANON_KEY', false),
    paystackPublicKey: getEnvVar('VITE_PAYSTACK_PUBLIC_KEY', false) || 'pk_test_placeholder',
    appUrl: getEnvVar('VITE_APP_URL', false) || 'http://localhost:3000',
    apiUrl: getEnvVar('VITE_API_URL', false) || 'http://localhost:3000/api',
};

// Validate critical config on startup (only in development)
if (import.meta.env.DEV) {
    console.log('🔧 Config loaded:', {
        hasGeminiKey: !!config.geminiApiKey,
        hasSupabaseUrl: !!config.supabaseUrl,
        hasSupabaseKey: !!config.supabaseAnonKey,
        appUrl: config.appUrl,
    });
}

export default config;
