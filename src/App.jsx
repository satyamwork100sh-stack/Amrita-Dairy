import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Providers
import { ToastProvider } from './context/ToastContext';
import { AppDataProvider } from './context/AppDataContext';
import { CartProvider } from './context/CartContext';

// Layouts
import CustomerLayout from './layouts/CustomerLayout';
import DeliveryLayout from './layouts/DeliveryLayout';
import AdminLayout from './layouts/AdminLayout';

// Customer Pages
import HomePage from './pages/customer/HomePage';
import AboutPage from './pages/customer/AboutPage';
import ShopPage from './pages/customer/ShopPage';
import ProductDetailPage from './pages/customer/ProductDetailPage';
import CartPage from './pages/customer/CartPage';
import CheckoutPage from './pages/customer/CheckoutPage';
import OrderSuccessPage from './pages/customer/OrderSuccessPage';
import OrdersPage from './pages/customer/OrdersPage';
import OrderDetailPage from './pages/customer/OrderDetailPage';
import TrackOrderPage from './pages/customer/TrackOrderPage';
import ProfilePage from './pages/customer/ProfilePage';
import AddressesPage from './pages/customer/AddressesPage';
import SubscriptionsPage from './pages/customer/SubscriptionsPage';
import CustomerAuthPage from './pages/customer/CustomerAuthPage';

// Delivery Pages
import DeliveryLoginPage from './pages/delivery/DeliveryLoginPage';
import DeliveryDashboardPage from './pages/delivery/DeliveryDashboardPage';
import DeliveryOrdersPage from './pages/delivery/DeliveryOrdersPage';
import DeliveryDetailPage from './pages/delivery/DeliveryDetailPage';
import ActiveDeliveryPage from './pages/delivery/ActiveDeliveryPage';
import DeliveryHistoryPage from './pages/delivery/DeliveryHistoryPage';
import DeliveryProfilePage from './pages/delivery/DeliveryProfilePage';

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminOrderDetailPage from './pages/admin/AdminOrderDetailPage';
import AdminCustomersPage from './pages/admin/AdminCustomersPage';
import AdminCustomerDetailPage from './pages/admin/AdminCustomerDetailPage';
import AdminProductsPage from './pages/admin/AdminProductsPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import AdminDeliveryBoysPage from './pages/admin/AdminDeliveryBoysPage';
import AdminDeliveryBoyDetailPage from './pages/admin/AdminDeliveryBoyDetailPage';
import AdminLiveTrackingPage from './pages/admin/AdminLiveTrackingPage';
import AdminSubscriptionsPage from './pages/admin/AdminSubscriptionsPage';
import AdminPaymentsPage from './pages/admin/AdminPaymentsPage';
import AdminReportsPage from './pages/admin/AdminReportsPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

export const App = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AppDataProvider>
          <CartProvider>
            <Routes>
              {/* 1. CUSTOMER PORTAL ROUTES */}
              <Route path="/" element={<CustomerLayout />}>
                <Route index element={<HomePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="shop" element={<ShopPage />} />
                <Route path="products" element={<Navigate to="/shop" replace />} />
                <Route path="products/:id" element={<ProductDetailPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="checkout" element={<CheckoutPage />} />
                <Route path="order-success" element={<OrderSuccessPage />} />
                <Route path="orders" element={<OrdersPage />} />
                <Route path="orders/:id" element={<OrderDetailPage />} />
                <Route path="track-order/:id" element={<TrackOrderPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="profile/addresses" element={<AddressesPage />} />
                <Route path="subscriptions" element={<SubscriptionsPage />} />
                <Route path="login" element={<CustomerAuthPage />} />
                <Route path="register" element={<CustomerAuthPage />} />
              </Route>

              {/* 2. DELIVERY BOY PANEL ROUTES */}
              <Route path="/delivery/login" element={<DeliveryLoginPage />} />
              <Route path="/delivery" element={<DeliveryLayout />}>
                <Route index element={<Navigate to="/delivery/dashboard" replace />} />
                <Route path="dashboard" element={<DeliveryDashboardPage />} />
                <Route path="orders" element={<DeliveryOrdersPage />} />
                <Route path="orders/:id" element={<DeliveryDetailPage />} />
                <Route path="active-delivery" element={<ActiveDeliveryPage />} />
                <Route path="history" element={<DeliveryHistoryPage />} />
                <Route path="profile" element={<DeliveryProfilePage />} />
              </Route>

              {/* 3. ADMIN DASHBOARD ROUTES */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboardPage />} />
                <Route path="orders" element={<AdminOrdersPage />} />
                <Route path="orders/:id" element={<AdminOrderDetailPage />} />
                <Route path="customers" element={<AdminCustomersPage />} />
                <Route path="customers/:id" element={<AdminCustomerDetailPage />} />
                <Route path="products" element={<AdminProductsPage />} />
                <Route path="products/create" element={<AdminProductsPage />} />
                <Route path="products/:id/edit" element={<AdminProductsPage />} />
                <Route path="categories" element={<AdminCategoriesPage />} />
                <Route path="delivery-boys" element={<AdminDeliveryBoysPage />} />
                <Route path="delivery-boys/:id" element={<AdminDeliveryBoyDetailPage />} />
                <Route path="live-tracking" element={<AdminLiveTrackingPage />} />
                <Route path="subscriptions" element={<AdminSubscriptionsPage />} />
                <Route path="payments" element={<AdminPaymentsPage />} />
                <Route path="reports" element={<AdminReportsPage />} />
                <Route path="settings" element={<AdminSettingsPage />} />
              </Route>

              {/* Catch-all Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </CartProvider>
        </AppDataProvider>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default App;
