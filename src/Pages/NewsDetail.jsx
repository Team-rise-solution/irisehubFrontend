import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FiArrowLeft,
  FiUser, 
  FiCalendar, 
  FiEye, 
  FiShare2,
  FiClock,
  FiMapPin,
  FiPlay,
  FiHeart,
  FiBookmark,
} from 'react-icons/fi';
import { newsAPI } from '../services/api';
import Header from '../Components/Home_Comp/Header';
import Footer from '../Components/Footer';


const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [otherNews, setOtherNews] = useState([]);

  useEffect(() => {
    fetchNews();
    fetchOtherNews();
  }, [id]);


  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await newsAPI.getById(id);
      if (response.data.success) {
        setNews(response.data.data);
      } else {
        setError('News not found');
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      setError('Failed to load news');
    } finally {
      setLoading(false);
    }
  };

  const fetchOtherNews = async () => {
    try {
      const response = await newsAPI.getAll({ limit: 6 });
      if (response.data.success) {
        const allNews = response.data.data;
        const filteredNews = allNews.filter(item => item._id !== id);
        const sortedNews = filteredNews.sort(
          (a, b) => new Date(b.publishedAt || b.createdAt) - new Date(a.publishedAt || a.createdAt)
        );
        setOtherNews(sortedNews);
      }
    } catch (error) {
      console.error('Error fetching other news:', error);
    }
  };

  const formatDate = (date) => {
    if (!date) return '—';
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

  if (error || !news) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 pt-32">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">News Not Found</h1>
              <p className="text-gray-600 mb-6">{error || 'The requested news article could not be found.'}</p>
              <button
                onClick={() => navigate('/news')}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FiArrowLeft className="mr-2" />
                Back to News
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
      <div className="min-h-screen bg-white">
        {/* Header Section with Background Image */}
        <div className="relative h-96 w-full">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${news.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80'})`,
            }}
          />
        </div>
            
        {/* Main Content */}
        <div className="bg-gray-100 min-h-screen">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Content Section */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Content</h2>

            
                  {/* Full Content */}
                  <div className="prose prose-lg max-w-none">
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {news.fullDescription || news.shortDescription}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Newsletter Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Type</label>
                      <div className="mt-1">
                        <div className="w-full h-4 bg-blue-200 rounded"></div>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Published</label>
                      <p className="text-gray-900">{formatDate(news.publishedAt || news.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Other News Section */}
          <div className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Other News</h2>
                <p className="text-lg text-gray-600">Stay updated with our latest news and updates</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherNews.map((item, index) => (
                  <div
                    key={item._id || index}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer"
                    onClick={() => navigate(`/news/${item._id}`)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        navigate(`/news/${item._id}`)
                      }
                    }}
                  >
                    {item.image && (
                      <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                        <img
                          src={Array.isArray(item.image) ? item.image[0] : item.image}
                          alt={item.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          News
                        </span>
                        <span className="ml-auto text-sm text-gray-500">
                          {formatDate(item.publishedAt || item.createdAt)}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {item.shortDescription || item.content || 'No description available'}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {item.views || 0} views
                        </span>
                        <span className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors">
                          Read More
                          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {otherNews.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No other news available</h3>
                  <p className="text-gray-500">Check back later for more news and updates.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewsDetail;