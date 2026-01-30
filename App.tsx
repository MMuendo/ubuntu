import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import ChatWidget from './components/ChatWidget';
import HomePage from './pages/HomePage';
import AssessmentPage from './pages/AssessmentPage';
import CheckoutPage from './pages/CheckoutPage';
import SuccessPage from './pages/SuccessPage';
import AgenticPage from './pages/AgenticPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AcademyPage from './pages/academy';
import ResetPasswordPage from './pages/ResetPasswordPage';
import DashboardPage from './pages/DashboardPage';
import EnrollmentOptionsPage from './pages/EnrollmentOptionsPage';
import ConsultationBookingPage from './pages/ConsultationBookingPage';
import ConsultationSuccessPage from './pages/ConsultationSuccessPage';
import NotFoundPage from './pages/NotFoundPage';
import ExcelCoursePage from './pages/excelcourse';
import PowerBICoursePage from './pages/powerbicourse';
import AIMasteryCoursePage from './pages/aimasterycourse';
import AIAgentsCoursePage from './pages/aiagentscourse';
import WebinarDetailsPage from './pages/webinardetails';
// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import PricingManager from './pages/admin/PricingManager';
import LeadsManager from './pages/admin/LeadsManager';
import SettingsManager from './pages/admin/SettingsManager';
import { Product, Course } from './types';

const App: React.FC = () => {
    const navigate = useNavigate();

    return (
        <AuthProvider>
            <Routes>
                {/* Auth Routes (without Layout) */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />

                {/* Protected Routes */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <DashboardPage />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route path="/academy" element={<AcademyPage />} />

                {/* Dynamic Course Route wrapped in Layout */}
                <Route
                    path="/course/:id"
                    element={
                        <Layout>
                            <CourseDetail />
                        </Layout>
                    }
                />
                
                {/* Admin Routes - Protected with requireAdmin */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute requireAdmin>
                            <Layout>
                                <AdminDashboard />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/pricing"
                    element={
                        <ProtectedRoute requireAdmin>
                            <Layout>
                                <PricingManager />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/leads"
                    element={
                        <ProtectedRoute requireAdmin>
                            <Layout>
                                <LeadsManager />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/settings"
                    element={
                        <ProtectedRoute requireAdmin>
                            <Layout>
                                <SettingsManager />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                {/* Consultation & Enrollment Routes */}
                <Route
                    path="/enroll"
                    element={
                        <Layout>
                            <EnrollmentOptionsPage />
                        </Layout>
                    }
                />
                <Route
                    path="/consultation"
                    element={
                        <Layout>
                            <ConsultationBookingPage />
                        </Layout>
                    }
                />
                <Route
                    path="/consultation/success"
                    element={
                        <Layout>
                            <ConsultationSuccessPage />
                        </Layout>
                    }
                />

                {/* Public Routes (with Layout) */}
                <Route
                    path="/"
                    element={
                        <Layout>
                            <HomePage />
                        </Layout>
                    }
                />
                <Route
                    path="/assessment"
                    element={
                        <Layout>
                            <AssessmentPage />
                        </Layout>
                    }
                />
                <Route
                    path="/checkout"
                    element={
                        <Layout>
                            <CheckoutPage />
                        </Layout>
                    }
                />
                <Route
                    path="/success"
                    element={
                        <Layout>
                            <SuccessPage />
                        </Layout>
                    }
                />
                <Route
                    path="/agentic-ai"
                    element={
                        <Layout>
                            <AgenticPage />
                        </Layout>
                    }
                />
                <Route
                    path="/blog/:id"
                    element={
                        <Layout>
                            <BlogPostPage />
                        </Layout>
                    }
                />
                <Route
                    path="/blog"
                    element={
                        <Layout>
                            <BlogPage />
                        </Layout>
                    }
                />
                <Route
                    path="*"
                    element={
                        <Layout>
                            <NotFoundPage />
                        </Layout>
                    }
                />
            </Routes>
            <ChatWidget />
        </AuthProvider>
    );
};

export default App;
