import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FiArrowLeft,
  FiUser, 
  FiCalendar, 
  FiShare2,
  FiPlay,
  FiImage,
  FiVideo,
  FiFileText
} from 'react-icons/fi';
import { storyAPI } from '../services/api';
import Header from '../Components/Home_Comp/Header';
import Footer from '../Components/Footer';

const StoryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [otherStories, setOtherStories] = useState([]);

  useEffect(() => {
    fetchStory();
    fetchOtherStories();
  }, [id]);

  const fetchStory = async () => {
    try {
      setLoading(true);
      const response = await storyAPI.getById(id);
      if (response.data.success) {
        setStory(response.data.data);
      } else {
        setError('Story not found');
      }
    } catch (error) {
      console.error('Error fetching story:', error);
      setError('Failed to load story');
    } finally {
      setLoading(false);
    }
  };

  const fetchOtherStories = async () => {
    try {
      const response = await storyAPI.getApproved({ limit: 6 });
      if (response.data.success) {
        const allStories = response.data.data;
        const filteredStories = allStories.filter(item => item._id !== id);
        const sortedStories = filteredStories.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOtherStories(sortedStories);
      }
    } catch (error) {
      console.error('Error fetching other stories:', error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 pt-32">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !story) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 pt-32">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Story Not Found</h1>
              <p className="text-gray-600 mb-6">{error || 'The requested story could not be found.'}</p>
              <button
                onClick={() => navigate('/share-your-story')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FiArrowLeft className="inline mr-2" />
                Back to Stories
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => navigate('/share-your-story')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Stories
          </button>

          {/* Main Content */}
          <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Image/Video */}
            {(story.image || story.video) && (
              <div className="relative w-full h-96 overflow-hidden">
                {story.image ? (
                  <img
                    src={story.image}
                    alt={story.storyTitle}
                    className="w-full h-full object-cover"
                  />
                ) : story.video ? (
                  <video
                    src={story.video}
                    controls
                    className="w-full h-full object-cover"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : null}
              </div>
            )}

            {/* Content */}
            <div className="p-8 md:p-12">
              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {story.storyTitle}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-gray-200">
                <div className="flex items-center text-gray-600">
                  <FiUser className="mr-2" />
                  <span className="font-medium">{story.name}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FiCalendar className="mr-2" />
                  <span>{formatDate(story.approvedAt || story.createdAt)}</span>
                </div>
              </div>

              {/* Description */}
              <div className="prose prose-lg max-w-none mb-8">
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {story.description}
                </div>
              </div>

              {/* Share Button */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: story.storyTitle,
                        text: story.description,
                        url: window.location.href
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Link copied to clipboard!');
                    }
                  }}
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <FiShare2 className="mr-2" />
                  Share Story
                </button>
              </div>
            </div>
          </article>

          {/* Other Stories Section */}
          {otherStories.length > 0 && (
            <div className="mt-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Other Stories</h2>
                <p className="text-lg text-gray-600">Explore more stories from our community</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherStories.map((item, index) => (
                  <article
                    key={item._id || index}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer"
                    onClick={() => navigate(`/stories/${item._id}`)}
                  >
                    {item.image ? (
                      <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                        <img
                          src={item.image}
                          alt={item.storyTitle}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : item.video ? (
                      <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                        <video
                          src={item.video}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          muted
                        />
                      </div>
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <FiFileText className="text-4xl text-gray-400" />
                      </div>
                    )}
                    
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                          Story
                        </span>
                        <span className="ml-auto text-sm text-gray-500">
                          {formatDate(item.approvedAt || item.createdAt)}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {item.storyTitle}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center text-sm text-gray-500">
                        <FiUser className="mr-2" />
                        <span>{item.name}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default StoryDetail;

