import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { 
  FiFileText, 
  FiBookOpen, 
  FiUsers, 
  FiEye, 
  FiEdit3, 
  FiTrash2,
  FiPlus,
  FiTrendingUp,
  FiActivity,
  FiCalendar,
  FiImage,
  FiX,
  FiUser,
  FiMapPin,
  FiSave,
  FiCheck,
  FiCheckCircle,
  FiXCircle,
  FiClock
} from 'react-icons/fi';
import { newsAPI, eventAPI, adminAPI } from '../services/api';
import { useSidebar } from './SidebarContext';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalNews: 0,
    totalEvents: 0,
    totalAdmins: 0,
    totalViews: 0
  });
  const [recentNews, setRecentNews] = useState([]);
  const [recentEvents, setRecentEvents] = useState([]);
  const [combinedContent, setCombinedContent] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'news', 'events', 'upcoming', 'past'
  const [loading, setLoading] = useState(true);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingItem, setViewingItem] = useState(null);
  const [viewingType, setViewingType] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingItem, setDeletingItem] = useState(null);
  const [editingType, setEditingType] = useState('');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { setHideSidebar } = useSidebar();

  useEffect(() => {
    fetchDashboardData();
    
    // Auto-refresh every 2 seconds for real-time updates
    const interval = setInterval(() => {
      refreshDataSilently();
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  // Apply filters when combinedContent changes
  useEffect(() => {
    if (combinedContent.length > 0) {
      console.log('Applying filters:', { searchTerm, activeFilter, contentLength: combinedContent.length });
      applyFilters(combinedContent, searchTerm, activeFilter);
    }
  }, [combinedContent, searchTerm, activeFilter]);


  const fetchDashboardData = async (showLoading = true) => {
    try {
      if (showLoading) {
        setLoading(true);
      }

      // Fetch all data in parallel
      const [newsResponse, eventsResponse, adminsResponse] = await Promise.all([
        newsAPI.getAll({ limit: 100 }), // Get more news
        eventAPI.getAll({ limit: 100 }), // Get more events
        adminAPI.getAll()
      ]);

      // Only update if we got valid responses
      if (newsResponse?.data?.data && eventsResponse?.data?.data && adminsResponse?.data?.data) {
        // Calculate stats with real-time views
        const newsViews = newsResponse.data.data.reduce((sum, news) => sum + (news.views || 0), 0);
        const eventViews = eventsResponse.data.data.reduce((sum, event) => sum + (event.views || 0), 0);
        const totalViews = newsViews + eventViews;

        setStats({
          totalNews: newsResponse.data.data.length,
          totalEvents: eventsResponse.data.data.length,
          totalAdmins: adminsResponse.data.data.length,
          totalViews
        });

        // Set recent data
        setRecentNews(newsResponse.data.data);
        setRecentEvents(eventsResponse.data.data);
        
        // Combine news and events for display
        const combined = [
          ...newsResponse.data.data.map(item => ({ ...item, contentType: 'news' })),
          ...eventsResponse.data.data.map(item => ({ ...item, contentType: 'event' }))
        ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        console.log('Combined content:', combined.map(item => ({ 
          title: item.title, 
          contentType: item.contentType, 
          type: item.type 
        })));
        
        setCombinedContent(combined);
        
        // Update last updated time
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  };

  // Function to refresh data manually
  const refreshData = () => {
    fetchDashboardData();
  };

  // Function to show loading state during refresh
  const showRefreshLoading = () => {
    setLoading(true);
  };

  // Function to handle auto-refresh after actions
  const handleAutoRefresh = () => {
    showRefreshLoading();
    setTimeout(() => {
      fetchDashboardData();
    }, 1000);
  };

  // Function to refresh data silently (no loading state)
  const refreshDataSilently = async () => {
    try {
      setIsRefreshing(true);
      
      // Fetch all data in parallel without loading state
      const [newsResponse, eventsResponse, adminsResponse] = await Promise.all([
        newsAPI.getAll({ limit: 100 }),
        eventAPI.getAll({ limit: 100 }),
        adminAPI.getAll()
      ]);

      // Always update data even if some responses fail
      if (newsResponse?.data?.data && eventsResponse?.data?.data) {
        // Calculate stats with real-time views
        const newsViews = newsResponse.data.data.reduce((sum, news) => sum + (news.views || 0), 0);
        const eventViews = eventsResponse.data.data.reduce((sum, event) => sum + (event.views || 0), 0);
        const totalViews = newsViews + eventViews;

        setStats(prevStats => ({
          totalNews: newsResponse.data.data.length,
          totalEvents: eventsResponse.data.data.length,
          totalAdmins: adminsResponse?.data?.data?.length || prevStats.totalAdmins,
          totalViews
        }));

        // Set recent data
        setRecentNews(newsResponse.data.data);
        setRecentEvents(eventsResponse.data.data);
        
        // Combine news and events for display
        const combined = [
          ...newsResponse.data.data.map(item => ({ ...item, contentType: 'news' })),
          ...eventsResponse.data.data.map(item => ({ ...item, contentType: 'event' }))
        ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        setCombinedContent(combined);
        
        // Update last updated time
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error('Error refreshing data silently:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Filter content based on search term and active filter
  const applyFilters = (content, search, filter) => {
    let filtered = content;

    // Apply search filter
    if (search.trim()) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
        (item.author && item.author.toLowerCase().includes(search.toLowerCase()))
      );
    }

    // Apply type filter
    if (filter === 'news') {
      filtered = filtered.filter(item => item.contentType === 'news');
    } else if (filter === 'events') {
      filtered = filtered.filter(item => item.contentType === 'event');
    } else if (filter === 'upcoming') {
      filtered = filtered.filter(item => {
        const isEvent = item.contentType === 'event';
        const isUpcoming = item.type === 'Coming Soon';
        console.log('Upcoming filter check:', { title: item.title, contentType: item.contentType, type: item.type, isEvent, isUpcoming });
        return isEvent && isUpcoming;
      });
    } else if (filter === 'past') {
      filtered = filtered.filter(item => {
        const isEvent = item.contentType === 'event';
        const isPast = item.type === 'Past Event';
        console.log('Past filter check:', { title: item.title, contentType: item.contentType, type: item.type, isEvent, isPast });
        return isEvent && isPast;
      });
    }

    console.log('Filter applied:', { filter, originalCount: content.length, filteredCount: filtered.length });
    setFilteredContent(filtered);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    applyFilters(combinedContent, value, activeFilter);
  };

  // Handle filter change
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    applyFilters(combinedContent, searchTerm, filter);
  };

  // Function to handle view
  const handleView = (item, type) => {
    setViewingItem(item);
    setViewingType(type);
    setShowViewModal(true);
    setHideSidebar(true); // Hide sidebar when viewing
  };


  // Function to handle edit from view modal
  const handleEditFromView = () => {
    if (viewingItem && viewingType) {
      // Navigate to edit page instead of inline editing
      if (viewingType === 'event') {
        window.location.href = `/admin/events?edit=${viewingItem._id}`;
      } else {
        window.location.href = `/admin/news?edit=${viewingItem._id}`;
      }
      setShowViewModal(false);
    }
  };

  // Function to handle edit from dashboard
  const handleEditFromDashboard = (item, type) => {
    // Navigate to edit page instead of inline editing
    if (type === 'event') {
      window.location.href = `/admin/events?edit=${item._id}`;
    } else {
      window.location.href = `/admin/news?edit=${item._id}`;
    }
  };


  // Function to handle delete
  const handleDelete = (item, type) => {
    console.log('Delete button clicked:', { item: item.title, type, viewingType });
    setDeletingItem(item);
    setEditingType(type);
    setShowDeleteModal(true);
  };

  // Function to confirm delete
  const handleConfirmDelete = async () => {
    try {
      console.log('Confirming delete:', { item: deletingItem.title, type: editingType });
      
      if (editingType === 'event') {
        await eventAPI.delete(deletingItem._id);
      } else {
        await newsAPI.delete(deletingItem._id);
      }
      toast.success('Item deleted successfully!');
      
      setShowDeleteModal(false);
      setDeletingItem(null);
      
      // Close view modal if it's open
      setShowViewModal(false);
      setViewingItem(null);
      setViewingType('');
      
      // Auto-refresh data after delete immediately
      setTimeout(() => {
        refreshDataSilently();
      }, 100);
      
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Failed to delete item. Please try again.');
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, trend, subtitle }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
          {trend && (
            <p className="text-xs text-green-600 mt-1 flex items-center">
              <FiTrendingUp className="w-3 h-3 mr-1" />
              {trend}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const RecentItem = ({ item, type, onEdit, onDelete, onView }) => {
    const getIcon = () => {
      if (type === 'event') {
        return <FiCalendar className="w-5 h-5 text-green-600" />;
      }
      return <FiBookOpen className="w-5 h-5 text-blue-600" />;
    };

    const getTypeColor = () => {
      if (type === 'event') {
        return 'bg-green-100 text-green-800';
      }
      return 'bg-blue-100 text-blue-800';
    };

    const handleItemClick = () => {
      console.log('Item clicked:', { title: item.title, type, contentType: item.contentType, eventType: item.type });
      // Open the view modal instead of redirecting to frontend
      onView(item);
    };


    return (
      <div 
        className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow cursor-pointer"
        onClick={handleItemClick}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              {getIcon()}
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-gray-900 truncate max-w-xs">
              {item.title}
            </h4>
            <div className="flex items-center space-x-3 mt-1">
              <p className="text-xs text-gray-500">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
              <div className="flex items-center text-xs text-gray-500">
                <FiEye className="w-3 h-3 mr-1" />
                {item.views || 0} views
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor()}`}>
                {type === 'event' ? 'Event' : 'News'}
              </span>
              {type === 'event' && item.eventDate && (
                <span className="text-xs text-gray-500">
                  {new Date(item.eventDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => onView(item)}
            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
            title="View"
          >
            <FiEye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onEdit(item)}
            className="p-1 text-gray-400 hover:text-yellow-600 transition-colors"
            title="Edit"
          >
            <FiEdit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(item)}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
            title="Delete"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your content.</p>
          <div className="text-xs text-gray-500 mt-1 flex items-center">
            <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
            {isRefreshing && (
              <span className="ml-2 flex items-center text-green-600">
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-green-600 mr-1"></div>
                Updating...
              </span>
            )}
            <span className="ml-2">• Auto-refresh every 2 seconds</span>
            <span className="ml-2 text-green-600">• Real-time updates</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={refreshData}
            disabled={loading}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Refreshing...
              </>
            ) : (
              <>
                <FiActivity className="w-4 h-4 mr-2" />
                Refresh
              </>
            )}
          </button>
          <button 
            onClick={() => window.location.href = '/admin/news'}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
          >
            <FiPlus className="w-4 h-4 mr-2" />
            New Newsletter
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Newsletter & Events"
          value={stats.totalNews + stats.totalEvents}
          icon={FiBookOpen}
          color="bg-green-500"
          trend="+8% from last month"
        />
        <StatCard
          title="Total Admins"
          value={stats.totalAdmins}
          icon={FiUsers}
          color="bg-purple-500"
        />
        <StatCard
          title="Total Views"
          value={stats.totalViews.toLocaleString()}
          icon={FiEye}
          color="bg-orange-500"
          subtitle="Across all content"
          trend="+25% from last month"
        />
        <StatCard
          title="Published Content"
          value={recentNews.filter(item => item.isPublished).length}
          icon={FiCheckCircle}
          color="bg-blue-500"
          subtitle="Currently live"
        />
        </div>

      {/* Newsletter Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Newsletter & Events ({filteredContent.length})</h3>
              <button 
                onClick={refreshData}
                className="text-sm text-green-600 hover:text-green-700 font-medium"
              >
                Refresh
              </button>
            </div>
            
            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search by title or author name..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleFilterChange('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === 'all'
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  All ({combinedContent.length})
                </button>
                <button
                  onClick={() => handleFilterChange('news')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === 'news'
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  News ({combinedContent.filter(item => item.contentType === 'news').length})
                </button>
                <button
                  onClick={() => handleFilterChange('events')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === 'events'
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Events ({combinedContent.filter(item => item.contentType === 'event').length})
                </button>
                <button
                  onClick={() => handleFilterChange('upcoming')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === 'upcoming'
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Upcoming ({combinedContent.filter(item => item.contentType === 'event' && item.type === 'Coming Soon').length})
                </button>
                <button
                  onClick={() => handleFilterChange('past')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === 'past'
                      ? 'bg-orange-100 text-orange-700 border border-orange-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Past Events ({combinedContent.filter(item => item.contentType === 'event' && item.type === 'Past Event').length})
                </button>
              </div>
            </div>
          </div>
          <div className="p-6">
            {filteredContent.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredContent.map((item) => (
                  <RecentItem
                    key={`${item.contentType}-${item._id}`}
                    item={item}
                    type={item.contentType}
                    onView={(item) => handleView(item, item.contentType)}
                    onEdit={(item) => handleEditFromDashboard(item, item.contentType)}
                    onDelete={(item) => handleDelete(item, item.contentType)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FiBookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  {searchTerm || activeFilter !== 'all' 
                    ? 'No content found matching your search/filter criteria' 
                    : 'No newsletter or event content yet'
                  }
                </p>
                {!searchTerm && activeFilter === 'all' && (
                  <button className="mt-2 text-green-600 hover:text-green-700 text-sm font-medium">
                    Create your first content
                  </button>
                )}
              </div>
            )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => window.location.href = '/admin/news'}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <FiFileText className="w-6 h-6 text-blue-600 mb-2" />
            <h4 className="font-medium text-gray-900">Manage News</h4>
            <p className="text-sm text-gray-500">View, edit, and create news</p>
          </button>
          <button 
            onClick={() => window.location.href = '/admin/events'}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <FiCalendar className="w-6 h-6 text-green-600 mb-2" />
            <h4 className="font-medium text-gray-900">Manage Events</h4>
            <p className="text-sm text-gray-500">View, edit, and create events</p>
          </button>
          <button 
            onClick={() => window.location.href = '/admin/bookings'}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <FiCalendar className="w-6 h-6 text-purple-600 mb-2" />
            <h4 className="font-medium text-gray-900">View Bookings</h4>
            <p className="text-sm text-gray-500">Manage event registrations</p>
          </button>
          <button 
            onClick={() => window.location.href = '/admin/admins'}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
          >
            <FiUsers className="w-6 h-6 text-orange-600 mb-2" />
            <h4 className="font-medium text-gray-900">Manage Admins</h4>
            <p className="text-sm text-gray-500">Add or edit admin users</p>
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && deletingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                <FiTrash2 className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Confirmation</h3>
                <p className="text-sm text-gray-500">This action cannot be undone</p>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700">
                Are you sure you want to delete this {editingType === 'event' ? 'event' : 'news'}?
              </p>
              <div className="mt-2 p-3 bg-gray-50 rounded-md">
                <p className="text-sm font-medium text-gray-900">
                  {deletingItem.title}
                </p>
                <p className="text-xs text-gray-500">
                  Created: {new Date(deletingItem.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeletingItem(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors flex items-center"
              >
                <FiTrash2 className="w-4 h-4 mr-1" />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Page */}
      {showViewModal && viewingItem && (
        <div className="fixed inset-0 bg-gray-50 z-40 overflow-y-auto">
          {/* Header */}
          <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => {
                        setShowViewModal(false);
                        setViewingItem(null);
                        setViewingType('');
                        setHideSidebar(false); // Show sidebar when closing view
                      }}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
                    >
                      <FiX className="w-6 h-6" />
                    </button>
                    <h1 className="text-xl font-semibold text-gray-900">
                      View {viewingType === 'event' ? 'Event' : 'News'}
                    </h1>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={handleEditFromView}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                      <FiEdit3 className="w-4 h-4 mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Delete button clicked in view modal');
                        handleDelete(viewingItem, viewingType);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                    >
                      <FiTrash2 className="w-4 h-4 mr-2" />
                      Delete
                    </button>
                  </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Hero Section */}
              <div className="relative">
                {viewingItem.image && (
                  <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                    <img
                      src={Array.isArray(viewingItem.image) ? viewingItem.image[0] : viewingItem.image}
                      alt={viewingItem.title || viewingItem.name}
                      className="w-full h-96 object-cover"
                    />
                  </div>
                )}
                
                {!viewingItem.image && (
                  <div className="w-full h-96 flex items-center justify-center bg-gradient-to-br from-green-500 to-blue-600">
                    <div className="text-center text-white">
                      <FiImage className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium opacity-75">No Image Available</p>
                    </div>
                  </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                        viewingItem.isPublished 
                          ? 'bg-green-500 text-white' 
                          : 'bg-yellow-500 text-white'
                      }`}>
                        {viewingItem.isPublished ? 'Published' : 'Draft'}
                      </span>
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                        {viewingType === 'event' ? 'Event' : 'News'}
                      </span>
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-2 leading-tight">
                      {viewingItem.title}
                    </h1>
                    <div className="flex items-center space-x-6 text-white/90 text-sm">
                      <span className="flex items-center">
                        <FiUser className="w-4 h-4 mr-2" />
                        {viewingItem.author || 'Admin'}
                      </span>
                      <span className="flex items-center">
                        <FiCalendar className="w-4 h-4 mr-2" />
                        {new Date(viewingItem.createdAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <FiEye className="w-4 h-4 mr-2" />
                        {viewingItem.views || 0} views
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Content */}
                  <div className="lg:col-span-2 space-y-8">
                        {/* Content */}
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-4">Content</h2>
                          <div className="prose prose-lg max-w-none">
                            <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
                              {viewingItem.fullDescription || viewingItem.content}
                            </p>
                          </div>
                        </div>


                        {/* Event Details */}
                {(viewingItem.eventDate || viewingItem.location || (viewingType === 'event' && viewingItem.speakers?.length)) && (
                          <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Details</h2>
                            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                      {viewingType === 'event' && viewingItem.speakers?.length > 0 && (
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-indigo-100 rounded-lg">
                            <FiUser className="w-5 h-5 text-indigo-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">
                              {viewingItem.speakers.length > 1 ? 'Speakers' : 'Speaker'}
                            </p>
                            <div className="text-gray-900 font-medium space-y-1">
                              {viewingItem.speakers.map((speaker) => (
                                <div key={speaker}>{speaker}</div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                              {viewingItem.eventDate && (
                                <div className="flex items-center space-x-3">
                                  <div className="p-2 bg-blue-100 rounded-lg">
                                    <FiCalendar className="w-5 h-5 text-blue-600" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-500">Event Date</p>
                                    <p className="text-gray-900 font-medium">
                                      {new Date(viewingItem.eventDate).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                              )}
                              {viewingItem.eventTime && (
                                <div className="flex items-center space-x-3">
                                  <div className="p-2 bg-purple-100 rounded-lg">
                                    <FiClock className="w-5 h-5 text-purple-600" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-500">Event Time</p>
                                    <p className="text-gray-900 font-medium">
                                      {(() => {
                                        const timeString = viewingItem.eventTime;
                                        if (!timeString) return 'TBA';
                                        const timeParts = timeString.split(':');
                                        if (timeParts.length >= 2) {
                                          let hours = parseInt(timeParts[0], 10);
                                          const minutes = timeParts[1];
                                          const ampm = hours >= 12 ? 'PM' : 'AM';
                                          hours = hours % 12;
                                          hours = hours ? hours : 12;
                                          const minutesStr = minutes.length === 1 ? `0${minutes}` : minutes;
                                          return `${hours}:${minutesStr} ${ampm}`;
                                        }
                                        return timeString;
                                      })()}
                                    </p>
                                  </div>
                                </div>
                              )}
                              {viewingItem.location && (
                                <div className="flex items-center space-x-3">
                                  <div className="p-2 bg-green-100 rounded-lg">
                                    <FiMapPin className="w-5 h-5 text-green-600" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-500">Location</p>
                                    <p className="text-gray-900 font-medium">{viewingItem.location}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                    )}
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Info Card */}
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {viewingType === 'event' ? 'Event Information' : 'News Information'}
                      </h3>
                      <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium text-gray-500">Type</label>
                              <div className="mt-1">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                  {viewingType === 'event' ? 'Event' : 'News'}
                                </span>
                              </div>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-gray-500">Author</label>
                              <p className="text-gray-900 font-medium">{viewingItem.author}</p>
                            </div>
                            {viewingType === 'event' && viewingItem.speakers?.length > 0 && (
                              <div>
                                <label className="text-sm font-medium text-gray-500">
                                  {viewingItem.speakers.length > 1 ? 'Speakers' : 'Speaker'}
                                </label>
                                <div className="text-gray-900 font-medium space-y-1 mt-1">
                                  {viewingItem.speakers.map((speaker) => (
                                    <div key={speaker}>{speaker}</div>
                                  ))}
                                </div>
                              </div>
                            )}
                        <div>
                          <label className="text-sm font-medium text-gray-500">Status</label>
                          <div className="mt-1">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              viewingItem.isPublished 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {viewingItem.isPublished ? 'Published' : 'Draft'}
                            </span>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Created</label>
                          <p className="text-gray-900">{new Date(viewingItem.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Views</label>
                          <p className="text-gray-900">{viewingItem.views || 0}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;