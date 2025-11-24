import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiSearch, 
  FiFilter, 
  FiCalendar, 
  FiUser, 
  FiEye, 
  FiMapPin, 
  FiTag,
  FiImage,
  FiArrowLeft,
  FiGrid,
  FiList
} from 'react-icons/fi';
import { newsAPI } from '../services/api';

const PublicView = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const newsResponse = await newsAPI.getAll({ limit: 100, published: 'true' });
      
      setNews(newsResponse.data.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter data
  const allItems = news.map(newsItem => ({ ...newsItem, itemType: 'news' }));

  const filteredItems = allItems.filter(item => {
    const matchesSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'all' || item.type === selectedType;

    return matchesSearch && matchesType;
  });

  const types = ['all', ...new Set(news.map(newsItem => newsItem.type))];

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getImageUrl = (item) => {
    if (item.image) {
      return Array.isArray(item.image) ? item.image[0] : item.image;
    }
    return null;
  };

  const handleItemClick = (item) => {
    navigate(`/news/${item._id}`);
  };


  const NewsCard = ({ item }) => (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={() => handleItemClick(item)}
    >
      {getImageUrl(item) ? (
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={getImageUrl(item)}
            alt={item.title}
            className="w-full h-48 object-cover"
          />
        </div>
      ) : (
        <div className="w-full h-48 bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
          <FiImage className="w-12 h-12 text-white opacity-50" />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-3">
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
            {item.type}
          </span>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            News/Event
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {item.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {item.content}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <FiUser className="w-4 h-4 mr-1" />
              iRiseHub Team
            </span>
            <span className="flex items-center">
              <FiCalendar className="w-4 h-4 mr-1" />
              {formatDate(item.createdAt)}
            </span>
          </div>
        </div>
        
        {(item.eventDate || item.eventTime || item.location) && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            {item.eventDate && (
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <FiCalendar className="w-4 h-4 mr-2" />
                Event Date: {formatDate(item.eventDate)}
              </div>
            )}
            {item.eventTime && (
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <FiClock className="w-4 h-4 mr-2" />
                Event Time: {(() => {
                  const timeString = item.eventTime;
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
              </div>
            )}
            {item.location && (
              <div className="flex items-center text-sm text-gray-600">
                <FiMapPin className="w-4 h-4 mr-2" />
                {item.location}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const ListItem = ({ item }) => (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 cursor-pointer"
      onClick={() => handleItemClick(item)}
    >
      <div className="flex items-start space-x-4">
        {getImageUrl(item) ? (
          <img
            src={getImageUrl(item)}
            alt={item.title || item.name}
            className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
          />
        ) : (
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <FiImage className="w-8 h-8 text-white opacity-50" />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              {item.type}
            </span>
            <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
              News/Event
            </span>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {item.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {item.content}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <FiUser className="w-4 h-4 mr-1" />
              iRiseHub Team
            </span>
            <span className="flex items-center">
              <FiCalendar className="w-4 h-4 mr-1" />
              {formatDate(item.createdAt)}
            </span>
          </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.history.back()}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
              >
                <FiArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Content</h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
              >
                {viewMode === 'grid' ? <FiList className="w-5 h-5" /> : <FiGrid className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
              >
                <FiFilter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          {/* Search Bar */}
          <div className="relative mb-4">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search news and events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type (News/Events)
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {types.map(type => (
                      <option key={type} value={type}>
                        {type === 'all' ? 'All Types' : type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
          </p>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>View:</span>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
            >
              <FiGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
            >
              <FiList className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Grid/List */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <FiImage className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No content found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-4'
          }>
            {filteredItems.map((item, index) => (
              <div key={`${item.itemType}-${item._id}-${index}`}>
                {viewMode === 'grid' ? (
                  <NewsCard item={item} />
                ) : (
                  <ListItem item={item} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicView;
