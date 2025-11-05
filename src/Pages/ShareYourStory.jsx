import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiFileText, 
  FiImage, 
  FiUpload,
  FiCalendar,
  FiCheckCircle,
  FiXCircle,
  FiArrowRight
} from 'react-icons/fi';
import { storyAPI } from '../services/api';
import Header from '../Components/Home_Comp/Header';
import Footer from '../Components/Footer';

const ShareYourStory = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    storyTitle: '',
    description: '',
    media: null
  });
  const [loading, setLoading] = useState(false);
  const [stories, setStories] = useState([]);
  const [loadingStories, setLoadingStories] = useState(true);
  const [mediaType, setMediaType] = useState(null); // 'image' or 'video'

  useEffect(() => {
    fetchApprovedStories();
  }, []);

  const fetchApprovedStories = async () => {
    try {
      setLoadingStories(true);
      const response = await storyAPI.getApproved({ limit: 12 });
      if (response.data.success) {
        const storiesData = response.data.data || [];
        console.log('Stories fetched:', storiesData);
        console.log('First story:', storiesData[0]);
        if (storiesData[0]) {
          console.log('First story image:', storiesData[0].image);
          console.log('First story video:', storiesData[0].video);
        }
        setStories(storiesData);
      }
    } catch (error) {
      console.error('Error fetching stories:', error);
    } finally {
      setLoadingStories(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    console.log('📁 File selected:', file);
    if (file) {
      if (file.type.startsWith('image/')) {
        setMediaType('image');
        setFormData(prev => ({ ...prev, media: file }));
        console.log('✅ Image file set in formData:', file.name, file.type, file.size);
      } else {
        toast.error('Please select an image file');
        e.target.value = '';
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!formData.name || formData.name.trim().length < 2) {
      toast.error('Name must be at least 2 characters');
      setLoading(false);
      return;
    }
    if (!formData.number || formData.number.trim().length < 5) {
      toast.error('Phone number is required');
      setLoading(false);
      return;
    }
    if (!formData.email || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      toast.error('Valid email is required');
      setLoading(false);
      return;
    }
    if (!formData.storyTitle || formData.storyTitle.trim().length < 3) {
      toast.error('Story title must be at least 3 characters');
      setLoading(false);
      return;
    }
    if (!formData.description || formData.description.trim().length < 10) {
      toast.error('Description must be at least 10 characters');
      setLoading(false);
      return;
    }

    try {
      console.log('📤 Submitting story with data:', {
        name: formData.name,
        hasImage: !!formData.media,
        imageName: formData.media?.name,
        imageSize: formData.media?.size
      });
      const response = await storyAPI.submit(formData);
      
      if (response.data.success) {
        toast.success('Story submitted successfully! It will be reviewed by admin.');
        // Reset form
        setFormData({
          name: '',
          number: '',
          email: '',
          storyTitle: '',
          description: '',
          media: null
        });
        setMediaType(null);
        // Reset file input
        const fileInput = document.getElementById('image-upload');
        if (fileInput) fileInput.value = '';
      } else {
        toast.error(response.data.message || 'Failed to submit story');
      }
    } catch (error) {
      console.error('Error submitting story:', error);
      toast.error(error.response?.data?.message || 'Failed to submit story. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Share Your Story
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We'd love to hear from you! Share your experience, journey, or success story with our community.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit Your Story</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        name="number"
                        value={formData.number}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                  </div>

                  {/* Story Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Story Title <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiFileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="storyTitle"
                        value={formData.storyTitle}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Give your story a title"
                        required
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Story <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                      placeholder="Tell us your story... (minimum 10 characters)"
                      required
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image (Optional)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleMediaChange}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer flex flex-col items-center"
                      >
                        {formData.media ? (
                          <FiImage className="w-8 h-8 text-blue-600 mb-2" />
                        ) : (
                          <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                        )}
                        <span className="text-gray-600 font-medium">
                          {formData.media 
                            ? formData.media.name 
                            : 'Click to upload image'}
                        </span>
                        <span className="text-sm text-gray-500 mt-1">
                          PNG, JPG, GIF up to 20MB
                        </span>
                      </label>
                    </div>
                    {formData.media && (
                      <div className="mt-3">
                        <img
                          src={URL.createObjectURL(formData.media)}
                          alt="Preview"
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <FiCheckCircle className="w-4 h-4 mr-2" />
                        Submit Story
                      </>
                    )}
                  </button>

                  <p className="text-sm text-gray-500 text-center">
                    Your story will be reviewed by our admin team before being published.
                  </p>
                </form>
              </div>
            </div>

            {/* Recent Stories Section - News Style */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Stories</h2>
                
                {loadingStories ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : stories.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6">
                    {stories.map((story, index) => (
                      <article 
                        key={story._id} 
                        className="group cursor-pointer"
                        onClick={() => navigate(`/stories/${story._id}`)}
                      >
                        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-3 group-hover:scale-105">
                          {/* Cover Image */}
                          <div className="relative aspect-w-16 aspect-h-9 overflow-hidden">
                            {story.image && story.image.trim() !== '' && story.image !== 'null' ? (
                              <img
                                src={story.image}
                                alt={story.storyTitle}
                                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                                onError={(e) => {
                                  console.error('Image failed to load:', story.image);
                                  e.target.style.display = 'none';
                                  const placeholder = e.target.parentElement.querySelector('.no-image-placeholder');
                                  if (placeholder) placeholder.style.display = 'flex';
                                }}
                              />
                            ) : (
                              <div className="no-image-placeholder w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                <div className="text-center">
                                  <FiFileText className="text-4xl text-gray-400 mb-2" />
                                  <p className="text-gray-500 text-sm">No Image</p>
                                </div>
                              </div>
                            )}

                            {/* View Icon Overlay - Top Left Corner */}
                            <div className="absolute top-4 left-4">
                              <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <FiArrowRight className="w-5 h-5 text-gray-800 ml-1" />
                              </div>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                              {story.storyTitle}
                            </h3>

                            {/* Author and Date */}
                            <div className="flex items-center mb-4">
                              <FiUser className="text-gray-400 text-sm mr-2" />
                              <span className="text-sm text-gray-500 mr-4">{story.name}</span>
                              <FiCalendar className="text-gray-400 text-sm mr-2" />
                              <span className="text-sm text-gray-500">
                                {formatDate(story.approvedAt || story.createdAt)}
                              </span>
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                              {story.description}
                            </p>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-white rounded-xl shadow-lg p-6">
                    <FiFileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No stories yet. Be the first to share!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShareYourStory;

