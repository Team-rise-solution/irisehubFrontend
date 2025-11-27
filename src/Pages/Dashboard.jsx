import Sidebar from "../Components/Dashboard/Sidebar";
import { useState, useEffect } from "react";
import { newsAPI } from "../services/api";
import { FiEye, FiCalendar, FiUser, FiMapPin } from "react-icons/fi";
import { getSpeakerNames } from '../utils/speakerUtils';

function Dashboard (){
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            setLoading(true);
            const response = await newsAPI.getAll({ limit: 20, published: 'true' });
            setNews(response.data.data || []);
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return <div className="w-full min-h-screen bg-gray-50">
        <Sidebar />
        <div className="ml-64 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Latest News & Events</h1>
                
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {news.map((item) => (
                            <div key={item._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                {item.image && (
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-48 object-cover"
                                    />
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
                                                {getSpeakerNames(item).join(', ')}
                                            </span>
                                            <span className="flex items-center">
                                                <FiCalendar className="w-4 h-4 mr-1" />
                                                {formatDate(item.createdAt)}
                                            </span>
                                        </div>
                                        <span className="flex items-center">
                                            <FiEye className="w-4 h-4 mr-1" />
                                            {item.views || 0} views
                                        </span>
                                    </div>
                                    
                                    {(item.eventDate || item.location) && (
                                        <div className="mt-4 pt-4 border-t border-gray-200">
                                            {item.eventDate && (
                                                <div className="flex items-center text-sm text-gray-600 mb-2">
                                                    <FiCalendar className="w-4 h-4 mr-2" />
                                                    Event Date: {formatDate(item.eventDate)}
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
                        ))}
                    </div>
                )}
                
                {!loading && news.length === 0 && (
                    <div className="text-center py-12">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No news or events found</h3>
                        <p className="text-gray-500">Check back later for updates.</p>
                    </div>
                )}
            </div>
        </div>
    </div>
}
export default Dashboard;