/**
 * Auth Components - Role-Based Access Control
 * 
 * This module exports all authentication and authorization components
 * for implementing RBAC in the React application.
 */

// Route protection middleware components
export {
  RequireAuth,
  RequireAdmin,
  RequireSeller,
  RequireUser,
  RequireRoles,
  GuestOnly,
} from './ProtectedRoute';

// Conditional rendering components
export {
  CanAccess,
  AdminOnly,
  SellerOnly,
  UserOnly,
  NotRole,
  GuestContent,
  AuthenticatedContent,
} from './CanAccess';

// Re-export constants for convenience
export { ROLES, PERMISSIONS, ROLE_PERMISSIONS } from '../../constants/roles';
