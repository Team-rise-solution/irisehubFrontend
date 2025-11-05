import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  FiMenu, 
  FiX, 
  FiHome, 
  FiFileText, 
  FiBookOpen, 
  FiUsers, 
  FiSettings, 
  FiLogOut,
  FiBarChart,
  FiImage,
  FiEdit3,
  FiTrash2,
  FiEye,
  FiPlus,
  FiCalendar
} from 'react-icons/fi';
import { authAPI } from '../services/api';
import { useSidebar } from './SidebarContext';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { hideSidebar } = useSidebar();

  useEffect(() => {
    // Force login every time - check token first
    const token = localStorage.getItem('adminToken');
    const currentUser = authAPI.getCurrentUser();
    
    // If no token or user, redirect to login
    if (!token || !currentUser) {
      authAPI.logout(); // Clear any stale data
      navigate('/admin/login');
    } else {
      // SECURITY: Remove password field completely
      const { password, ...userWithoutPassword } = currentUser;
      
      // SECURITY: If name looks like a password (contains @ or special chars), use email or default
      let displayName = userWithoutPassword.name;
      if (!displayName || displayName.includes('@') || displayName.includes('2025')) {
        // Use email if available (without @domain), or default to 'Admin'
        if (userWithoutPassword.email) {
          displayName = userWithoutPassword.email.split('@')[0] || 'Admin';
        } else {
          displayName = 'Admin';
        }
      }
      
      setUser({
        ...userWithoutPassword,
        name: displayName,
        displayName: displayName // Store safe display name
      });
      
      // Update localStorage with clean data
      if (password || userWithoutPassword.name !== displayName) {
        authAPI.setUser({
          ...userWithoutPassword,
          name: displayName
        });
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    authAPI.logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { name: 'Dashboard', icon: FiHome, path: '/admin', exact: true },
    { name: 'News', icon: FiFileText, path: '/admin/news' },
    { name: 'Events', icon: FiBookOpen, path: '/admin/events' },
    { name: 'Bookings', icon: FiCalendar, path: '/admin/bookings' },
    { name: 'Admins', icon: FiUsers, path: '/admin/admins' },
    { name: 'Analytics', icon: FiBarChart, path: '/admin/analytics' },
    { name: 'Settings', icon: FiSettings, path: '/admin/settings' },
  ];

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      {!hideSidebar && (
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">iR</span>
            </div>
            <span className="text-xl font-bold text-gray-800">irisehub</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive(item.path, item.exact)
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </button>
              );
            })}
          </div>
        </nav>

        {/* User info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">
                {user?.name?.charAt(0) || 'A'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name || 'Admin'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.role || 'admin'}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
          >
            <FiLogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>
        </div>
      )}

      {/* Main content */}
      <div className={hideSidebar ? "w-full" : "lg:pl-64"}>
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <FiMenu className="w-5 h-5" />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-gray-900">
                  {menuItems.find(item => isActive(item.path, item.exact))?.name || 'Dashboard'}
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {user?.name?.charAt(0) || 'A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
