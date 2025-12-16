import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROLES, hasAnyRole } from '../../constants/roles';

/**
 * Loading spinner component while checking auth state
 */
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="flex flex-col items-center gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      <p className="text-gray-600 dark:text-gray-400">Verifying authentication...</p>
    </div>
  </div>
);

/**
 * RequireAuth - Base authentication middleware
 * 
 * Verifies that the user has a valid JWT token.
 * Redirects to login if not authenticated.
 * 
 * Usage:
 * <Route element={<RequireAuth />}>
 *   <Route path="profile" element={<Profile />} />
 * </Route>
 */
export const RequireAuth = ({ children, redirectTo = '/login' }) => {
  const { user, loading, token } = useAuth();
  const location = useLocation();

  // Show loading while checking auth state
  if (loading) {
    return <LoadingSpinner />;
  }

  // Not authenticated - redirect to login with return URL
  if (!token || !user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Authenticated - render children or outlet
  return children ? children : <Outlet />;
};

/**
 * RequireAdmin - Admin-only middleware
 * 
 * Ensures user has admin role.
 * Chains with RequireAuth for JWT verification.
 * 
 * Usage:
 * <Route element={<RequireAdmin />}>
 *   <Route path="admin" element={<AdminDashboard />} />
 * </Route>
 */
export const RequireAdmin = ({ children, redirectTo = '/admin/login' }) => {
  const { user, loading, token, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  // Not authenticated - redirect to admin login
  if (!token || !user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Not an admin - redirect to unauthorized
  if (!isAdmin) {
    return <Navigate to="/unauthorized" state={{ 
      from: location,
      requiredRole: ROLES.ADMIN,
      message: 'Admin access required'
    }} replace />;
  }

  return children ? children : <Outlet />;
};

/**
 * RequireSeller - Seller-only middleware
 * 
 * Ensures user has approved seller status.
 * Sellers can only manage their own products.
 * 
 * Usage:
 * <Route element={<RequireSeller />}>
 *   <Route path="seller" element={<SellerDashboard />} />
 * </Route>
 */
export const RequireSeller = ({ children, redirectTo = '/seller/login' }) => {
  const { user, loading, token, isSeller } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  // Not authenticated
  if (!token || !user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Not a seller
  if (!isSeller) {
    return <Navigate to="/unauthorized" state={{ 
      from: location,
      requiredRole: ROLES.SELLER,
      message: 'Seller access required'
    }} replace />;
  }

  // Check if seller is approved
  if (!user.sellerInfo?.isApproved) {
    return <Navigate to="/seller-pending" state={{ 
      from: location,
      message: 'Your seller account is pending approval'
    }} replace />;
  }

  return children ? children : <Outlet />;
};

/**
 * RequireUser - Authenticated user middleware
 * 
 * Ensures user is authenticated (any role).
 * Users can place orders, view cart, checkout.
 * 
 * Usage:
 * <Route element={<RequireUser />}>
 *   <Route path="checkout" element={<Checkout />} />
 * </Route>
 */
export const RequireUser = ({ children, redirectTo = '/login' }) => {
  const { user, loading, token, isUser } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  // Not authenticated
  if (!token || !user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Must have user role (all authenticated users should have this)
  if (!isUser) {
    return <Navigate to="/unauthorized" state={{ 
      from: location,
      requiredRole: ROLES.USER,
      message: 'User access required'
    }} replace />;
  }

  return children ? children : <Outlet />;
};

/**
 * RequireRoles - Flexible role-based middleware
 * 
 * Allows specifying multiple allowed roles.
 * Supports both "any" and "all" matching modes.
 * 
 * Usage:
 * <Route element={<RequireRoles roles={[ROLES.ADMIN, ROLES.SELLER]} />}>
 *   <Route path="dashboard" element={<Dashboard />} />
 * </Route>
 */
export const RequireRoles = ({ 
  children, 
  roles = [], 
  requireAll = false,
  redirectTo = '/login',
  unauthorizedRedirect = '/unauthorized'
}) => {
  const { user, loading, token } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  // Not authenticated
  if (!token || !user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check role requirements
  const userRoles = user.roles || [];
  const hasAccess = requireAll 
    ? roles.every(role => userRoles.includes(role))
    : hasAnyRole(userRoles, roles);

  if (!hasAccess) {
    return <Navigate to={unauthorizedRedirect} state={{ 
      from: location,
      requiredRoles: roles,
      requireAll,
      message: `Required role(s): ${roles.join(', ')}`
    }} replace />;
  }

  return children ? children : <Outlet />;
};

/**
 * GuestOnly - Redirect authenticated users
 * 
 * Use for login/register pages to redirect already logged-in users.
 * 
 * Usage:
 * <Route element={<GuestOnly />}>
 *   <Route path="login" element={<Login />} />
 * </Route>
 */
export const GuestOnly = ({ children, redirectTo = '/' }) => {
  const { user, loading, token } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  // Already authenticated - redirect to intended destination or home
  if (token && user) {
    const from = location.state?.from?.pathname || redirectTo;
    return <Navigate to={from} replace />;
  }

  return children ? children : <Outlet />;
};

export default {
  RequireAuth,
  RequireAdmin,
  RequireSeller,
  RequireUser,
  RequireRoles,
  GuestOnly,
};
