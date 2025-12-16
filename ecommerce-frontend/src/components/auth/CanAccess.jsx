import { usePermissions } from '../../hooks/usePermissions';
import { ROLES } from '../../constants/roles';

/**
 * CanAccess - Conditional rendering based on permissions
 * 
 * Use this component to conditionally show/hide UI elements
 * based on user roles and permissions.
 * 
 * Usage:
 * <CanAccess roles={[ROLES.ADMIN]}>
 *   <AdminOnlyButton />
 * </CanAccess>
 * 
 * <CanAccess permission={PERMISSIONS.MANAGE_PRODUCTS}>
 *   <ProductManager />
 * </CanAccess>
 */
export const CanAccess = ({ 
  children, 
  roles = [], 
  permission,
  requireAll = false,
  fallback = null 
}) => {
  const { hasAny, hasAll, can } = usePermissions();

  let hasAccess = false;

  // Check permission if provided
  if (permission) {
    hasAccess = can(permission);
  }
  // Check roles if provided
  else if (roles.length > 0) {
    hasAccess = requireAll ? hasAll(roles) : hasAny(roles);
  }
  // No requirements = always show
  else {
    hasAccess = true;
  }

  return hasAccess ? children : fallback;
};

/**
 * AdminOnly - Show content only to admins
 * 
 * Usage:
 * <AdminOnly>
 *   <DeleteAllButton />
 * </AdminOnly>
 */
export const AdminOnly = ({ children, fallback = null }) => {
  const { isAdmin } = usePermissions();
  return isAdmin ? children : fallback;
};

/**
 * SellerOnly - Show content only to approved sellers
 * 
 * Usage:
 * <SellerOnly>
 *   <AddProductButton />
 * </SellerOnly>
 */
export const SellerOnly = ({ children, fallback = null }) => {
  const { sellerInfo } = usePermissions();
  return sellerInfo.isApprovedSeller ? children : fallback;
};

/**
 * UserOnly - Show content only to authenticated users
 * 
 * Usage:
 * <UserOnly>
 *   <AddToCartButton />
 * </UserOnly>
 */
export const UserOnly = ({ children, fallback = null }) => {
  const { isUser } = usePermissions();
  return isUser ? children : fallback;
};

/**
 * NotRole - Show content only to users WITHOUT specific roles
 * 
 * Usage:
 * <NotRole roles={[ROLES.ADMIN]}>
 *   <ApplyForAdminLink />
 * </NotRole>
 */
export const NotRole = ({ children, roles = [], fallback = null }) => {
  const { hasAny } = usePermissions();
  return !hasAny(roles) ? children : fallback;
};

/**
 * GuestContent - Show content only to non-authenticated users
 * 
 * Usage:
 * <GuestContent>
 *   <LoginPrompt />
 * </GuestContent>
 */
export const GuestContent = ({ children, fallback = null }) => {
  const { isUser, isAdmin, isSeller } = usePermissions();
  const isAuthenticated = isUser || isAdmin || isSeller;
  return !isAuthenticated ? children : fallback;
};

/**
 * AuthenticatedContent - Show content only to authenticated users (any role)
 * 
 * Usage:
 * <AuthenticatedContent>
 *   <UserMenu />
 * </AuthenticatedContent>
 */
export const AuthenticatedContent = ({ children, fallback = null }) => {
  const { isUser, isAdmin, isSeller } = usePermissions();
  const isAuthenticated = isUser || isAdmin || isSeller;
  return isAuthenticated ? children : fallback;
};

export default CanAccess;
