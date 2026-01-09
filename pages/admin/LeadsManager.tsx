import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Search, Download, Filter } from 'lucide-react';
import { getLeads, updateLeadStatus, exportLeadsCSV, Lead } from '../../services/adminService';
import LoadingSpinner from '../../components/LoadingSpinner';

const LeadsManager: React.FC = () => {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [sourceFilter, setSourceFilter] = useState('');
    const [page, setPage] = useState(0);
    const pageSize = 20;

    useEffect(() => {
        loadLeads();
    }, [search, statusFilter, sourceFilter, page]);

    const loadLeads = async () => {
        setLoading(true);
        try {
            const result = await getLeads({
                search: search || undefined,
                status: statusFilter || undefined,
                source: sourceFilter || undefined,
                limit: pageSize,
                offset: page * pageSize,
            });
            setLeads(result.leads);
            setTotal(result.total);
        } catch (error) {
            console.error('Error loading leads:', error);
        }
        setLoading(false);
    };

    const handleStatusChange = async (id: string, newStatus: string) => {
        const success = await updateLeadStatus(id, newStatus);
        if (success) {
            setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
        }
    };

    const handleExport = async () => {
        const csv = await exportLeadsCSV();
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `leads-export-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const statusColors: Record<string, string> = {
        new: 'bg-blue-500/20 text-blue-400',
        contacted: 'bg-yellow-500/20 text-yellow-400',
        converted: 'bg-green-500/20 text-green-400',
        lost: 'bg-red-500/20 text-red-400',
    };

    return (
        <div className="min-h-screen pt-20 pb-12 bg-brand-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link to="/admin" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Users className="w-8 h-8 text-brand-cyan" />
                            <h1 className="text-3xl font-bold text-white">Leads Manager</h1>
                        </div>
                        <button
                            onClick={handleExport}
                            className="flex items-center gap-2 px-4 py-2 bg-brand-cyan text-brand-dark rounded-lg font-medium hover:bg-cyan-300 transition-colors"
                        >
                            <Download className="w-4 h-4" />
                            Export CSV
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-brand-surface border border-white/10 rounded-xl p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by email..."
                                value={search}
                                onChange={(e) => { setSearch(e.target.value); setPage(0); }}
                                className="w-full bg-brand-dark border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white"
                            />
                        </div>
                        <div className="flex gap-2">
                            <select
                                value={statusFilter}
                                onChange={(e) => { setStatusFilter(e.target.value); setPage(0); }}
                                className="bg-brand-dark border border-white/20 rounded-lg px-4 py-2 text-white"
                            >
                                <option value="">All Status</option>
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="converted">Converted</option>
                                <option value="lost">Lost</option>
                            </select>
                            <select
                                value={sourceFilter}
                                onChange={(e) => { setSourceFilter(e.target.value); setPage(0); }}
                                className="bg-brand-dark border border-white/20 rounded-lg px-4 py-2 text-white"
                            >
                                <option value="">All Sources</option>
                                <option value="assessment">Assessment</option>
                                <option value="checkout">Checkout</option>
                                <option value="contact">Contact</option>
                                <option value="chat">Chat</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4 text-gray-400 text-sm">
                    <span>Showing {leads.length} of {total} leads</span>
                    <div className="flex items-center gap-1">
                        <Filter className="w-4 h-4" />
                        <span>Page {page + 1} of {Math.ceil(total / pageSize) || 1}</span>
                    </div>
                </div>

                {/* Leads Table */}
                <div className="bg-brand-surface border border-white/10 rounded-xl overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <LoadingSpinner size="lg" />
                        </div>
                    ) : leads.length === 0 ? (
                        <div className="text-center py-20 text-gray-400">
                            No leads found
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/10 bg-white/5">
                                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Email</th>
                                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Source</th>
                                        <th className="text-center py-3 px-4 text-gray-400 font-medium">Score</th>
                                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Plan</th>
                                        <th className="text-center py-3 px-4 text-gray-400 font-medium">Status</th>
                                        <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leads.map((lead) => (
                                        <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5">
                                            <td className="py-4 px-4 text-white">{lead.email}</td>
                                            <td className="py-4 px-4">
                                                <span className="px-2 py-1 rounded text-xs bg-white/10 text-gray-300 capitalize">
                                                    {lead.source}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-center">
                                                {lead.assessment_score !== null && lead.assessment_score !== undefined ? (
                                                    <span className={`font-medium ${lead.assessment_score >= 70 ? 'text-green-400' : 'text-yellow-400'
                                                        }`}>
                                                        {lead.assessment_score}%
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-500">-</span>
                                                )}
                                            </td>
                                            <td className="py-4 px-4 text-gray-300 text-sm">
                                                {lead.recommended_plan || '-'}
                                            </td>
                                            <td className="py-4 px-4 text-center">
                                                <select
                                                    value={lead.status}
                                                    onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                                                    className={`px-2 py-1 rounded text-xs font-medium border-0 cursor-pointer ${statusColors[lead.status] || 'bg-gray-500/20 text-gray-400'}`}
                                                >
                                                    <option value="new">New</option>
                                                    <option value="contacted">Contacted</option>
                                                    <option value="converted">Converted</option>
                                                    <option value="lost">Lost</option>
                                                </select>
                                            </td>
                                            <td className="py-4 px-4 text-gray-400 text-sm">
                                                {new Date(lead.created_at).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Pagination */}
                    {total > pageSize && (
                        <div className="flex items-center justify-center gap-2 p-4 border-t border-white/10">
                            <button
                                onClick={() => setPage(Math.max(0, page - 1))}
                                disabled={page === 0}
                                className="px-3 py-1 bg-white/10 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            <span className="text-gray-400 mx-4">
                                Page {page + 1} of {Math.ceil(total / pageSize)}
                            </span>
                            <button
                                onClick={() => setPage(page + 1)}
                                disabled={(page + 1) * pageSize >= total}
                                className="px-3 py-1 bg-white/10 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LeadsManager;
