import { FaRegCalendar, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { newsAPI, eventAPI } from "../../services/api";
function NewsEvents() {
  const navigate = useNavigate();
  const [combinedContent, setCombinedContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentEvent, setCurrentEvent] = useState(0);
  const [visibleItems, setVisibleItems] = useState(4); // Number of items to show at once

  // Fetch ALL news and events from backend
  const fetchContent = async () => {
    try {
      setLoading(true);
      console.log('Fetching news and events...');
      
      let newsData = [];
      let eventsData = [];

      // Try to fetch news
      try {
        const newsResponse = await newsAPI.getAll({ limit: 1000 });
        newsData = newsResponse?.data?.data || [];
        console.log('News fetched successfully:', newsData.length, 'items');
      } catch (newsError) {
        console.error('Error fetching news:', newsError);
      }

      // Try to fetch events
      try {
        const eventsResponse = await eventAPI.getAll({ limit: 1000 });
        const allEvents = eventsResponse?.data?.data || [];
        
        // Show all events (both "Coming Soon" and "Past Event")
        // This allows users to see all events in the Latest News & Events section
        eventsData = allEvents;
        console.log('Events fetched successfully:', eventsData.length, 'items');
        console.log('Event types breakdown:', {
          'Coming Soon': allEvents.filter(e => e.type === 'Coming Soon').length,
          'Past Event': allEvents.filter(e => e.type === 'Past Event').length
        });
      } catch (eventsError) {
        console.error('Error fetching events:', eventsError);
      }

      // Combine ALL news and events (even if one API fails, show the other)
      const combined = [
        ...newsData.map(item => ({ ...item, contentType: 'news' })),
        ...eventsData.map(item => ({ ...item, contentType: 'event' }))
      ].sort((a, b) => {
        const getSortDate = (entry) => {
          if (entry.contentType === 'news') {
            return new Date(entry.publishedAt || entry.createdAt || 0);
          }
          return new Date(entry.eventDate || entry.createdAt || 0);
        };
        return getSortDate(b) - getSortDate(a);
      });

      console.log('Combined content:', combined.length, 'items');
      console.log('Content breakdown:', {
        news: combined.filter(item => item.contentType === 'news').length,
        events: combined.filter(item => item.contentType === 'event').length
      });

      setCombinedContent(combined);
    } catch (error) {
      console.error('Error in fetchContent:', error);
      setCombinedContent([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  useEffect(() => {
    if (combinedContent.length > 0) {
      const interval = setInterval(() => {
        setCurrentEvent((prev) => {
          const nextIndex = prev + 1;
          // If we've reached the end, start over
          if (nextIndex + visibleItems > combinedContent.length) {
            return 0;
          }
          return nextIndex;
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [combinedContent.length, visibleItems]);

  const handleItemClick = (item) => {
    if (item.contentType === 'news') {
      navigate(`/news/${item._id}`);
    } else if (item.contentType === 'event') {
      navigate(`/events/${item._id}`);
    }
  };

  const formatDate = (date) => {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const goToPrevious = () => {
    setCurrentEvent((prev) => {
      if (prev === 0) {
        return Math.max(0, combinedContent.length - visibleItems);
      }
      return prev - 1;
    });
  };

  const goToNext = () => {
    setCurrentEvent((prev) => {
      const nextIndex = prev + 1;
      if (nextIndex + visibleItems > combinedContent.length) {
        return 0;
      }
      return nextIndex;
    });
  };

  if (loading) {
    return (
      <div className="bg-[#F3F4F4] flex justify-center items-center px-[30px] pt-20 w-full h-[600px] mt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-iriseColor mx-auto mb-4"></div>
          <p className="text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

  if (combinedContent.length === 0) {
    return (
      <div className="bg-[#F3F4F4] flex justify-center items-center px-[30px] pt-20 w-full h-[600px] mt-20">
        <div className="text-center">
          <p className="text-gray-600">No content available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F3F4F4] flex justify-center overflow-hidden flex-col items-center px-[30px] pt-20 w-full h-[600px] mt-20">
      {/* Content Counter */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Latest News & Events</h2>
        <p className="text-gray-600">
          Showing {combinedContent.length} {combinedContent.length === 1 ? 'item' : 'items'} 
          ({combinedContent.filter(item => item.contentType === 'news').length} News, {combinedContent.filter(item => item.contentType === 'event').length} Events)
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors"
          disabled={combinedContent.length <= visibleItems}
        >
          <FaChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        
        <button
          onClick={goToNext}
          className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors"
          disabled={combinedContent.length <= visibleItems}
        >
          <FaChevronRight className="w-5 h-5 text-gray-600" />
        </button>

        <div className="flex ScrollEvents gap-10 justify-between">
          {combinedContent
            .slice(currentEvent, currentEvent + visibleItems)
            .map((item, index) => (
            <div
              key={`${item.contentType}-${item._id}`}
              onClick={() => handleItemClick(item)}
              className="w-[280px] shrink-0 h-[400px] relative bg-white p-3 group rounded-md hover:bg-iriseColor cursor-pointer transition-all duration-300"
            >
              <div className={`w-[130px] h-[30px] text-[12px] mt-3 border-1 group-hover:border-none group-hover:bg-white group-hover:text-black border-black rounded-full items-center flex justify-center ${
                item.contentType === 'news' 
                  ? 'bg-blue-100 text-blue-800 group-hover:bg-white group-hover:text-black' 
                  : 'bg-green-100 text-green-800 group-hover:bg-white group-hover:text-black'
              }`}>
                {item.contentType === 'news' ? '📰 News' : '📅 Event'}
              </div>
              <h1 className="text-[16px] text-gray-600 mt-5 font-semibold group-hover:text-white line-clamp-3">
                {item.title}
              </h1>
              <div className="absolute w-full items-center bottom-4 flex">
                {/* date */}
                <div className="flex gap-2 items-center -ml-9 rotate-270 mt-10">
                  <FaRegCalendar className="text-[14px] group-hover:text-white rotate-90" />
                  <h1 className="text-[14px] text-black group-hover:text-white">
                    {formatDate(item.contentType === 'news' ? (item.publishedAt || item.createdAt) : (item.eventDate || item.createdAt))}
                  </h1>
                </div>
                <div className="w-[180px] relative left-5 h-[140px]">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
                      <span className="text-gray-500 text-sm">No Image</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 mt-12">
        {Array.from({ length: Math.ceil(combinedContent.length / visibleItems) }, (_, index) => (
          <div
            key={index}
            className={`w-[20px] h-[6px] rounded-full transition-all duration-500 ${
              Math.floor(currentEvent / visibleItems) === index ? "bg-iriseColor scale-110" : "bg-white"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default NewsEvents;
