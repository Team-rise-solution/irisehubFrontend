import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  FiArrowLeft,
  FiImage,
  FiCheckCircle,
  FiXCircle,
  FiUpload,
  FiCalendar,
  FiMapPin,
  FiVideo
} from 'react-icons/fi';
import { eventAPI } from '../services/api';

const AddEvent = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    author: '',
    type: 'Coming Soon',
    youtubeLink: '',
    eventDate: '',
    location: '',
    speakerType: 'single',
    speakerInput: '',
    image: null
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

    if (!formData.author || formData.author.trim().length < 2) {
      setError('Author name must be at least 2 characters');
      return;
    }

    const speakersList = formData.speakerType === 'single'
      ? [formData.speakerInput.trim()]
      : formData.speakerInput
          .split('\n')
          .map(name => name.trim())
          .filter(Boolean);

    if (!speakersList.length) {
      setError('Please provide at least one speaker name');
      return;
    }

    try {
      setLoading(true);
      
      const eventData = new FormData();
      eventData.append('title', formData.title.trim());
      eventData.append('shortDescription', formData.shortDescription.trim());
      eventData.append('fullDescription', formData.fullDescription.trim());
      eventData.append('author', formData.author.trim());
      eventData.append('type', formData.type);
      eventData.append('speakerType', formData.speakerType);
      eventData.append('speakers', JSON.stringify(speakersList));
      
      if (formData.youtubeLink) {
        eventData.append('youtubeLink', formData.youtubeLink.trim());
      }
      
      if (formData.eventDate) {
        eventData.append('eventDate', formData.eventDate);
      }
      
      if (formData.location) {
        eventData.append('location', formData.location.trim());
      }
      
      if (formData.image) {
        eventData.append('image', formData.image);
      }

      console.log('Creating event with data:', {
        title: formData.title,
        author: formData.author,
        type: formData.type,
        hasImage: !!formData.image,
        hasYoutubeLink: !!formData.youtubeLink
      });

      const response = await eventAPI.create(eventData);
      
      if (response.data.success) {
        setSuccess('Event created successfully! ✅');
        toast.success('Event created successfully! ✅');
        
        // Reset form
        setFormData({
          title: '',
          shortDescription: '',
          fullDescription: '',
          author: '',
          type: 'Coming Soon',
          youtubeLink: '',
          eventDate: '',
          location: '',
          speakerType: 'single',
          speakerInput: '',
          image: null
        });
        
        // Navigate back after 2 seconds
        setTimeout(() => {
          navigate('/admin');
        }, 2000);
      } else {
        setError(response.data.message || 'Failed to create event');
        toast.error(response.data.message || 'Failed to create event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      const errorMessage = error.response?.data?.message || 'Failed to create event. Please try again.';
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
          
          <h1 className="text-3xl font-bold text-gray-900">Add New Event</h1>
          <p className="text-gray-600 mt-2">Create a new event for your website</p>
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
                Event Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter event title"
                required
              />
            </div>

            {/* Author */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author Name *
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter author name"
                required
              />
            </div>

            {/* Event Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Type *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="Coming Soon">Coming Soon</option>
                <option value="Past Event">Past Event</option>
              </select>
            </div>

            {/* Speaker Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Speaker Mode *
                </label>
                <select
                  name="speakerType"
                  value={formData.speakerType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="single">Single Speaker</option>
                  <option value="multiple">Multiple Speakers</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {formData.speakerType === 'single' ? 'Speaker Name *' : 'Speakers List *'}
                </label>
                {formData.speakerType === 'single' ? (
                  <input
                    type="text"
                    name="speakerInput"
                    value={formData.speakerInput}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter speaker full name"
                    required
                  />
                ) : (
                  <textarea
                    name="speakerInput"
                    value={formData.speakerInput}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                    placeholder="Enter each speaker on a new line"
                    required
                  />
                )}
              </div>
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
                placeholder="Enter a brief description (this will be shown in the events list)"
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
                placeholder="Enter the full event description"
                required
              />
            </div>

            {/* Event Date and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiCalendar className="inline mr-2" />
                  Event Date
                </label>
                <input
                  type="datetime-local"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FiMapPin className="inline mr-2" />
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter event location"
                />
              </div>
            </div>

            {/* Video Link or Embed (for Past Events) */}
            {formData.type === 'Past Event' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FiVideo className="inline mr-2" />
                  Video Link or Embed (Optional)
                </label>
                <textarea
                  name="youtubeLink"
                  value={formData.youtubeLink}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                  placeholder="Paste a YouTube/Vimeo link, direct .mp4 URL, or iframe embed code"
                />
                <p className="text-sm text-gray-500 mt-1">
                  We&apos;ll automatically detect YouTube/Vimeo links or extract the src from iframe embed code.
                </p>
              </div>
            )}

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
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <FiCalendar className="w-4 h-4 mr-2" />
                    Create Event
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

export default AddEvent;
