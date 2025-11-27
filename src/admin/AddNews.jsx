import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FiArrowLeft,
  FiImage,
  FiCheckCircle,
  FiXCircle,
  FiUpload,
  FiCalendar
} from 'react-icons/fi';
import { newsAPI } from '../services/api';

const getLocalDatetimeString = (value = new Date()) => {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60000);
  return localDate.toISOString().slice(0, 16);
};

const AddNews = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    image: null,
    publishedAt: getLocalDatetimeString()
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

      if (formData.publishedAt) {
        const isoString = new Date(formData.publishedAt).toISOString();
        newsData.append('publishedAt', isoString);
      }

      console.log('Creating news with data:', {
        title: formData.title,
        hasImage: !!formData.image
      });

      const response = await newsAPI.create(newsData);

      if (response.data.success) {
        setSuccess('News created successfully! ✅');
        toast.success('News created successfully! ✅');

        // Reset form
        setFormData({
          title: '',
          shortDescription: '',
          fullDescription: '',
          image: null,
          publishedAt: getLocalDatetimeString()
        });

        // Navigate back after 2 seconds
        setTimeout(() => {
          navigate('/admin');
        }, 2000);
      } else {
        setError(response.data.message || 'Failed to create news');
        toast.error(response.data.message || 'Failed to create news');
      }
    } catch (error) {
      console.error('Error creating news:', error);
      const errorMessage = error.response?.data?.message || 'Failed to create news. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin')}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Admin Dashboard
          </button>

          <h1 className="text-3xl font-bold text-gray-900">Add New News</h1>
          <p className="text-gray-600 mt-2">Create a new news article for your website</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
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

            {/* Publish Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Publish Date &amp; Time *
              </label>
              <div className="relative">
                <FiCalendar className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                <input
                  type="datetime-local"
                  name="publishedAt"
                  value={formData.publishedAt}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Set the published timestamp (can be backdated).
              </p>
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
                onClick={() => navigate('/admin')}
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
                    Creating...
                  </>
                ) : (
                  <>
                    <FiImage className="w-4 h-4 mr-2" />
                    Create News
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNews;
