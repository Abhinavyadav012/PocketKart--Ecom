import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Unauthorized Page
 * 
 * Displayed when a user attempts to access a route they don't have permission for.
 * Shows the required role and provides navigation options.
 */
const Unauthorized = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  // Extract state passed from ProtectedRoute
  const { requiredRole, requiredRoles, message } = location.state || {};

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mx-auto w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-12 h-12 text-red-600 dark:text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Access Denied
        </h1>

        {/* Message */}
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          You don't have permission to access this page.
        </p>

        {/* Required role info */}
        {(requiredRole || requiredRoles) && (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Required role: {' '}
              <span className="font-semibold text-gray-700 dark:text-gray-300">
                {requiredRole || requiredRoles?.join(' or ')}
              </span>
            </p>
            {isAuthenticated && user?.roles && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Your role: {' '}
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  {user.roles.join(', ')}
                </span>
              </p>
            )}
          </div>
        )}

        {message && (
          <p className="text-amber-600 dark:text-amber-400 text-sm mb-6">
            {message}
          </p>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleGoBack}
            className="px-6 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Go Back
          </button>

          <Link
            to="/"
            className="px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Go Home
          </Link>

          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="px-6 py-2.5 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              Logout
            </button>
          )}
        </div>

        {/* Login prompt for unauthenticated users */}
        {!isAuthenticated && (
          <p className="mt-8 text-gray-600 dark:text-gray-400">
            Need to sign in?{' '}
            <Link
              to="/login"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Login here
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default Unauthorized;
