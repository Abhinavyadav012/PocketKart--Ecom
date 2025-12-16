import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { ROLES, hasAnyRole, hasAllRoles, hasPermission } from '../constants/roles';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
      } else {
        logout();
      }
    } catch (error) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);
    }
    return data;
  };

  const adminLogin = async (email, password) => {
    const res = await fetch('http://localhost:5000/api/auth/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem('adminToken', data.token);
      setToken(data.token);
      setUser(data.user);
    }
    return data;
  };

  const sellerLogin = async (email, password) => {
    const res = await fetch('http://localhost:5000/api/auth/seller/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem('sellerToken', data.token);
      setToken(data.token);
      setUser(data.user);
    }
    return data;
  };

  const register = async (name, email, password) => {
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setUser(data.user);
    }
    return data;
  };

  const applySeller = async (sellerData) => {
    const res = await fetch('http://localhost:5000/api/auth/apply-seller', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(sellerData)
    });
    const data = await res.json();
    if (data.success && data.user) {
      setUser(data.user);
    }
    return data;
  };

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('sellerToken');
    setToken(null);
    setUser(null);
    setAuthError(null);
  }, []);

  // Memoized role checks
  const isAdmin = useMemo(() => user?.roles?.includes(ROLES.ADMIN) ?? false, [user?.roles]);
  const isSeller = useMemo(() => user?.roles?.includes(ROLES.SELLER) ?? false, [user?.roles]);
  const isUser = useMemo(() => user?.roles?.includes(ROLES.USER) ?? false, [user?.roles]);
  const isAuthenticated = useMemo(() => !!token && !!user, [token, user]);

  // Role checking utilities
  const checkRole = useCallback((role) => {
    return user?.roles?.includes(role) ?? false;
  }, [user?.roles]);

  const checkAnyRole = useCallback((roles) => {
    return hasAnyRole(user?.roles, roles);
  }, [user?.roles]);

  const checkAllRoles = useCallback((roles) => {
    return hasAllRoles(user?.roles, roles);
  }, [user?.roles]);

  const checkPermission = useCallback((permission) => {
    return hasPermission(user?.roles, permission);
  }, [user?.roles]);

  // Check if seller is approved
  const isApprovedSeller = useMemo(() => {
    return isSeller && user?.sellerInfo?.isApproved === true;
  }, [isSeller, user?.sellerInfo?.isApproved]);

  // Refresh user data
  const refreshUser = useCallback(async () => {
    if (token) {
      await fetchUser();
    }
  }, [token]);

  // Context value memoized for performance
  const contextValue = useMemo(() => ({
    // State
    user,
    token,
    loading,
    authError,
    
    // Auth actions
    login,
    adminLogin,
    sellerLogin,
    register,
    logout,
    applySeller,
    refreshUser,
    
    // Role flags
    isAdmin,
    isSeller,
    isUser,
    isAuthenticated,
    isApprovedSeller,
    
    // Role checking utilities
    checkRole,
    checkAnyRole,
    checkAllRoles,
    checkPermission,
    
    // Constants
    ROLES,
  }), [
    user, token, loading, authError,
    login, adminLogin, sellerLogin, register, logout, applySeller, refreshUser,
    isAdmin, isSeller, isUser, isAuthenticated, isApprovedSeller,
    checkRole, checkAnyRole, checkAllRoles, checkPermission
  ]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export { AuthProvider, ROLES };
