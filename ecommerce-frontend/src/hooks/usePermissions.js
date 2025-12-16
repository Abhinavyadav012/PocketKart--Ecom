import { useMemo, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  ROLES, 
  PERMISSIONS, 
  ROLE_PERMISSIONS, 
  hasPermission, 
  hasAnyRole, 
  hasAllRoles 
} from '../constants/roles';

/**
 * usePermissions Hook
 * 
 * Provides comprehensive permission checking utilities for components.
 * Use this hook to conditionally render UI elements based on user permissions.
 * 
 * Usage:
 * const { canManageProducts, canPlaceOrders, hasRole } = usePermissions();
 * 
 * {canManageProducts && <ProductManager />}
 */
export const usePermissions = () => {
  const { user, isAdmin, isSeller, isUser } = useAuth();

  // Get user's roles array
  const userRoles = useMemo(() => {
    return user?.roles || [];
  }, [user?.roles]);

  // Check if user has a specific permission
  const can = useCallback((permission) => {
    return hasPermission(userRoles, permission);
  }, [userRoles]);

  // Check if user has a specific role
  const hasRole = useCallback((role) => {
    return userRoles.includes(role);
  }, [userRoles]);

  // Check if user has any of the specified roles
  const hasAny = useCallback((roles) => {
    return hasAnyRole(userRoles, roles);
  }, [userRoles]);

  // Check if user has all of the specified roles
  const hasAll = useCallback((roles) => {
    return hasAllRoles(userRoles, roles);
  }, [userRoles]);

  // Pre-computed permission flags for common operations
  const permissions = useMemo(() => ({
    // Admin permissions
    canViewAdminDashboard: can(PERMISSIONS.VIEW_ADMIN_DASHBOARD),
    canManageUsers: can(PERMISSIONS.MANAGE_USERS),
    canManageSellers: can(PERMISSIONS.MANAGE_SELLERS),
    canApproveSellers: can(PERMISSIONS.APPROVE_SELLERS),
    canViewAllOrders: can(PERMISSIONS.VIEW_ALL_ORDERS),
    canViewAllProducts: can(PERMISSIONS.VIEW_ALL_PRODUCTS),
    canManageSystem: can(PERMISSIONS.MANAGE_SYSTEM),

    // Seller permissions
    canViewSellerDashboard: can(PERMISSIONS.VIEW_SELLER_DASHBOARD),
    canManageOwnProducts: can(PERMISSIONS.MANAGE_OWN_PRODUCTS),
    canViewOwnOrders: can(PERMISSIONS.VIEW_OWN_ORDERS),
    canViewSellerStats: can(PERMISSIONS.VIEW_SELLER_STATS),

    // User permissions
    canPlaceOrders: can(PERMISSIONS.PLACE_ORDERS),
    canViewOwnProfile: can(PERMISSIONS.VIEW_OWN_PROFILE),
    canApplyAsSeller: can(PERMISSIONS.APPLY_AS_SELLER),
    canViewCart: can(PERMISSIONS.VIEW_CART),
    canCheckout: can(PERMISSIONS.CHECKOUT),
  }), [can]);

  // Seller-specific checks
  const sellerInfo = useMemo(() => ({
    isApprovedSeller: isSeller && user?.sellerInfo?.isApproved === true,
    isPendingSeller: isSeller && user?.sellerInfo?.isApproved === false,
    storeName: user?.sellerInfo?.storeName || '',
    appliedAt: user?.sellerInfo?.appliedAt,
    approvedAt: user?.sellerInfo?.approvedAt,
  }), [isSeller, user?.sellerInfo]);

  return {
    // Role flags
    isAdmin,
    isSeller,
    isUser,
    userRoles,

    // Permission checking functions
    can,
    hasRole,
    hasAny,
    hasAll,

    // Pre-computed permissions
    ...permissions,

    // Seller info
    sellerInfo,

    // Constants for convenience
    ROLES,
    PERMISSIONS,
  };
};

/**
 * useRoleGuard Hook
 * 
 * Returns whether current user meets role requirements.
 * Useful for programmatic access control in event handlers.
 * 
 * Usage:
 * const { isAllowed, checkAccess } = useRoleGuard([ROLES.ADMIN, ROLES.SELLER]);
 */
export const useRoleGuard = (requiredRoles = [], requireAll = false) => {
  const { user } = useAuth();

  const userRoles = user?.roles || [];

  const isAllowed = useMemo(() => {
    if (requiredRoles.length === 0) return true;
    
    return requireAll 
      ? hasAllRoles(userRoles, requiredRoles)
      : hasAnyRole(userRoles, requiredRoles);
  }, [userRoles, requiredRoles, requireAll]);

  const checkAccess = useCallback((roles, all = false) => {
    return all 
      ? hasAllRoles(userRoles, roles)
      : hasAnyRole(userRoles, roles);
  }, [userRoles]);

  return {
    isAllowed,
    checkAccess,
    userRoles,
  };
};

/**
 * useAdminAccess Hook
 * 
 * Simplified hook for admin-only access checks.
 * 
 * Usage:
 * const { canAccess, user } = useAdminAccess();
 */
export const useAdminAccess = () => {
  const { user, isAdmin, loading } = useAuth();
  
  return {
    canAccess: isAdmin,
    user,
    loading,
    isAdmin,
  };
};

/**
 * useSellerAccess Hook
 * 
 * Simplified hook for seller-only access checks.
 * Includes approval status check.
 * 
 * Usage:
 * const { canAccess, isApproved, isPending } = useSellerAccess();
 */
export const useSellerAccess = () => {
  const { user, isSeller, loading } = useAuth();
  
  const isApproved = isSeller && user?.sellerInfo?.isApproved === true;
  const isPending = isSeller && !user?.sellerInfo?.isApproved;
  
  return {
    canAccess: isApproved,
    user,
    loading,
    isSeller,
    isApproved,
    isPending,
    sellerInfo: user?.sellerInfo,
  };
};

export default usePermissions;
