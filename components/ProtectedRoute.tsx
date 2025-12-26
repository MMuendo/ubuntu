import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
}

/**
 * ProtectedRoute component - Wraps routes that require authentication
 * Redirects to login if not authenticated, stores intended destination
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
    const { user, profile, loading } = useAuth();
    const location = useLocation();

    // Show loading spinner while checking auth
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-brand-dark">
                <div className="text-center">
                    <LoadingSpinner />
                    <p className="mt-4 text-gray-400">Checking authentication...</p>
                </div>
            </div>
        );
    }

    // Not authenticated - redirect to login
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Require admin but user is not admin
    if (requireAdmin && profile?.role !== 'admin') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-brand-dark">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
                    <p className="text-gray-400 mb-8">
                        You don't have permission to access this page.
                    </p>
                    <a
                        href="/"
                        className="px-6 py-3 bg-brand-cyan text-brand-dark font-semibold rounded-md hover:bg-brand-cyan/90 transition-all"
                    >
                        Go to Home
                    </a>
                </div>
            </div>
        );
    }

    // Authenticated and authorized - render children
    return <>{children}</>;
};

export default ProtectedRoute;
