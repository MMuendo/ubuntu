import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark px-4">
        <div className="text-center">
            <h1 className="text-9xl font-bold text-brand-cyan mb-4">404</h1>
            <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Sorry, the page you're looking for doesn't exist or has been moved.
            </p>
            <Link
                to="/"
                className="px-8 py-3 bg-brand-cyan text-brand-dark font-bold rounded-full hover:bg-cyan-300 inline-block"
            >
                Return Home
            </Link>
        </div>
    </div>
);

export default NotFoundPage;
