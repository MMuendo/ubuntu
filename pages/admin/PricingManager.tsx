import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, DollarSign, Save, Plus, Trash2, Check, X } from 'lucide-react';
import { getCourses, updateCourse, createCourse, deleteCourse, getPlans, updatePlan, Course, Plan } from '../../services/adminService';
import LoadingSpinner from '../../components/LoadingSpinner';

const PricingManager: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState<string | null>(null);
    const [editingCourse, setEditingCourse] = useState<string | null>(null);
    const [editValues, setEditValues] = useState<Partial<Course>>({});
    const [showAddCourse, setShowAddCourse] = useState(false);
    const [newCourse, setNewCourse] = useState({
        id: '',
        title: '',
        description: '',
        price: 0,
        level: 'Beginner',
        duration: '1 month',
        tags: '',
    });
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [coursesData, plansData] = await Promise.all([
                getCourses(),
                getPlans()
            ]);
            setCourses(coursesData);
            setPlans(plansData);
        } catch (error) {
            console.error('Error loading data:', error);
        }
        setLoading(false);
    };

    const showMessage = (type: 'success' | 'error', text: string) => {
        setMessage({ type, text });
        setTimeout(() => setMessage(null), 3000);
    };

    const handleEditCourse = (course: Course) => {
        setEditingCourse(course.id);
        setEditValues({ price: course.price, title: course.title, description: course.description });
    };

    const handleSaveCourse = async (id: string) => {
        setSaving(id);
        const result = await updateCourse(id, editValues);
        if (result) {
            setCourses(courses.map(c => c.id === id ? { ...c, ...editValues } : c));
            showMessage('success', 'Course updated successfully');
        } else {
            showMessage('error', 'Failed to update course');
        }
        setEditingCourse(null);
        setEditValues({});
        setSaving(null);
    };

    const handleCancelEdit = () => {
        setEditingCourse(null);
        setEditValues({});
    };

    const handleAddCourse = async () => {
        if (!newCourse.id || !newCourse.title) {
            showMessage('error', 'Course ID and title are required');
            return;
        }

        setSaving('new');
        const result = await createCourse({
            id: newCourse.id,
            title: newCourse.title,
            description: newCourse.description,
            price: newCourse.price,
            currency: 'KES',
            level: newCourse.level,
            duration: newCourse.duration,
            tags: newCourse.tags.split(',').map(t => t.trim()).filter(Boolean),
            is_active: true,
        });

        if (result) {
            setCourses([...courses, result]);
            setShowAddCourse(false);
            setNewCourse({ id: '', title: '', description: '', price: 0, level: 'Beginner', duration: '1 month', tags: '' });
            showMessage('success', 'Course created successfully');
        } else {
            showMessage('error', 'Failed to create course');
        }
        setSaving(null);
    };

    const handleDeleteCourse = async (id: string) => {
        if (!confirm('Are you sure you want to delete this course?')) return;

        setSaving(id);
        const success = await deleteCourse(id);
        if (success) {
            setCourses(courses.filter(c => c.id !== id));
            showMessage('success', 'Course deleted');
        } else {
            showMessage('error', 'Failed to delete course');
        }
        setSaving(null);
    };

    const handleUpdatePlan = async (id: string, updates: Partial<Plan>) => {
        setSaving(id);
        const result = await updatePlan(id, updates);
        if (result) {
            setPlans(plans.map(p => p.id === id ? { ...p, ...updates } : p));
            showMessage('success', 'Plan updated successfully');
        } else {
            showMessage('error', 'Failed to update plan');
        }
        setSaving(null);
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link to="/admin" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>
                    <div className="flex items-center gap-3">
                        <DollarSign className="w-8 h-8 text-brand-cyan" />
                        <h1 className="text-3xl font-bold text-white">Pricing Manager</h1>
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

                {/* Courses Section */}
                <div className="bg-brand-surface border border-white/10 rounded-xl p-6 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-white">Courses</h2>
                        <button
                            onClick={() => setShowAddCourse(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-brand-cyan text-brand-dark rounded-lg font-medium hover:bg-cyan-300 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Add Course
                        </button>
                    </div>

                    {/* Add Course Form */}
                    {showAddCourse && (
                        <div className="bg-white/5 rounded-lg p-4 mb-6 border border-brand-cyan/30">
                            <h3 className="text-lg font-medium text-white mb-4">New Course</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <input
                                    type="text"
                                    placeholder="Course ID (e.g., my-new-course)"
                                    value={newCourse.id}
                                    onChange={(e) => setNewCourse({ ...newCourse, id: e.target.value })}
                                    className="bg-brand-dark border border-white/20 rounded-lg p-2 text-white"
                                />
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={newCourse.title}
                                    onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                                    className="bg-brand-dark border border-white/20 rounded-lg p-2 text-white"
                                />
                                <input
                                    type="number"
                                    placeholder="Price (KES)"
                                    value={newCourse.price}
                                    onChange={(e) => setNewCourse({ ...newCourse, price: parseInt(e.target.value) || 0 })}
                                    className="bg-brand-dark border border-white/20 rounded-lg p-2 text-white"
                                />
                                <select
                                    value={newCourse.level}
                                    onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value })}
                                    className="bg-brand-dark border border-white/20 rounded-lg p-2 text-white"
                                >
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            </div>
                            <textarea
                                placeholder="Description"
                                value={newCourse.description}
                                onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                                className="w-full bg-brand-dark border border-white/20 rounded-lg p-2 text-white mb-4"
                                rows={2}
                            />
                            <input
                                type="text"
                                placeholder="Tags (comma-separated)"
                                value={newCourse.tags}
                                onChange={(e) => setNewCourse({ ...newCourse, tags: e.target.value })}
                                className="w-full bg-brand-dark border border-white/20 rounded-lg p-2 text-white mb-4"
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={handleAddCourse}
                                    disabled={saving === 'new'}
                                    className="px-4 py-2 bg-brand-cyan text-brand-dark rounded-lg font-medium hover:bg-cyan-300 disabled:opacity-50"
                                >
                                    {saving === 'new' ? <LoadingSpinner size="sm" /> : 'Create Course'}
                                </button>
                                <button
                                    onClick={() => setShowAddCourse(false)}
                                    className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Courses Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Course</th>
                                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Level</th>
                                    <th className="text-right py-3 px-4 text-gray-400 font-medium">Price (KES)</th>
                                    <th className="text-center py-3 px-4 text-gray-400 font-medium">Status</th>
                                    <th className="text-right py-3 px-4 text-gray-400 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map((course) => (
                                    <tr key={course.id} className="border-b border-white/5 hover:bg-white/5">
                                        <td className="py-4 px-4">
                                            {editingCourse === course.id ? (
                                                <input
                                                    type="text"
                                                    value={editValues.title || ''}
                                                    onChange={(e) => setEditValues({ ...editValues, title: e.target.value })}
                                                    className="bg-brand-dark border border-white/20 rounded px-2 py-1 text-white w-full"
                                                />
                                            ) : (
                                                <div>
                                                    <div className="text-white font-medium">{course.title}</div>
                                                    <div className="text-xs text-gray-500">{course.id}</div>
                                                </div>
                                            )}
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="text-gray-300">{course.level}</span>
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            {editingCourse === course.id ? (
                                                <input
                                                    type="number"
                                                    value={editValues.price || 0}
                                                    onChange={(e) => setEditValues({ ...editValues, price: parseInt(e.target.value) || 0 })}
                                                    className="bg-brand-dark border border-white/20 rounded px-2 py-1 text-white w-24 text-right"
                                                />
                                            ) : (
                                                <span className="text-brand-cyan font-semibold">{course.price.toLocaleString()}</span>
                                            )}
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            <span className={`px-2 py-1 rounded text-xs ${course.is_active ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                                                }`}>
                                                {course.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            {editingCourse === course.id ? (
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleSaveCourse(course.id)}
                                                        disabled={saving === course.id}
                                                        className="p-2 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30"
                                                    >
                                                        {saving === course.id ? <LoadingSpinner size="sm" /> : <Check className="w-4 h-4" />}
                                                    </button>
                                                    <button
                                                        onClick={handleCancelEdit}
                                                        className="p-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleEditCourse(course)}
                                                        className="px-3 py-1 bg-white/10 text-white rounded hover:bg-white/20 text-sm"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteCourse(course.id)}
                                                        disabled={saving === course.id}
                                                        className="p-2 text-red-400 hover:bg-red-500/20 rounded"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Plans Section */}
                <div className="bg-brand-surface border border-white/10 rounded-xl p-6">
                    <h2 className="text-xl font-semibold text-white mb-6">Assessment Plans</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {plans.map((plan) => (
                            <div key={plan.id} className="bg-white/5 rounded-lg p-6 border border-white/10">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-medium text-white">{plan.name}</h3>
                                    <span className={`px-2 py-1 rounded text-xs ${plan.plan_type === 'advanced' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'
                                        }`}>
                                        {plan.plan_type}
                                    </span>
                                </div>
                                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400">Price (KES)</span>
                                        <input
                                            type="number"
                                            value={plan.price}
                                            onChange={(e) => handleUpdatePlan(plan.id, { price: parseInt(e.target.value) || 0 })}
                                            className="bg-brand-dark border border-white/20 rounded px-2 py-1 text-white w-24 text-right"
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400">Score Threshold</span>
                                        <input
                                            type="number"
                                            value={plan.threshold_score}
                                            onChange={(e) => handleUpdatePlan(plan.id, { threshold_score: parseInt(e.target.value) || 0 })}
                                            className="bg-brand-dark border border-white/20 rounded px-2 py-1 text-white w-24 text-right"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PricingManager;
