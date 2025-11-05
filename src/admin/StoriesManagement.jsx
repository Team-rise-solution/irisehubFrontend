import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  FiArrowLeft,
  FiEye,
  FiCheckCircle,
  FiXCircle,
  FiTrash2,
  FiFilter,
  FiSearch,
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiImage,
  FiVideo
} from 'react-icons/fi';
import { storyAPI } from '../services/api';

const StoriesManagement = () => {
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingStory, setViewingStory] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [storyToReject, setStoryToReject] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  useEffect(() => {
    fetchStories();
  }, [statusFilter]);

  const fetchStories = async () => {
    try {
      setLoading(true);
      const params = statusFilter ? { status: statusFilter } : {};
      console.log('Fetching stories with params:', params);
      const response = await storyAPI.getAll(params);
      console.log('Stories API response:', response.data);
      console.log('Response success:', response.data.success);
      console.log('Response message:', response.data.message);
      console.log('Response error:', response.data.error);
      if (response.data.success) {
        setStories(response.data.data || []);
        console.log('Stories loaded:', response.data.data?.length || 0);
      } else {
        console.error('API returned success:false', response.data);
        toast.error(response.data.message || 'Failed to fetch stories');
      }
    } catch (error) {
      console.error('Error fetching stories:', error);
      console.error('Error response:', error.response);
      console.error('Error details:', error.response?.data);
      toast.error(error.response?.data?.message || 'Failed to fetch stories');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (storyId) => {
    try {
      const response = await storyAPI.approve(storyId);
      if (response.data.success) {
        toast.success('Story approved successfully!');
        fetchStories();
      }
    } catch (error) {
      console.error('Error approving story:', error);
      toast.error('Failed to approve story');
    }
  };

  const handleReject = async () => {
    if (!storyToReject) return;
    
    try {
      const response = await storyAPI.reject(storyToReject._id, rejectReason);
      if (response.data.success) {
        toast.success('Story rejected successfully!');
        setShowRejectModal(false);
        setStoryToReject(null);
        setRejectReason('');
        fetchStories();
      }
    } catch (error) {
      console.error('Error rejecting story:', error);
      toast.error('Failed to reject story');
    }
  };

  const handleDelete = async (storyId) => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      try {
        await storyAPI.delete(storyId);
        toast.success('Story deleted successfully!');
        fetchStories();
      } catch (error) {
        console.error('Error deleting story:', error);
        toast.error('Failed to delete story');
      }
    }
  };

  const handleView = (story) => {
    setViewingStory(story);
    setShowViewModal(true);
  };

  const filteredStories = stories.filter(story => {
    const matchesSearch = story.storyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || story.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const StoryCard = ({ story }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              story.status === 'approved' ? 'bg-green-100 text-green-800' :
              story.status === 'rejected' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {story.status.charAt(0).toUpperCase() + story.status.slice(1)}
            </span>
            <span className="text-sm text-gray-500">
              {formatDate(story.createdAt)}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {story.storyTitle}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {story.description}
          </p>
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center">
              <FiUser className="w-4 h-4 mr-1" />
              <span>{story.name}</span>
            </div>
            <div className="flex items-center">
              <FiMail className="w-4 h-4 mr-1" />
              <span>{story.email}</span>
            </div>
            <div className="flex items-center">
              <FiPhone className="w-4 h-4 mr-1" />
              <span>{story.number}</span>
            </div>
          </div>
          {(story.image || story.video) && (
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              {story.image && (
                <div className="flex items-center">
                  <FiImage className="w-4 h-4 mr-1" />
                  <span>Image</span>
                </div>
              )}
              {story.video && (
                <div className="flex items-center">
                  <FiVideo className="w-4 h-4 mr-1" />
                  <span>Video</span>
                </div>
              )}
            </div>
          )}
          {story.rejectedReason && (
            <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
              <strong>Rejection Reason:</strong> {story.rejectedReason}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={() => handleView(story)}
            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
            title="View"
          >
            <FiEye className="w-4 h-4" />
          </button>
          {story.status === 'pending' && (
            <>
              <button
                onClick={() => handleApprove(story._id)}
                className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                title="Approve"
              >
                <FiCheckCircle className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setStoryToReject(story);
                  setShowRejectModal(true);
                }}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                title="Reject"
              >
                <FiXCircle className="w-4 h-4" />
              </button>
            </>
          )}
          <button
            onClick={() => handleDelete(story._id)}
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
              <h1 className="text-3xl font-bold text-gray-900">Stories Management</h1>
              <p className="text-gray-600 mt-2">Manage user-submitted stories</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search stories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('');
              }}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
            >
              <FiFilter className="w-4 h-4 mr-2" />
              Clear Filters
            </button>
          </div>
        </div>

        {/* Stories List */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredStories.length > 0 ? (
            filteredStories.map((story) => (
              <StoryCard key={story._id} story={story} />
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <FiUser className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No stories found</h3>
              <p className="text-gray-500">No stories match your search criteria</p>
            </div>
          )}
        </div>

        {/* View Modal */}
        {showViewModal && viewingStory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">View Story</h2>
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    setViewingStory(null);
                  }}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FiXCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6">
                <div className="mb-4 flex items-center space-x-2">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                    viewingStory.status === 'approved' ? 'bg-green-100 text-green-800' :
                    viewingStory.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {viewingStory.status.charAt(0).toUpperCase() + viewingStory.status.slice(1)}
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {viewingStory.storyTitle}
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <FiUser className="w-4 h-4 mr-2" />
                    <span>{viewingStory.name}</span>
                  </div>
                  <div className="flex items-center">
                    <FiMail className="w-4 h-4 mr-2" />
                    <span>{viewingStory.email}</span>
                  </div>
                  <div className="flex items-center">
                    <FiPhone className="w-4 h-4 mr-2" />
                    <span>{viewingStory.number}</span>
                  </div>
                  <div className="flex items-center">
                    <FiCalendar className="w-4 h-4 mr-2" />
                    <span>{formatDate(viewingStory.createdAt)}</span>
                  </div>
                  <div className="flex items-center">
                    <FiEye className="w-4 h-4 mr-2" />
                    <span>{viewingStory.views || 0} views</span>
                  </div>
                </div>

                {viewingStory.image && (
                  <div className="mb-6">
                    <img
                      src={viewingStory.image}
                      alt={viewingStory.storyTitle}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                )}

                {viewingStory.video && (
                  <div className="mb-6">
                    <video
                      src={viewingStory.video}
                      controls
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Story Description</h3>
                  <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
                    {viewingStory.description}
                  </div>
                </div>

                {viewingStory.rejectedReason && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-semibold text-red-900 mb-2">Rejection Reason</h4>
                    <p className="text-red-700">{viewingStory.rejectedReason}</p>
                  </div>
                )}

                {viewingStory.status === 'pending' && (
                  <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => {
                        handleApprove(viewingStory._id);
                        setShowViewModal(false);
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                    >
                      <FiCheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        setStoryToReject(viewingStory);
                        setShowViewModal(false);
                        setShowRejectModal(true);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                    >
                      <FiXCircle className="w-4 h-4 mr-2" />
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Reject Modal */}
        {showRejectModal && storyToReject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Reject Story</h3>
              <p className="text-sm text-gray-600 mb-4">
                Story: <strong>{storyToReject.storyTitle}</strong>
              </p>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rejection Reason (Optional)
                </label>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter reason for rejection..."
                />
              </div>
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowRejectModal(false);
                    setStoryToReject(null);
                    setRejectReason('');
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReject}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Reject Story
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoriesManagement;

