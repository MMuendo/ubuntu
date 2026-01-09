import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Settings, Save, RefreshCw } from 'lucide-react';
import { getSettings, updateSetting, SiteSetting } from '../../services/adminService';
import LoadingSpinner from '../../components/LoadingSpinner';

const SettingsManager: React.FC = () => {
    const [settings, setSettings] = useState<SiteSetting[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState<string | null>(null);
    const [editedValues, setEditedValues] = useState<Record<string, unknown>>({});
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        setLoading(true);
        try {
            const data = await getSettings();
            setSettings(data);
            // Initialize edited values
            const initialValues: Record<string, unknown> = {};
            data.forEach(s => {
                initialValues[s.key] = s.value?.value;
            });
            setEditedValues(initialValues);
        } catch (error) {
            console.error('Error loading settings:', error);
        }
        setLoading(false);
    };

    const showMessage = (type: 'success' | 'error', text: string) => {
        setMessage({ type, text });
        setTimeout(() => setMessage(null), 3000);
    };

    const handleSave = async (key: string) => {
        setSaving(key);
        const success = await updateSetting(key, editedValues[key]);
        if (success) {
            showMessage('success', 'Setting updated successfully');
        } else {
            showMessage('error', 'Failed to update setting');
        }
        setSaving(null);
    };

    const renderSettingInput = (setting: SiteSetting) => {
        const value = editedValues[setting.key];
        const originalValue = setting.value?.value;

        // Detect type from value
        if (typeof originalValue === 'boolean') {
            return (
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setEditedValues({ ...editedValues, [setting.key]: !value })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? 'bg-brand-cyan' : 'bg-gray-600'
                            }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-1'
                                }`}
                        />
                    </button>
                    <span className="text-gray-400 text-sm">{value ? 'Enabled' : 'Disabled'}</span>
                </div>
            );
        }

        if (typeof originalValue === 'number') {
            return (
                <input
                    type="number"
                    value={value as number || 0}
                    onChange={(e) => setEditedValues({ ...editedValues, [setting.key]: parseInt(e.target.value) || 0 })}
                    className="bg-brand-dark border border-white/20 rounded-lg px-3 py-2 text-white w-32"
                />
            );
        }

        return (
            <input
                type="text"
                value={value as string || ''}
                onChange={(e) => setEditedValues({ ...editedValues, [setting.key]: e.target.value })}
                className="bg-brand-dark border border-white/20 rounded-lg px-3 py-2 text-white flex-1"
            />
        );
    };

    const groupedSettings = settings.reduce((acc, setting) => {
        const category = setting.category || 'general';
        if (!acc[category]) acc[category] = [];
        acc[category].push(setting);
        return acc;
    }, {} as Record<string, SiteSetting[]>);

    const categoryLabels: Record<string, string> = {
        assessment: 'Assessment Settings',
        contact: 'Contact Information',
        payment: 'Payment Settings',
        general: 'General Settings',
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center bg-brand-dark">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 pb-12 bg-brand-dark">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link to="/admin" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Settings className="w-8 h-8 text-brand-cyan" />
                            <h1 className="text-3xl font-bold text-white">System Settings</h1>
                        </div>
                        <button
                            onClick={loadSettings}
                            className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Toast Message */}
                {message && (
                    <div className={`fixed top-24 right-4 z-50 px-4 py-3 rounded-lg ${message.type === 'success' ? 'bg-green-500/20 border border-green-500 text-green-400' :
                            'bg-red-500/20 border border-red-500 text-red-400'
                        }`}>
                        {message.text}
                    </div>
                )}

                {/* Settings by Category */}
                {Object.entries(groupedSettings).map(([category, categorySettings]) => (
                    <div key={category} className="bg-brand-surface border border-white/10 rounded-xl p-6 mb-6">
                        <h2 className="text-xl font-semibold text-white mb-6">
                            {categoryLabels[category] || category}
                        </h2>
                        <div className="space-y-6">
                            {categorySettings.map((setting) => {
                                const hasChanges = editedValues[setting.key] !== setting.value?.value;
                                return (
                                    <div key={setting.key} className="border-b border-white/5 pb-6 last:border-0 last:pb-0">
                                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                                            <div className="flex-1">
                                                <label className="block text-white font-medium mb-1">
                                                    {setting.key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                                </label>
                                                {setting.description && (
                                                    <p className="text-gray-400 text-sm mb-2">{setting.description}</p>
                                                )}
                                                {renderSettingInput(setting)}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {hasChanges && (
                                                    <button
                                                        onClick={() => handleSave(setting.key)}
                                                        disabled={saving === setting.key}
                                                        className="flex items-center gap-2 px-4 py-2 bg-brand-cyan text-brand-dark rounded-lg font-medium hover:bg-cyan-300 disabled:opacity-50"
                                                    >
                                                        {saving === setting.key ? (
                                                            <LoadingSpinner size="sm" />
                                                        ) : (
                                                            <>
                                                                <Save className="w-4 h-4" />
                                                                Save
                                                            </>
                                                        )}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {/* No Settings Message */}
                {settings.length === 0 && (
                    <div className="bg-brand-surface border border-white/10 rounded-xl p-12 text-center">
                        <Settings className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                        <p className="text-gray-400">No settings found. Run the database migration to create default settings.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SettingsManager;
