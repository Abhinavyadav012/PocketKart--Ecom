import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Seller Pending Page
 * 
 * Displayed when a seller tries to access seller dashboard
 * but their account is not yet approved.
 */
const SellerPending = () => {
  const { user, logout } = useAuth();

  const appliedDate = user?.sellerInfo?.appliedAt 
    ? new Date(user.sellerInfo.appliedAt).toLocaleDateString()
    : 'Unknown';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mx-auto w-24 h-24 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-12 h-12 text-amber-600 dark:text-amber-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Application Pending
        </h1>

        {/* Store name if available */}
        {user?.sellerInfo?.storeName && (
          <p className="text-xl text-primary-600 dark:text-primary-400 font-semibold mb-2">
            {user.sellerInfo.storeName}
          </p>
        )}

        {/* Message */}
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Your seller application is currently under review. 
          Our team will verify your details and get back to you soon.
        </p>

        {/* Status card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-500 dark:text-gray-400">Status</span>
            <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-sm font-medium">
              Pending Review
            </span>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-500 dark:text-gray-400">Applied On</span>
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {appliedDate}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">Email</span>
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {user?.email}
            </span>
          </div>
        </div>

        {/* Info box */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6 text-left">
          <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">
            What happens next?
          </h3>
          <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
            <li>• Our team will review your application</li>
            <li>• We may contact you for additional details</li>
            <li>• Once approved, you'll have full seller access</li>
            <li>• You'll receive an email notification</li>
          </ul>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Continue Shopping
          </Link>

          <Link
            to="/contact"
            className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Contact Support
          </Link>
        </div>

        {/* Logout option */}
        <p className="mt-6 text-gray-500 dark:text-gray-400 text-sm">
          Wrong account?{' '}
          <button
            onClick={logout}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Logout
          </button>
        </p>
      </div>
    </div>
  );
};

export default SellerPending;
