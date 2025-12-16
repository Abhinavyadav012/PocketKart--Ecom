/**
 * Role-Based Access Control (RBAC) Constants
 * 
 * Defines all roles, permissions, and access levels for the application.
 * These constants should be used throughout the app for consistency.
 */

// User Roles - matches backend roles exactly
export const ROLES = Object.freeze({
  ADMIN: 'admin',
  SELLER: 'seller',
  USER: 'user',
});

// Permission definitions for each role
export const PERMISSIONS = Object.freeze({
  // Admin permissions
  VIEW_ADMIN_DASHBOARD: 'view_admin_dashboard',
  MANAGE_USERS: 'manage_users',
  MANAGE_SELLERS: 'manage_sellers',
  APPROVE_SELLERS: 'approve_sellers',
  VIEW_ALL_ORDERS: 'view_all_orders',
  VIEW_ALL_PRODUCTS: 'view_all_products',
  MANAGE_SYSTEM: 'manage_system',

  // Seller permissions
  VIEW_SELLER_DASHBOARD: 'view_seller_dashboard',
  MANAGE_OWN_PRODUCTS: 'manage_own_products',
  VIEW_OWN_ORDERS: 'view_own_orders',
  VIEW_SELLER_STATS: 'view_seller_stats',

  // User permissions
  PLACE_ORDERS: 'place_orders',
  VIEW_OWN_PROFILE: 'view_own_profile',
  APPLY_AS_SELLER: 'apply_as_seller',
  VIEW_CART: 'view_cart',
  CHECKOUT: 'checkout',
});

// Map roles to their permissions
export const ROLE_PERMISSIONS = Object.freeze({
  [ROLES.ADMIN]: [
    // Admin has all permissions
    PERMISSIONS.VIEW_ADMIN_DASHBOARD,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.MANAGE_SELLERS,
    PERMISSIONS.APPROVE_SELLERS,
    PERMISSIONS.VIEW_ALL_ORDERS,
    PERMISSIONS.VIEW_ALL_PRODUCTS,
    PERMISSIONS.MANAGE_SYSTEM,
    // Admin also has seller permissions
    PERMISSIONS.VIEW_SELLER_DASHBOARD,
    PERMISSIONS.MANAGE_OWN_PRODUCTS,
    PERMISSIONS.VIEW_OWN_ORDERS,
    PERMISSIONS.VIEW_SELLER_STATS,
    // Admin also has user permissions
    PERMISSIONS.PLACE_ORDERS,
    PERMISSIONS.VIEW_OWN_PROFILE,
    PERMISSIONS.APPLY_AS_SELLER,
    PERMISSIONS.VIEW_CART,
    PERMISSIONS.CHECKOUT,
  ],
  [ROLES.SELLER]: [
    // Seller specific permissions
    PERMISSIONS.VIEW_SELLER_DASHBOARD,
    PERMISSIONS.MANAGE_OWN_PRODUCTS,
    PERMISSIONS.VIEW_OWN_ORDERS,
    PERMISSIONS.VIEW_SELLER_STATS,
    // Seller also has user permissions
    PERMISSIONS.PLACE_ORDERS,
    PERMISSIONS.VIEW_OWN_PROFILE,
    PERMISSIONS.VIEW_CART,
    PERMISSIONS.CHECKOUT,
  ],
  [ROLES.USER]: [
    // User permissions only
    PERMISSIONS.PLACE_ORDERS,
    PERMISSIONS.VIEW_OWN_PROFILE,
    PERMISSIONS.APPLY_AS_SELLER,
    PERMISSIONS.VIEW_CART,
    PERMISSIONS.CHECKOUT,
  ],
});

// Route access configuration - which roles can access which routes
export const ROUTE_ACCESS = Object.freeze({
  // Public routes - no auth required
  PUBLIC: ['/', '/shop', '/product/:id', '/login', '/register', '/admin/login', '/seller/login', '/contact'],
  
  // User routes - any authenticated user
  AUTHENTICATED: ['/cart', '/checkout', '/order-success', '/profile', '/become-seller'],
  
  // Admin only routes
  ADMIN_ONLY: ['/admin'],
  
  // Seller only routes (requires approved seller)
  SELLER_ONLY: ['/seller'],
});

// Helper to check if a role has a permission
export const hasPermission = (userRoles, permission) => {
  if (!userRoles || !Array.isArray(userRoles)) return false;
  
  return userRoles.some(role => {
    const rolePermissions = ROLE_PERMISSIONS[role];
    return rolePermissions && rolePermissions.includes(permission);
  });
};

// Helper to check if user has any of the required roles
export const hasAnyRole = (userRoles, requiredRoles) => {
  if (!userRoles || !Array.isArray(userRoles)) return false;
  if (!requiredRoles || !Array.isArray(requiredRoles)) return false;
  
  return requiredRoles.some(role => userRoles.includes(role));
};

// Helper to check if user has all required roles
export const hasAllRoles = (userRoles, requiredRoles) => {
  if (!userRoles || !Array.isArray(userRoles)) return false;
  if (!requiredRoles || !Array.isArray(requiredRoles)) return false;
  
  return requiredRoles.every(role => userRoles.includes(role));
};

export default ROLES;
