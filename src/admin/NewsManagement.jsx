import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  FiArrowLeft,
  FiImage,
  FiCheckCircle,
  FiXCircle,
  FiUpload,
  FiEdit3,
  FiTrash2,
  FiEye,
  FiPlus,
  FiBookOpen,
  FiUser,
  FiCalendar
} from 'react-icons/fi';
import { newsAPI } from '../services/api';

const NewsManagement = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  const isEditing = !!editId;

  const [loading, setLoading] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    image: null
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingNews, setViewingNews] = useState(null);

  useEffect(() => {
    fetchNews();
    if (isEditing && editId) {
      fetchNewsById(editId);
    }
  }, [isEditing, editId]);

  const fetchNews = async () => {
    try {
      const response = await newsAPI.getAll({ limit: 100 });
      if (response?.data?.data) {
        setNewsList(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const fetchNewsById = async (id) => {
    try {
      setLoading(true);
      const response = await newsAPI.getById(id);
      if (response?.data?.data) {
        const news = response.data.data;
        setFormData({
          title: news.title || '',
          shortDescription: news.shortDescription || '',
          fullDescription: news.fullDescription || '',
          image: null // Don't pre-fill image for editing
        });
        setShowForm(true);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      toast.error('Failed to load news for editing');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      setError('');
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Frontend validation
    if (!formData.title || formData.title.trim().length < 3) {
      setError('Title must be at least 3 characters');
      return;
    }

    if (!formData.shortDescription || formData.shortDescription.trim().length < 10) {
      setError('Short description must be at least 10 characters');
      return;
    }

    if (!formData.fullDescription || formData.fullDescription.trim().length < 10) {
      setError('Full description must be at least 10 characters');
      return;
    }

    try {
      setLoading(true);
      
      const newsData = new FormData();
      newsData.append('title', formData.title.trim());
      newsData.append('shortDescription', formData.shortDescription.trim());
      newsData.append('fullDescription', formData.fullDescription.trim());
      newsData.append('author', 'Admin'); // Default author
      
      if (formData.image) {
        newsData.append('image', formData.image);
      }

      let response;
      if (isEditing) {
        response = await newsAPI.update(editId, newsData);
      } else {
        response = await newsAPI.create(newsData);
      }
      
      if (response.data.success) {
        const action = isEditing ? 'updated' : 'created';
        setSuccess(`News ${action} successfully! ✅`);
        toast.success(`News ${action} successfully! ✅`);
        
        // Reset form
        setFormData({
          title: '',
          shortDescription: '',
          fullDescription: '',
          image: null
        });
        
        // Refresh news list
        await fetchNews();
        setShowForm(false);
        
        // Navigate back after 2 seconds
        setTimeout(() => {
          navigate('/admin');
        }, 2000);
      } else {
        setError(response.data.message || `Failed to ${isEditing ? 'update' : 'create'} news`);
        toast.error(response.data.message || `Failed to ${isEditing ? 'update' : 'create'} news`);
      }
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'creating'} news:`, error);
      const errorMessage = error.response?.data?.message || `Failed to ${isEditing ? 'update' : 'create'} news. Please try again.`;
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (news) => {
    navigate(`/admin/news?edit=${news._id}`);
  };

  const handleDelete = async (news) => {
    if (window.confirm('Are you sure you want to delete this news?')) {
      try {
        await newsAPI.delete(news._id);
        toast.success('News deleted successfully!');
        await fetchNews();
      } catch (error) {
        console.error('Error deleting news:', error);
        toast.error('Failed to delete news');
      }
    }
  };

  const handleView = async (news) => {
    try {
      // Fetch full news details
      const response = await newsAPI.getById(news._id);
      if (response?.data?.data) {
        setViewingNews(response.data.data);
        setShowViewModal(true);
      }
    } catch (error) {
      console.error('Error fetching news details:', error);
      toast.error('Failed to load news details');
    }
  };

  const NewsCard = ({ news }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <FiBookOpen className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">News</span>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">
              {new Date(news.createdAt).toLocaleDateString()}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {news.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {news.shortDescription}
          </p>
          <div className="flex items-center text-sm text-gray-500">
            <FiEye className="w-4 h-4 mr-1" />
            <span>{news.views || 0} views</span>
            <span className="mx-2">•</span>
            <span>By {news.author}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={() => handleView(news)}
            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
            title="View"
          >
            <FiEye className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleEdit(news)}
            className="p-2 text-gray-400 hover:text-yellow-600 transition-colors"
            title="Edit"
          >
            <FiEdit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(news)}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
            title="Delete"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Admin Dashboard
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {isEditing ? 'Edit News' : 'News Management'}
              </h1>
              <p className="text-gray-600 mt-2">
                {isEditing ? 'Update the news article' : 'Manage all news articles'}
              </p>
            </div>
            {!isEditing && (
              <button
                onClick={() => setShowForm(!showForm)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <FiPlus className="w-4 h-4 mr-2" />
                {showForm ? 'Cancel' : 'Add News'}
              </button>
            )}
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center">
                <FiCheckCircle className="w-5 h-5 mr-3" />
                <span>{success}</span>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center">
                <FiXCircle className="w-5 h-5 mr-3" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  News Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter news title"
                  required
                />
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description *
                </label>
                <textarea
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                  placeholder="Enter a brief description (this will be shown in the news list)"
                  required
                />
              </div>

              {/* Full Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Description *
                </label>
                <textarea
                  name="fullDescription"
                  value={formData.fullDescription}
                  onChange={handleInputChange}
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                  placeholder="Enter the full news content"
                  required
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-gray-600 font-medium">
                      {formData.image ? formData.image.name : 'Click to upload image'}
                    </span>
                    <span className="text-sm text-gray-500 mt-1">
                      PNG, JPG, GIF up to 10MB
                    </span>
                  </label>
                </div>
                {formData.image && (
                  <div className="mt-3">
                    <img
                      src={URL.createObjectURL(formData.image)}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    if (isEditing) {
                      navigate('/admin');
                    }
                  }}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {isEditing ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    <>
                      <FiImage className="w-4 h-4 mr-2" />
                      {isEditing ? 'Update News' : 'Create News'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* News List */}
        {!showForm && (
          <div className="space-y-4">
            {newsList.length > 0 ? (
              newsList.map((news) => (
                <NewsCard key={news._id} news={news} />
              ))
            ) : (
              <div className="text-center py-12">
                <FiBookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No news articles yet</h3>
                <p className="text-gray-500 mb-4">Get started by creating your first news article</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create News
                </button>
              </div>
            )}
          </div>
        )}

        {/* View Modal */}
        {showViewModal && viewingNews && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">View News</h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(viewingNews)}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center"
                    title="Edit"
                  >
                    <FiEdit3 className="w-4 h-4 mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setShowViewModal(false);
                      setViewingNews(null);
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Close"
                  >
                    <FiXCircle className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Image */}
                {viewingNews.image && (
                  <div className="mb-6">
                    <img
                      src={Array.isArray(viewingNews.image) ? viewingNews.image[0] : viewingNews.image}
                      alt={viewingNews.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Status Badge */}
                <div className="mb-4">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                    viewingNews.isPublished 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {viewingNews.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {viewingNews.title}
                </h1>

                {/* Meta Information */}
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center">
                    <FiUser className="w-4 h-4 mr-2" />
                    <span>{viewingNews.author || 'Admin'}</span>
                  </div>
                  <div className="flex items-center">
                    <FiCalendar className="w-4 h-4 mr-2" />
                    <span>{new Date(viewingNews.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <FiEye className="w-4 h-4 mr-2" />
                    <span>{viewingNews.views || 0} views</span>
                  </div>
                </div>

                {/* Short Description */}
                {viewingNews.shortDescription && (
                  <div className="mb-6">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {viewingNews.shortDescription}
                    </p>
                  </div>
                )}

                {/* Full Description */}
                {viewingNews.fullDescription && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Full Content</h3>
                    <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
                      {viewingNews.fullDescription}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsManagement;
