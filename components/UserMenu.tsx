import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const UserMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const { user, profile, signOut } = useAuth();
    const navigate = useNavigate();

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut();
            navigate('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    if (!user) return null;

    // Get display name or email
    const displayName = profile?.full_name || user.email?.split('@')[0] || 'User';
    const userEmail = user.email || '';

    // Get initials for avatar
    const initials = profile?.full_name
        ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : displayName.slice(0, 2).toUpperCase();

    return (
        <div className="relative" ref={menuRef}>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10 transition-colors"
            >
                {/* Avatar */}
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-cyan text-brand-dark font-semibold text-sm">
                    {initials}
                </div>

                {/* Name (hidden on mobile) */}
                <span className="hidden md:block text-sm font-medium text-white">
                    {displayName}
                </span>

                {/* Chevron */}
                <ChevronDown
                    className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                        }`}
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-brand-surface border border-white/10 rounded-lg shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-sm font-medium text-white truncate">
                            {displayName}
                        </p>
                        <p className="text-xs text-gray-400 truncate mt-1">
                            {userEmail}
                        </p>
                        {profile?.role === 'admin' && (
                            <span className="inline-block mt-2 px-2 py-0.5 text-xs font-semibold bg-brand-cyan/20 text-brand-cyan rounded">
                                Admin
                            </span>
                        )}
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                        <Link
                            to="/dashboard"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                        >
                            <User className="h-4 w-4" />
                            Dashboard
                        </Link>

                        {/* Admin Portal Link */}
                        {profile?.role === 'admin' && (
                            <Link
                                to="/admin"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-4 py-2 text-sm text-brand-cyan hover:bg-brand-cyan/10 transition-colors"
                            >
                                <Settings className="h-4 w-4" />
                                Admin Portal
                            </Link>
                        )}

                        <Link
                            to="/dashboard/settings"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                        >
                            <Settings className="h-4 w-4" />
                            Settings
                        </Link>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-white/10 py-2">
                        <button
                            onClick={handleSignOut}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors w-full"
                        >
                            <LogOut className="h-4 w-4" />
                            Sign out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
