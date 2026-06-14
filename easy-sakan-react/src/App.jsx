import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import { LanguageProvider } from "./context/LanguageContext";
import Header from "./components/Header";
import ScrollToTop from './components/ScrollToTop';
import TransportProviderHeader from "./components/TransportProviderHeader";
import ServiceProviderHeader from "./components/ServiceProviderHeader";
import { useAuth } from "./context/AuthContext";
import Footer from "./components/Footer"; // Added: Import Footer for consistent layout
import HomePage from './pages/HomePage';
import BecomeSellerPage from './pages/BecomeSellerPage';
import LoginPage from './pages/LoginPage';
import PartnerLoginPage from './pages/PartnerLoginPage';
import PartnerSignupPage from './pages/PartnerSignupPage';
import SignupPage from './pages/SignupPage';
import ContactUs from './pages/ContactUs';
import HelpPage from './pages/HelpPage';
import TermsPage from './pages/TermsPage';
import PolicyPage from './pages/Policy';
import AboutPage from './pages/AboutPage';
import ListingsPage from './pages/ListingsPage';
import SellerPage from './pages/SellerPage';
import SellerDashboard from './pages/SellerDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import TransportationPage from './pages/TransportationPage';
import TransportationDashboard from './pages/TransportationDashboard';
import ListingDetailsPage from './pages/ListingDetailsPage';
import MaintenanceServicesDashboard from './pages/MaintenanceServicesDashboard';
import ServicesPage from './pages/ServicesPage';
import ServicesDashboard from './pages/ServicesDashboard';
import CheckoutPage from './pages/CheckoutPage';
import ProtectedRoute, { PartnerRedirect } from './components/ProtectedRoute';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPosters from './pages/admin/AdminPosters';
import AdminServices from './pages/admin/AdminServices';
import AdminBookings from './pages/admin/AdminBookings';
import AdminListings from './pages/admin/AdminListings';
import AdminUsers from './pages/admin/AdminUsers';

function AppHeader() {
  const { user } = useAuth();
  if (user?.role === 'provider') return <TransportProviderHeader />;
  if (user?.role === 'service_provider') return <ServiceProviderHeader />;
  return <Header />;
}

export default function App() {
  return (
    <LanguageProvider>
      <ScrollToTop />
      <AppHeader />
      <Routes>
        {/* Public routes — blocked for logged-in partners */}
        <Route path="/" element={<PartnerRedirect><HomePage /></PartnerRedirect>} />
        <Route path="/listings" element={<PartnerRedirect><ListingsPage /></PartnerRedirect>} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/partner/login" element={<PartnerLoginPage />} />
        <Route path="/partner/signup" element={<PartnerSignupPage />} />

        {/* Protected routes — customers & sellers only */}
        <Route path="/listing/:id" element={<ProtectedRoute customerOnly><ListingDetailsPage /></ProtectedRoute>} />
        <Route path="/help" element={<ProtectedRoute customerOnly><HelpPage /></ProtectedRoute>} />
        <Route path="/terms" element={<ProtectedRoute customerOnly><TermsPage /></ProtectedRoute>} />
        <Route path="/privacy" element={<ProtectedRoute customerOnly><PolicyPage /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute customerOnly><AboutPage /></ProtectedRoute>} />
        <Route path="/services" element={<ProtectedRoute customerOnly><ServicesPage /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute customerOnly><CheckoutPage /></ProtectedRoute>} />
        <Route path="/become-seller" element={<ProtectedRoute customerOnly><BecomeSellerPage /></ProtectedRoute>} />
        <Route path="/seller" element={<ProtectedRoute customerOnly><SellerPage /></ProtectedRoute>} />
        <Route path="/seller/dashboard" element={<ProtectedRoute customerOnly><SellerDashboard /></ProtectedRoute>} />
        <Route path="/transportation" element={<ProtectedRoute customerOnly><TransportationPage /></ProtectedRoute>} />
        <Route path="/transportation/services" element={<Navigate to="/transportation" replace />} />

        {/* Dashboard routes — customer only */}
        <Route path="/dashboard" element={<ProtectedRoute customerOnly><CustomerDashboard /></ProtectedRoute>} />
        <Route path="/customer/dashboard" element={<ProtectedRoute customerOnly><CustomerDashboard /></ProtectedRoute>} />
        {/* Partner dashboards — no customerOnly restriction */}
        <Route path="/transportation/dashboard" element={<ProtectedRoute><TransportationDashboard /></ProtectedRoute>} />
        <Route path="/maintenance/dashboard" element={<ProtectedRoute><MaintenanceServicesDashboard /></ProtectedRoute>} />
        <Route path="/services/dashboard" element={<ProtectedRoute><ServicesDashboard /></ProtectedRoute>} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/posters" element={<AdminPosters />} />
        <Route path="/admin/services" element={<AdminServices />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
        <Route path="/admin/listings" element={<AdminListings />} />
        <Route path="/admin/users" element={<AdminUsers />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
     <Footer /> 
    </LanguageProvider>
  );
}
