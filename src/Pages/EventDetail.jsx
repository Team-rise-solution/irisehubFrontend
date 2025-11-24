import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiPlay, FiCalendar, FiUser, FiMapPin, FiClock, FiImage, FiArrowRight, FiCheckCircle, FiX } from 'react-icons/fi';
import { eventAPI, bookingAPI } from '../services/api';
import Header from '../Components/Home_Comp/Header';
import Footer from '../Components/Footer';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedEvents, setRelatedEvents] = useState([]);
  const [loadingRelatedEvents, setLoadingRelatedEvents] = useState(true);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    fullName: '',
    email: '',
    location: '',
    mobileNumber: '',
    gender: '',
    educationBackground: '',
    employmentStatus: '',
    expectation: ''
  });

  // Check if event is upcoming based on admin choice
  const isUpcomingEvent = (event) => {
    return event && event.type === 'Coming Soon';
  };

  useEffect(() => {
    fetchEvent();
    fetchRelatedEvents();
  }, [id]);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const response = await eventAPI.getById(id);
      if (response.data.success) {
        setEvent(response.data.data);
      } else {
        setError('Event not found');
      }
    } catch (error) {
      console.error('Error fetching event:', error);
      setError('Failed to load event');
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedEvents = async () => {
    try {
      setLoadingRelatedEvents(true);
      const response = await eventAPI.getAll({ page: 1, limit: 50 });
      if (response.data.success) {
        // Filter out current event and get related events (same type)
        const allEvents = response.data.data;
        const related = allEvents
          .filter(e => e._id !== id) // Exclude current event
          .sort((a, b) => new Date(b.eventDate || b.createdAt) - new Date(a.eventDate || a.createdAt));
        setRelatedEvents(related);
      }
    } catch (error) {
      console.error('Error fetching related events:', error);
      setRelatedEvents([]);
    } finally {
      setLoadingRelatedEvents(false);
    }
  };

  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const formatEventDate = (dateString) => {
    if (!dateString) return 'TBA';
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).toUpperCase();
  };

  const formatEventTime = (timeString) => {
    if (!timeString) return 'TBA';
    
    // If it's a date string, format it
    if (timeString.includes('T') || timeString.includes('-')) {
      return new Date(timeString).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).toUpperCase();
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

  const handleBookingFormChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingLoading(true);

    try {
      const bookingData = {
        eventId: id,
        ...bookingForm
      };

      const response = await bookingAPI.create(bookingData);
      
      if (response.data.success) {
        setBookingSuccess(true);
        setBookingForm({
          fullName: '',
          email: '',
          location: '',
          mobileNumber: '',
          gender: '',
          educationBackground: '',
          employmentStatus: '',
          expectation: ''
        });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setBookingSuccess(false);
          setShowBookingForm(false);
        }, 5000);
      }
    } catch (error) {
      console.error('Booking error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to register for event';
      
      // Show specific error message for duplicate booking
      if (errorMessage.includes('already registered')) {
        alert('You have already registered for this event.');
      } else {
        alert(errorMessage);
      }
    } finally {
      setBookingLoading(false);
    }
  };

  const resetBookingForm = () => {
    setShowBookingForm(false);
    setBookingSuccess(false);
    setBookingForm({
      fullName: '',
      email: '',
      location: '',
      mobileNumber: '',
      gender: '',
      educationBackground: '',
      employmentStatus: '',
      expectation: ''
    });
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="w-full pb-[60px] bg-black">
          <div className="w-full text-white pt-40 px-20">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !event) {
    return (
      <>
        <Header />
        <div className="w-full pb-[60px] bg-black">
          <div className="w-full text-white pt-40 px-20">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
              <p className="text-gray-400 mb-6">{error || 'The requested event could not be found.'}</p>
              <button
                onClick={() => navigate('/events')}
                className="inline-flex items-center px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
              >
                <FiArrowLeft className="mr-2" />
                Back to Events
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const videoId = getYouTubeVideoId(event.youtubeLink);
  const speakerNames = event?.speakers?.length ? event.speakers : ['iRiseHub Team'];
  const hasMultipleSpeakers = speakerNames.length > 1;

  return (
    <>
      <Header />
      <div className="w-full pb-[60px] bg-black">
        <div className="w-full text-white pt-16 md:pt-24 px-4 sm:px-6 md:px-12 lg:px-20">
          {/* Title and Date */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
              <p className="text-xs sm:text-sm font-medium text-gray-300">
                {isUpcomingEvent(event) ? 'COMING SOON' : 'PAST EVENT'}
              </p>
              <p className="text-xs sm:text-sm font-medium text-gray-300">
                {event.eventDate ? formatEventDate(event.eventDate) : 'TBA'}
              </p>
            </div>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-300">
              Event time: {event.eventTime ? formatEventTime(event.eventTime) : (event.eventDate ? formatEventTime(event.eventDate) : 'TBA')}
            </p>
          </div>

          {/* Video Section - Fully Responsive */}
          <div className="w-full mt-6 sm:mt-8 md:mt-10">
            <div className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl" style={{ paddingBottom: '56.25%' }}>
              {/* 16:9 Aspect Ratio Container */}
              {videoId ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0&controls=1&fs=1&autoplay=0&iv_load_policy=3&playlist=${videoId}`}
                  title={event.title}
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : event.image ? (
                <img
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  src={event.image}
                  alt={event.title}
                />
              ) : (
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <div className="text-center">
                    <FiPlay className="text-4xl sm:text-6xl mb-4 mx-auto text-gray-400" />
                    <p className="text-base sm:text-lg text-gray-400">No content available</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Description - Responsive */}
          <div className="w-full max-w-2xl mt-8 sm:mt-10">
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              {event.fullDescription || event.shortDescription || 'No description available.'}
            </p>
          </div>

          {/* Event Details */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {event.eventDate && (
              <div className="flex items-center">
                <FiCalendar className="text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-400">Date</p>
                  <p className="text-white font-medium">{formatEventDate(event.eventDate)}</p>
                </div>
              </div>
            )}

            {event.location && (
              <div className="flex items-center">
                <FiMapPin className="text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="text-white font-medium">{event.location}</p>
                </div>
              </div>
            )}

            <div className="flex items-start">
              <FiUser className="text-gray-400 mr-3 mt-1" />
              <div>
                <p className="text-sm text-gray-400">
                  {hasMultipleSpeakers ? 'Speakers' : 'Speaker'}
                </p>
                <div className="text-white font-medium space-y-1">
                  {speakerNames.map((name) => (
                    <div key={name}>{name}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Section - Only for Upcoming Events */}
          {isUpcomingEvent(event) && (
            <div className="mt-12 max-w-2xl">
              <div className="bg-gray-900 rounded-2xl p-6 sm:p-8 border border-gray-800">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Register for Event</h3>
                  <p className="text-gray-400">Secure your spot at this amazing event</p>
                </div>

                {!showBookingForm ? (
                  <button
                    onClick={() => setShowBookingForm(true)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Book Now
                  </button>
                ) : (
                  <div className="space-y-4">
                    <form onSubmit={handleBookingSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={bookingForm.fullName}
                          onChange={handleBookingFormChange}
                          required
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={bookingForm.email}
                          onChange={handleBookingFormChange}
                          required
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your email"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Location *
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={bookingForm.location}
                          onChange={handleBookingFormChange}
                          required
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Where are you from?"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Gender *
                        </label>
                        <select
                          name="gender"
                          value={bookingForm.gender}
                          onChange={handleBookingFormChange}
                          required
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Education Background *
                        </label>
                        <input
                          type="text"
                          name="educationBackground"
                          value={bookingForm.educationBackground}
                          onChange={handleBookingFormChange}
                          required
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g. BSc Computer Science"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          name="mobileNumber"
                          value={bookingForm.mobileNumber}
                          onChange={handleBookingFormChange}
                          required
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your phone number"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Employment Status *
                        </label>
                        <select
                          name="employmentStatus"
                          value={bookingForm.employmentStatus}
                          onChange={handleBookingFormChange}
                          required
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select status</option>
                          <option value="employed">Employed</option>
                          <option value="unemployed">Unemployed</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Expectations *
                        </label>
                        <textarea
                          name="expectation"
                          value={bookingForm.expectation}
                          onChange={handleBookingFormChange}
                          rows={4}
                          required
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="What do you expect from this session?"
                        />
                      </div>

                      <div className="flex space-x-3">
                        <button
                          type="submit"
                          disabled={bookingLoading}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {bookingLoading ? 'Registering...' : 'Register'}
                        </button>
                        <button
                          type="button"
                          onClick={resetBookingForm}
                          className="px-4 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-all duration-200"
                        >
                          <FiX className="w-5 h-5" />
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {bookingSuccess && (
                  <div className="bg-green-900 border border-green-700 rounded-xl p-6 text-center animate-fadeIn mt-4">
                    <FiCheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-green-300 mb-2">Your booking has been submitted successfully!</h4>
                    <p className="text-green-400">Thank you for registering for this event. We'll send you a confirmation email shortly.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Events Section - Only show for past events */}
      {!isUpcomingEvent(event) && (
      <div className="mt-20 px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Related Events</h2>
          <button
            onClick={() => navigate('/events')}
            className="text-gray-300 hover:text-white transition-colors flex items-center"
          >
            View All Events
            <FiArrowRight className="ml-2" />
          </button>
        </div>

        {loadingRelatedEvents ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        ) : relatedEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedEvents.slice(0, 6).map((relatedEvent) => (
              <div
                key={relatedEvent._id}
                className="relative group cursor-pointer bg-gray-900 rounded-2xl overflow-hidden hover:bg-gray-800 transition-all duration-300"
                onClick={() => handleEventClick(relatedEvent._id)}
              >
                <div className="relative h-64">
                  {relatedEvent.image ? (
                    <img
                      src={relatedEvent.image}
                      alt={relatedEvent.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                      <div className="text-center">
                        <FiImage className="text-4xl text-gray-400 mb-2" />
                        <p className="text-gray-400 text-sm">No Image</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      relatedEvent.type === 'Coming Soon' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {relatedEvent.type === 'Coming Soon' ? 'Coming Soon' : 'Past Event'}
                    </span>
                  </div>
                  
                  {/* View Icon Overlay */}
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <FiArrowRight className="w-5 h-5 text-gray-800 ml-1" />
                    </div>
                  </div>
                </div>

                {/* Event Info */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                    {relatedEvent.title}
                  </h3>
                  
                  <div className="flex items-center mb-2">
                    <FiUser className="text-gray-400 text-sm mr-2" />
                    <span className="text-sm text-gray-300">
                      {relatedEvent.speakers?.length
                        ? relatedEvent.speakers.join(', ')
                        : 'iRiseHub Team'}
                    </span>
                  </div>
                  
                  {relatedEvent.eventDate && (
                    <div className="flex items-center mb-2">
                      <FiCalendar className="text-gray-400 text-sm mr-2" />
                      <span className="text-sm text-gray-300">
                        {formatEventDate(relatedEvent.eventDate)}
                      </span>
                    </div>
                  )}
                  
                  {relatedEvent.location && (
                    <div className="flex items-center mb-3">
                      <FiMapPin className="text-gray-400 text-sm mr-2" />
                      <span className="text-sm text-gray-300">{relatedEvent.location}</span>
                    </div>
                  )}
                  
                  <p className="text-gray-400 text-sm line-clamp-2">
                    {relatedEvent.shortDescription || relatedEvent.fullDescription || 'No description available.'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FiCalendar className="text-6xl text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No Related Events</h3>
            <p className="text-gray-500">Check back later for more events.</p>
          </div>
        )}
      </div>
      )}
      <Footer />
      
      {/* Custom CSS for animations */}
      <style jsx="true">{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </>
  );
};

export default EventDetail;
