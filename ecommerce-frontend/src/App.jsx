import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

// Layout
import Layout from './components/layout/Layout';

// Auth middleware components
import {
  RequireAuth,
  RequireAdmin,
  RequireSeller,
  RequireUser,
  GuestOnly,
} from './components/auth/ProtectedRoute';

// Public pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Auth pages (guest only)
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';
import SellerLogin from './pages/SellerLogin';

// Protected pages (authenticated users)
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Profile from './pages/Profile';
import BecomeSeller from './pages/BecomeSeller';

// Admin pages
import AdminDashboard from './pages/AdminDashboard';

// Seller pages
import SellerDashboard from './pages/SellerDashboard';
import SellerPending from './pages/SellerPending';

// Error pages
import Unauthorized from './pages/Unauthorized';

/**
 * Application Routes with Role-Based Access Control
 * 
 * Route Protection Hierarchy:
 * 1. Public Routes - No authentication required
 * 2. Guest Only Routes - Only for non-authenticated users (login, register)
 * 3. RequireAuth Routes - Any authenticated user
 * 4. RequireUser Routes - Authenticated users with 'user' role (placing orders)
 * 5. RequireSeller Routes - Approved sellers only (managing products)
 * 6. RequireAdmin Routes - Admin only (full system access)
 * 
 * Middleware Chaining:
 * - Each middleware verifies JWT token first (isAuthenticated)
 * - Then checks for specific role requirements
 * - Redirects to appropriate login or unauthorized page
 */
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ThemeProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                {/* ========================================
                    PUBLIC ROUTES
                    No authentication required
                   ======================================== */}
                <Route index element={<Home />} />
                <Route path="shop" element={<Shop />} />
                <Route path="product/:id" element={<ProductDetails />} />
                <Route path="contact" element={<Contact />} />
                
                {/* Error pages */}
                <Route path="unauthorized" element={<Unauthorized />} />
                <Route path="seller-pending" element={<SellerPending />} />

                {/* ========================================
                    GUEST ONLY ROUTES
                    Redirect to home if already authenticated
                   ======================================== */}
                <Route element={<GuestOnly />}>
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="admin/login" element={<AdminLogin />} />
                  <Route path="seller/login" element={<SellerLogin />} />
                </Route>

                {/* ========================================
                    AUTHENTICATED USER ROUTES
                    Requires: Valid JWT token + 'user' role
                    Access: Can place orders, view cart, checkout
                   ======================================== */}
                <Route element={<RequireUser />}>
                  <Route path="cart" element={<Cart />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="order-success" element={<OrderSuccess />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="become-seller" element={<BecomeSeller />} />
                </Route>

                {/* ========================================
                    SELLER ROUTES
                    Requires: Valid JWT + 'seller' role + approved status
                    Access: Manage own products only
                   ======================================== */}
                <Route element={<RequireSeller />}>
                  <Route path="seller" element={<SellerDashboard />} />
                </Route>

                {/* ========================================
                    ADMIN ROUTES
                    Requires: Valid JWT + 'admin' role
                    Access: Full system access
                   ======================================== */}
                <Route element={<RequireAdmin />}>
                  <Route path="admin" element={<AdminDashboard />} />
                </Route>

                {/* 404 - Catch all */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </ThemeProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
