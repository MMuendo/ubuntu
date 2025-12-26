import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, AlertCircle, CheckCircle, Key } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const ResetPasswordPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isResetMode, setIsResetMode] = useState(false);

    const { resetPassword, updatePassword } = useAuth();
    const navigate = useNavigate();

    // Check if we're in password update mode (coming from email link)
    useEffect(() => {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const type = hashParams.get('type');

        if (type === 'recovery') {
            setIsResetMode(true);
        }
    }, []);

    const handleRequestReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        setIsLoading(true);

        try {
            await resetPassword(email);
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || 'Failed to send reset email. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (newPassword.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        setIsLoading(true);

        try {
            await updatePassword(newPassword);
            setSuccess(true);

            // Redirect to login after 2 seconds
            setTimeout(() => {
                navigate('/login', {
                    state: { message: 'Password updated successfully! Please sign in.' }
                });
            }, 2000);
        } catch (err: any) {
            setError(err.message || 'Failed to update password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-brand-dark py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <Link to="/" className="inline-block">
                        <h1 className="text-3xl font-bold text-white">
                            Ubuntu <span className="text-brand-cyan">AnalytIQ</span>
                        </h1>
                    </Link>
                    <h2 className="mt-6 text-2xl font-semibold text-white">
                        {isResetMode ? 'Set new password' : 'Reset your password'}
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        {isResetMode
                            ? 'Enter your new password below'
                            : 'We\'ll send you a link to reset your password'
                        }
                    </p>
                </div>

                {/* Form */}
                <div className="bg-brand-surface border border-white/10 rounded-lg p-8">
                    {!isResetMode ? (
                        // Request Reset Form
                        <form onSubmit={handleRequestReset} className="space-y-6">
                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/50 rounded-md p-4 flex items-start gap-3">
                                    <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-red-200">{error}</p>
                                </div>
                            )}

                            {/* Success Message */}
                            {success && (
                                <div className="bg-green-500/10 border border-green-500/50 rounded-md p-4">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                                        <div className="text-sm text-green-200">
                                            <p className="font-medium">Check your email!</p>
                                            <p className="mt-1">
                                                We've sent a password reset link to <strong>{email}</strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 bg-brand-dark border border-white/10 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent transition-all"
                                    placeholder="you@example.com"
                                    disabled={success}
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading || success}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-brand-cyan text-brand-dark font-semibold rounded-md hover:bg-brand-cyan/90 focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:ring-offset-2 focus:ring-offset-brand-surface transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="h-5 w-5 border-2 border-brand-dark border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Mail className="h-5 w-5" />
                                        Send reset link
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        // Update Password Form
                        <form onSubmit={handleUpdatePassword} className="space-y-6">
                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/50 rounded-md p-4 flex items-start gap-3">
                                    <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-red-200">{error}</p>
                                </div>
                            )}

                            {/* Success Message */}
                            {success && (
                                <div className="bg-green-500/10 border border-green-500/50 rounded-md p-4 flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                                    <p className="text-sm text-green-200">
                                        Password updated! Redirecting to login...
                                    </p>
                                </div>
                            )}

                            {/* New Password Field */}
                            <div>
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-200 mb-2">
                                    New Password
                                </label>
                                <input
                                    id="newPassword"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-4 py-3 bg-brand-dark border border-white/10 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                />
                            </div>

                            {/* Confirm Password Field */}
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200 mb-2">
                                    Confirm New Password
                                </label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-3 bg-brand-dark border border-white/10 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent transition-all"
                                    placeholder="••••••••"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading || success}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-brand-cyan text-brand-dark font-semibold rounded-md hover:bg-brand-cyan/90 focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:ring-offset-2 focus:ring-offset-brand-surface transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="h-5 w-5 border-2 border-brand-dark border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Key className="h-5 w-5" />
                                        Update password
                                    </>
                                )}
                            </button>
                        </form>
                    )}

                    {/* Back to Login Link */}
                    <div className="mt-6 text-center">
                        <Link
                            to="/login"
                            className="text-sm text-brand-cyan hover:text-brand-cyan/80 transition-colors"
                        >
                            ← Back to login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
