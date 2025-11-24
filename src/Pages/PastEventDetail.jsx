import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiPlay, FiCalendar, FiUser, FiMapPin, FiClock, FiImage, FiArrowRight } from 'react-icons/fi';
import { eventAPI } from '../services/api';
import Header from '../Components/Home_Comp/Header';
import Footer from '../Components/Footer';

const PastEventDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pastEvents, setPastEvents] = useState([]);
    const [loadingPastEvents, setLoadingPastEvents] = useState(true);

    useEffect(() => {
        fetchEvent();
        fetchPastEvents();
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

    const fetchPastEvents = async () => {
        try {
            setLoadingPastEvents(true);
            const response = await eventAPI.getAll({ page: 1, limit: 50 });
            if (response.data.success) {
                const now = new Date();
                const past = response.data.data
                    .filter(event => {
                        if (!event.eventDate) return true;
                        return new Date(event.eventDate) < now;
                    })
                    .sort((a, b) => new Date(b.eventDate || b.createdAt) - new Date(a.eventDate || a.createdAt));
                setPastEvents(past);
            }
        } catch (error) {
            console.error('Error fetching past events:', error);
        } finally {
            setLoadingPastEvents(false);
        }
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

    const handleEventClick = (eventId) => {
        navigate(`/past-events/${eventId}`);
    };

    const speakerNames = event?.speakers?.length ? event.speakers : ['iRiseHub Team'];
    const hasMultipleSpeakers = speakerNames.length > 1;

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
                                onClick={() => navigate('/past-events')}
                                className="inline-flex items-center px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                <FiArrowLeft className="mr-2" />
                                Back to Past Events
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
            <div className="w-full pb-[60px] bg-black">
                <div className="w-full text-white pt-16 md:pt-24 px-4 sm:px-6 md:px-12 lg:px-20">
                    {/* title and date */}
                    <div>
                        {/* Title and Date */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                            <p className="text-xs sm:text-sm font-medium text-gray-300">PAST EVENT</p>
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
                            {event.youtubeLink && getYouTubeVideoId(event.youtubeLink) ? (
                                <iframe
                                    src={`https://www.youtube-nocookie.com/embed/${getYouTubeVideoId(event.youtubeLink)}?rel=0&modestbranding=1&showinfo=0&controls=1&fs=1&autoplay=0&iv_load_policy=3&playlist=${getYouTubeVideoId(event.youtubeLink)}`}
                                    title={event.title}
                                    className="absolute top-0 left-0 w-full h-full"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : event.image ? (
                                <div className="absolute top-0 left-0 w-full h-full">
                                    <img
                                        className="w-full h-full object-cover"
                                        src={event.image}
                                        alt={event.title}
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                                        <div className="text-center">
                                            <FiPlay className="text-4xl sm:text-6xl mb-4 mx-auto text-white" />
                                            <p className="text-base sm:text-lg text-white">No video available</p>
                                        </div>
                                    </div>
                                </div>
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
                </div>
            </div>

            {/* Past Events Section */}
            <div className="mt-20">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-white">Other Past Events</h2>
                    <button
                        onClick={() => navigate('/past-events')}
                        className="text-gray-300 hover:text-white transition-colors flex items-center"
                    >
                        View All Past Events
                        <FiArrowRight className="ml-2" />
                    </button>
                </div>

                {loadingPastEvents ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                    </div>
                ) : pastEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pastEvents.slice(0, 6).map((pastEvent) => (
                            <div
                                key={pastEvent._id}
                                className="relative group cursor-pointer bg-gray-900 rounded-2xl overflow-hidden hover:bg-gray-800 transition-all duration-300"
                                onClick={() => handleEventClick(pastEvent._id)}
                            >
                                <div className="relative h-64">
                                    {pastEvent.image ? (
                                        <img
                                            src={pastEvent.image}
                                            alt={pastEvent.title}
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

                                {/* Event Info */}
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                                        {pastEvent.title}
                                    </h3>
                                    
                                    <div className="flex items-center mb-2">
                                        <FiUser className="text-gray-400 text-sm mr-2" />
                                        <span className="text-sm text-gray-300">
                                            {pastEvent.speakers?.length
                                                ? pastEvent.speakers.join(', ')
                                                : 'iRiseHub Team'}
                                        </span>
                                    </div>
                                    
                                    {pastEvent.eventDate && (
                                        <div className="flex items-center mb-2">
                                            <FiCalendar className="text-gray-400 text-sm mr-2" />
                                            <span className="text-sm text-gray-300">
                                                {formatEventDate(pastEvent.eventDate)}
                                            </span>
                                        </div>
                                    )}
                                    
                                    {pastEvent.location && (
                                        <div className="flex items-center mb-3">
                                            <FiMapPin className="text-gray-400 text-sm mr-2" />
                                            <span className="text-sm text-gray-300">{pastEvent.location}</span>
                                        </div>
                                    )}
                                    
                                    <p className="text-gray-400 text-sm line-clamp-2">
                                        {pastEvent.shortDescription || pastEvent.fullDescription || 'No description available.'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <FiCalendar className="text-6xl text-gray-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-400 mb-2">No Past Events</h3>
                        <p className="text-gray-500">Check back later for past events.</p>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default PastEventDetail;