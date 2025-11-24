import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiUser, FiMapPin, FiClock, FiArrowRight, FiImage } from 'react-icons/fi';
import { eventAPI } from '../services/api';
import Header from '../Components/Home_Comp/Header';
import Footer from '../Components/Footer';

const EventsPage = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [bookingData, setBookingData] = useState({ name: '', email: '' });

  useEffect(() => {
    fetchEvents();
  }, [currentPage]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await eventAPI.getAll({ page: currentPage, limit: 100 });
      if (response.data.success) {
        const allEvents = response.data.data;
        const now = new Date();
        
        // Separate upcoming and past events by admin choice
        const upcoming = allEvents.filter(event => {
          // Must be marked as 'Coming Soon' by admin
          if (event.type !== 'Coming Soon') {
            return false;
          }
          
          // If no event date, consider it upcoming (admin's choice)
          if (!event.eventDate) {
            return true;
          }
          
          // Check if event date has passed
          const eventDate = new Date(event.eventDate);
          
          // If event has both date and time, combine them for precise comparison
          if (event.eventTime) {
            const [hours, minutes] = event.eventTime.split(':');
            eventDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
          } else {
            // If only date, set to end of day (23:59:59)
            eventDate.setHours(23, 59, 59, 999);
          }
          
          // Event is upcoming if it's in the future
          return eventDate > now;
        });
        
        const past = allEvents.filter(event => {
          // Must be marked as 'Past Event' by admin
          return event.type === 'Past Event';
        });
        
        setUpcomingEvents(upcoming);
        setPastEvents(past);
        setTotalPages(response.data.pagination.totalPages);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
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

  const handleBookingClick = (event) => {
    setSelectedEvent(event);
    setShowBookingModal(true);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      // Here you would typically send booking data to backend
      console.log('Booking submitted:', {
        event: selectedEvent.title,
        name: bookingData.name,
        email: bookingData.email,
        eventDate: selectedEvent.eventDate
      });
      
      // Reset form and close modal
      setBookingData({ name: '', email: '' });
      setShowBookingModal(false);
      setSelectedEvent(null);
      
      // Show success message
      alert('Booking submitted successfully! You will receive a confirmation email.');
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Error submitting booking. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 pt-32">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
     

        {/* Upcoming Events */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Upcoming Events</h2>
          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event, index) => (
                <div key={event._id} className="group cursor-pointer">
                  <Link to={`/events/${event._id}`}>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-3 group-hover:scale-105">
                      {/* Cover Image */}
                      <div className="relative aspect-w-16 aspect-h-9 overflow-hidden">
                        {event.image ? (
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <div className="text-center">
                              <FiImage className="text-4xl text-gray-400 mb-2" />
                              <p className="text-gray-500 text-sm">No Image</p>
                            </div>
                          </div>
                        )}
                        
                        {/* Status Badge */}
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Upcoming
                          </span>
                        </div>
                        
                        {/* Play Icon Overlay - Top Left Corner */}
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
                        
                        {/* Speakers */}
                        <div className="flex items-center mb-2">
                          <FiUser className="text-gray-400 text-sm mr-2" />
                          <span className="text-sm text-gray-500">
                            {event.speakers?.length ? event.speakers.join(', ') : 'iRiseHub Team'}
                          </span>
                        </div>
                        
                        
                        {/* Event Date & Time */}
                        {event.eventDate && (
                          <div className="flex items-center mb-2">
                            <FiClock className="text-gray-400 text-sm mr-2" />
                            <div className="flex flex-col">
                              <span className="text-sm text-gray-500 font-medium">
                                {formatEventDate(event.eventDate)}
                              </span>
                              <span className="text-xs text-gray-400">
                                {formatEventTime(event.eventDate)}
                              </span>
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
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                          {event.shortDescription || event.fullDescription}
                        </p>
                        
                        {/* Color-coded bottom section */}
                        <div className={`h-1 rounded-b-2xl ${
                          index % 3 === 0 ? 'bg-gradient-to-r from-orange-500 to-red-600' :
                          index % 3 === 1 ? 'bg-gradient-to-r from-green-500 to-teal-600' :
                          'bg-gradient-to-r from-purple-500 to-pink-600'
                        }`}></div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              There are no upcoming events scheduled right now. Please check back soon.
            </p>
          )}
        </div>

        {/* Past Events */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Past Events</h2>
          {pastEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event, index) => (
                <div key={event._id} className="group cursor-pointer">
                  <Link to={`/events/${event._id}`}>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-3 group-hover:scale-105 opacity-90 hover:opacity-100">
                      {/* Cover Image */}
                      <div className="relative aspect-w-16 aspect-h-9 overflow-hidden">
                        {event.image ? (
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                          />
                        ) : (
                          <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
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
                        
                        {/* Play Icon Overlay - Top Left Corner */}
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
                        
                        {/* Speakers */}
                        <div className="flex items-center mb-2">
                          <FiUser className="text-gray-400 text-sm mr-2" />
                          <span className="text-sm text-gray-500">
                            {event.speakers?.length ? event.speakers.join(', ') : 'iRiseHub Team'}
                          </span>
                        </div>
                        
                        
                        {/* Event Date & Time */}
                        {event.eventDate && (
                          <div className="flex items-center mb-2">
                            <FiClock className="text-gray-400 text-sm mr-2" />
                            <div className="flex flex-col">
                              <span className="text-sm text-gray-500 font-medium">
                                {formatEventDate(event.eventDate)}
                              </span>
                              <span className="text-xs text-gray-400">
                                {formatEventTime(event.eventDate)}
                              </span>
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
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                          {event.shortDescription || event.fullDescription}
                        </p>
                        
                        {/* Color-coded bottom section */}
                        <div className={`h-1 rounded-b-2xl ${
                          index % 3 === 0 ? 'bg-gradient-to-r from-gray-500 to-gray-600' :
                          index % 3 === 1 ? 'bg-gradient-to-r from-gray-600 to-gray-700' :
                          'bg-gradient-to-r from-gray-700 to-gray-800'
                        }`}></div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📚</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No Past Events</h3>
              <p className="text-gray-500">Past events will appear here once they are completed.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <span className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              {currentPage} of {totalPages}
            </span>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Book Event</h3>
            
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">{selectedEvent.title}</h4>
              {selectedEvent.eventDate && (
                <p className="text-sm text-gray-600 mb-1">
                  <FiClock className="inline mr-2" />
                  {formatEventDate(selectedEvent.eventDate)}
                </p>
              )}
              {selectedEvent.location && (
                <p className="text-sm text-gray-600">
                  <FiMapPin className="inline mr-2" />
                  {selectedEvent.location}
                </p>
              )}
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={bookingData.name}
                  onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={bookingData.email}
                  onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowBookingModal(false);
                    setSelectedEvent(null);
                    setBookingData({ name: '', email: '' });
                  }}
                  className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default EventsPage;
