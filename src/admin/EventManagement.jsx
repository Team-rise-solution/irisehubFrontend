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
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUser,
  FiYoutube
} from 'react-icons/fi';
import { eventAPI } from '../services/api';

const EventManagement = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  const isEditing = !!editId;

  const [loading, setLoading] = useState(false);
  const [eventsList, setEventsList] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    type: 'Coming Soon',
    youtubeLink: '',
    eventDate: '',
    eventTime: '',
    location: '',
    image: null
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingEvent, setViewingEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
    if (isEditing && editId) {
      fetchEventById(editId);
    }
  }, [isEditing, editId]);

  const fetchEvents = async () => {
    try {
      const response = await eventAPI.getAll({ limit: 100 });
      if (response?.data?.data) {
        setEventsList(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchEventById = async (id) => {
    try {
      setLoading(true);
      const response = await eventAPI.getById(id);
      if (response?.data?.data) {
        const event = response.data.data;
        setFormData({
          title: event.title || '',
          shortDescription: event.shortDescription || '',
          fullDescription: event.fullDescription || '',
          type: event.type || 'Coming Soon',
          youtubeLink: event.youtubeLink || '',
          eventDate: event.eventDate ? new Date(event.eventDate).toISOString().split('T')[0] : '',
          eventTime: event.eventTime || '',
          location: event.location || '',
          image: null // Don't pre-fill image for editing
        });
        setShowForm(true);
      }
    } catch (error) {
      console.error('Error fetching event:', error);
      toast.error('Failed to load event for editing');
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
      
      const eventData = new FormData();
      eventData.append('title', formData.title.trim());
      eventData.append('shortDescription', formData.shortDescription.trim());
      eventData.append('fullDescription', formData.fullDescription.trim());
      eventData.append('author', 'Admin'); // Default author
      eventData.append('type', formData.type);
      eventData.append('youtubeLink', formData.youtubeLink.trim());
      eventData.append('eventDate', formData.eventDate);
      eventData.append('eventTime', formData.eventTime);
      eventData.append('location', formData.location.trim());
      
      if (formData.image) {
        eventData.append('image', formData.image);
      }

      let response;
      if (isEditing) {
        response = await eventAPI.update(editId, eventData);
      } else {
        response = await eventAPI.create(eventData);
      }
      
      if (response.data.success) {
        const action = isEditing ? 'updated' : 'created';
        setSuccess(`Event ${action} successfully! ✅`);
        toast.success(`Event ${action} successfully! ✅`);
        
        // Reset form
        setFormData({
          title: '',
          shortDescription: '',
          fullDescription: '',
          type: 'Coming Soon',
          youtubeLink: '',
          eventDate: '',
          eventTime: '',
          location: '',
          image: null
        });
        
        // Refresh events list
        await fetchEvents();
        setShowForm(false);
        
        // Navigate back after 2 seconds
        setTimeout(() => {
          navigate('/admin');
        }, 2000);
      } else {
        setError(response.data.message || `Failed to ${isEditing ? 'update' : 'create'} event`);
        toast.error(response.data.message || `Failed to ${isEditing ? 'update' : 'create'} event`);
      }
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'creating'} event:`, error);
      const errorMessage = error.response?.data?.message || `Failed to ${isEditing ? 'update' : 'create'} event. Please try again.`;
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event) => {
    navigate(`/admin/events?edit=${event._id}`);
  };

  const handleDelete = async (event) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await eventAPI.delete(event._id);
        toast.success('Event deleted successfully!');
        await fetchEvents();
      } catch (error) {
        console.error('Error deleting event:', error);
        toast.error('Failed to delete event');
      }
    }
  };

  const handleView = async (event) => {
    try {
      // Fetch full event details
      const response = await eventAPI.getById(event._id);
      if (response?.data?.data) {
        setViewingEvent(response.data.data);
        setShowViewModal(true);
      }
    } catch (error) {
      console.error('Error fetching event details:', error);
      toast.error('Failed to load event details');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const EventCard = ({ event }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <FiCalendar className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-600">Event</span>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">
              {formatDate(event.createdAt)}
            </span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              event.type === 'Coming Soon' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {event.type}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {event.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {event.shortDescription}
          </p>
          <div className="space-y-1 mb-3">
            {event.eventDate && (
              <div className="flex items-center text-sm text-gray-500">
                <FiClock className="w-4 h-4 mr-2" />
                <span>{formatDate(event.eventDate)}</span>
              </div>
            )}
            {event.location && (
              <div className="flex items-center text-sm text-gray-500">
                <FiMapPin className="w-4 h-4 mr-2" />
                <span>{event.location}</span>
              </div>
            )}
            {event.youtubeLink && (
              <div className="flex items-center text-sm text-gray-500">
                <FiYoutube className="w-4 h-4 mr-2" />
                <span>YouTube Video</span>
              </div>
            )}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <FiEye className="w-4 h-4 mr-1" />
            <span>{event.views || 0} views</span>
            <span className="mx-2">•</span>
            <span>By {event.author}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={() => handleView(event)}
            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
            title="View"
          >
            <FiEye className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleEdit(event)}
            className="p-2 text-gray-400 hover:text-yellow-600 transition-colors"
            title="Edit"
          >
            <FiEdit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(event)}
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
                {isEditing ? 'Edit Event' : 'Event Management'}
              </h1>
              <p className="text-gray-600 mt-2">
                {isEditing ? 'Update the event' : 'Manage all events'}
              </p>
            </div>
            {!isEditing && (
              <button
                onClick={() => setShowForm(!showForm)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
              >
                <FiPlus className="w-4 h-4 mr-2" />
                {showForm ? 'Cancel' : 'Add Event'}
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
                  Event Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter event title"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="Coming Soon">Coming Soon</option>
                  <option value="Past Event">Past Event</option>
                </select>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-y"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-y"
                  placeholder="Enter the full event description"
                  required
                />
              </div>

              {/* Event Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Date
                </label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Event Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Time
                </label>
                <input
                  type="time"
                  name="eventTime"
                  value={formData.eventTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter event location"
                />
              </div>

              {/* YouTube Link */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  YouTube Link
                </label>
                <input
                  type="url"
                  name="youtubeLink"
                  value={formData.youtubeLink}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter YouTube video URL"
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
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {isEditing ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    <>
                      <FiCalendar className="w-4 h-4 mr-2" />
                      {isEditing ? 'Update Event' : 'Create Event'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Events List */}
        {!showForm && (
          <div className="space-y-4">
            {eventsList.length > 0 ? (
              eventsList.map((event) => (
                <EventCard key={event._id} event={event} />
              ))
            ) : (
              <div className="text-center py-12">
                <FiCalendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No events yet</h3>
                <p className="text-gray-500 mb-4">Get started by creating your first event</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Create Event
                </button>
              </div>
            )}
          </div>
        )}

        {/* View Modal */}
        {showViewModal && viewingEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">View Event</h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(viewingEvent)}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center"
                    title="Edit"
                  >
                    <FiEdit3 className="w-4 h-4 mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setShowViewModal(false);
                      setViewingEvent(null);
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
                {viewingEvent.image && (
                  <div className="mb-6">
                    <img
                      src={Array.isArray(viewingEvent.image) ? viewingEvent.image[0] : viewingEvent.image}
                      alt={viewingEvent.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Status Badge */}
                <div className="mb-4 flex items-center space-x-2">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                    viewingEvent.isPublished 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {viewingEvent.isPublished ? 'Published' : 'Draft'}
                  </span>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                    viewingEvent.type === 'Coming Soon' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {viewingEvent.type || 'Coming Soon'}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {viewingEvent.title}
                </h1>

                {/* Meta Information */}
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center">
                    <FiUser className="w-4 h-4 mr-2" />
                    <span>{viewingEvent.author || 'Admin'}</span>
                  </div>
                  <div className="flex items-center">
                    <FiCalendar className="w-4 h-4 mr-2" />
                    <span>{new Date(viewingEvent.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <FiEye className="w-4 h-4 mr-2" />
                    <span>{viewingEvent.views || 0} views</span>
                  </div>
                </div>

                {/* Event Details */}
                {(viewingEvent.eventDate || viewingEvent.location || viewingEvent.eventTime) && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Event Details</h3>
                    <div className="space-y-2">
                      {viewingEvent.eventDate && (
                        <div className="flex items-center text-gray-700">
                          <FiClock className="w-4 h-4 mr-2 text-gray-500" />
                          <span>{formatDate(viewingEvent.eventDate)}</span>
                          {viewingEvent.eventTime && (
                            <span className="ml-2">at {viewingEvent.eventTime}</span>
                          )}
                        </div>
                      )}
                      {viewingEvent.location && (
                        <div className="flex items-center text-gray-700">
                          <FiMapPin className="w-4 h-4 mr-2 text-gray-500" />
                          <span>{viewingEvent.location}</span>
                        </div>
                      )}
                      {viewingEvent.youtubeLink && (
                        <div className="flex items-center text-gray-700">
                          <FiYoutube className="w-4 h-4 mr-2 text-gray-500" />
                          <a 
                            href={viewingEvent.youtubeLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Watch on YouTube
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Short Description */}
                {viewingEvent.shortDescription && (
                  <div className="mb-6">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {viewingEvent.shortDescription}
                    </p>
                  </div>
                )}

                {/* Full Description */}
                {viewingEvent.fullDescription && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Full Description</h3>
                    <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
                      {viewingEvent.fullDescription}
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

export default EventManagement;
