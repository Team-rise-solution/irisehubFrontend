import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCalendar, FiUser, FiMapPin, FiClock, FiArrowRight, FiImage } from 'react-icons/fi';
import { eventAPI } from '../services/api';
import Header from '../Components/Home_Comp/Header';
import Footer from '../Components/Footer';

const PastEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPastEvents();
  }, [currentPage]);

  const fetchPastEvents = async () => {
    try {
      setLoading(true);
      const response = await eventAPI.getAll({ page: currentPage, limit: 20 });
      if (response.data.success) {
        const allEvents = response.data.data;
        const now = new Date();
        
        // Filter only past events by admin choice
        const past = allEvents.filter(event => {
          return event.type === 'Past Event';
        });
        
        setEvents(past);
        setTotalPages(response.data.pagination.totalPages);
      }
    } catch (error) {
      console.error('Error fetching past events:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatEventDate = (dateString) => {
    if (!dateString) return 'TBA';
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatEventTime = (timeString) => {
    if (!timeString) return 'TBA';
    
    // If it's a date string, format it
    if (timeString.includes('T') || timeString.includes('-')) {
      return new Date(timeString).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    }
    
    // If it's a time string (HH:MM or HH:MM:SS), convert to 12-hour format
    const timeParts = timeString.split(':');
    if (timeParts.length >= 2) {
      let hours = parseInt(timeParts[0], 10);
      const minutes = timeParts[1];
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      const minutesStr = minutes.length === 1 ? `0${minutes}` : minutes;
      return `${hours}:${minutesStr} ${ampm}`;
    }
    
    return timeString;
  };

  const handleEventClick = (event) => {
    navigate(`/past-events/${event._id}`);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 pt-32">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
      <div className="min-h-screen bg-gray-50 pt-32">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Past Events</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Take a look at our previous events and see what we've accomplished together.
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {events.length > 0 ? (
              events.map((event) => (
                <div
                  key={event._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
                  onClick={() => handleEventClick(event)}
                >
                  {/* Event Image */}
                  <div className="relative h-64 rounded-t-2xl overflow-hidden">
                    {event.image ? (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <div className="text-center">
                          <FiImage className="text-4xl text-gray-400 mb-2" />
                          <p className="text-gray-500 text-sm">No Image</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Past Event
                      </span>
                    </div>
                    
                    {/* View Icon Overlay */}
                    <div className="absolute top-4 left-4">
                      <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <FiArrowRight className="w-5 h-5 text-gray-800 ml-1" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Event Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {event.title}
                    </h3>
                    
                    
                    {/* Event Date & Time */}
                    {(event.eventDate || event.eventTime) && (
                      <div className="flex items-center mb-2">
                        <FiClock className="text-gray-400 text-sm mr-2" />
                        <div className="flex flex-col">
                          {event.eventDate && (
                            <span className="text-sm text-gray-500 font-medium">
                              {formatEventDate(event.eventDate)}
                            </span>
                          )}
                          {event.eventTime && (
                            <span className="text-xs text-gray-400">
                              {formatEventTime(event.eventTime)}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Location */}
                    {event.location && (
                      <div className="flex items-center mb-4">
                        <FiMapPin className="text-gray-400 text-sm mr-2" />
                        <span className="text-sm text-gray-500">{event.location}</span>
                      </div>
                    )}
                    
                    {/* Description */}
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {event.shortDescription || event.fullDescription || 'No description available.'}
                    </p>
                    
                    {/* View Details Button */}
                    <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300">
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <FiCalendar className="text-6xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-500 mb-2">No Past Events</h3>
                <p className="text-gray-400">No past events to display at the moment.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center">
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
      <Footer />
    </>
  );
};

export default PastEvents;
