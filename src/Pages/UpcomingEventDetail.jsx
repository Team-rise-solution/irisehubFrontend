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
  FiMail,
  FiPhone,
  FiCheckCircle,
  FiX
} from 'react-icons/fi';
import { eventAPI, bookingAPI } from '../services/api';
import Header from '../Components/Home_Comp/Header';
import Footer from '../Components/Footer';

const UpcomingEventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    fetchEvent();
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

  const formatEventDate = (dateString) => {
    if (!dateString) return 'TBA';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const formatEventTime = (dateString) => {
    if (!dateString) return 'TBA';
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
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
        eventId: event._id,
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
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          setBookingSuccess(false);
          setShowBookingForm(false);
        }, 3000);
      } else {
        alert(response.data.message || 'Failed to book event');
      }
    } catch (error) {
      console.error('Error booking event:', error);
      const errorMessage = error.response?.data?.message || 'Failed to book event';
      
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

  if (error || !event) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 pt-32">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
              <p className="text-gray-600 mb-6">{error || 'The requested event could not be found.'}</p>
              <button
                onClick={() => navigate('/upcoming-events')}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FiArrowLeft className="mr-2" />
                Back to Upcoming Events
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
        {/* Header Section with Person Background Image */}
        <div className="relative h-96 w-full">
          {/* Background Image - Person's photo */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-gray-200"
            style={{
              backgroundImage: `url(${event.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
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
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {event.fullDescription || event.shortDescription || 'No description available for this event.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Booking Event
                  </h3>
                  
                  {/* Booking Section */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    {!showBookingForm ? (
                      <button
                        onClick={() => setShowBookingForm(true)}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Register for Event
                      </button>
                    ) : (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold text-gray-900">Event Registration</h4>
                          <button
                            onClick={resetBookingForm}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <FiX className="w-5 h-5" />
                          </button>
                        </div>

                        {bookingSuccess ? (
                          <div className="text-center py-4">
                            <FiCheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                            <p className="text-green-600 font-medium">Registration Successful!</p>
                            <p className="text-sm text-gray-500">You will receive a confirmation email shortly.</p>
                          </div>
                        ) : (
                          <form onSubmit={handleBookingSubmit} className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name *
                              </label>
                              <input
                                type="text"
                                name="fullName"
                                value={bookingForm.fullName}
                                onChange={handleBookingFormChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your full name"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email *
                              </label>
                              <input
                                type="email"
                                name="email"
                                value={bookingForm.email}
                                onChange={handleBookingFormChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your email"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Location *
                              </label>
                              <input
                                type="text"
                                name="location"
                                value={bookingForm.location}
                                onChange={handleBookingFormChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your location"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Gender *
                              </label>
                              <select
                                name="gender"
                                value={bookingForm.gender}
                                onChange={handleBookingFormChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                              >
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Education Background *
                              </label>
                              <input
                                type="text"
                                name="educationBackground"
                                value={bookingForm.educationBackground}
                                onChange={handleBookingFormChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g. BBA Finance"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Mobile Number *
                              </label>
                              <input
                                type="tel"
                                name="mobileNumber"
                                value={bookingForm.mobileNumber}
                                onChange={handleBookingFormChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your mobile number"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Employment Status *
                              </label>
                              <select
                                name="employmentStatus"
                                value={bookingForm.employmentStatus}
                                onChange={handleBookingFormChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                              >
                                <option value="">Select status</option>
                                <option value="employed">Employed</option>
                                <option value="unemployed">Unemployed</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Expectations *
                              </label>
                              <textarea
                                name="expectation"
                                value={bookingForm.expectation}
                                onChange={handleBookingFormChange}
                                rows={3}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="What do you hope to gain from this session?"
                              />
                            </div>

                            <button
                              type="submit"
                              disabled={bookingLoading}
                              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {bookingLoading ? (
                                <div className="flex items-center justify-center">
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                  Registering...
                                </div>
                              ) : (
                                'Complete Registration'
                              )}
                            </button>
                          </form>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UpcomingEventDetail;