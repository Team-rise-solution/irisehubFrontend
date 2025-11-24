import React, { useState, useEffect } from 'react';
import {
  FiSearch,
  FiFilter,
  FiDownload,
  FiEye,
  FiEdit,
  FiTrash2,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiExternalLink,
  FiFileText,
  FiArrowLeft
} from 'react-icons/fi';
import { bookingAPI, eventAPI } from '../services/api';

const BookingsManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [eventSearchTerm, setEventSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('bookingDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventBookings, setShowEventBookings] = useState(false);

  useEffect(() => {
    fetchBookings();
    fetchEvents();
  }, [currentPage, searchTerm, statusFilter, sortBy, sortOrder]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 10,
        search: searchTerm,
        sortBy,
        sortOrder
      };

      if (statusFilter !== 'all') {
        params.status = statusFilter;
      }

      const response = await bookingAPI.getAll(params);
      if (response.data.success) {
        setBookings(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };


  const fetchEvents = async () => {
    try {
      setEventsLoading(true);
      const response = await eventAPI.getAll();
      if (response.data.success) {
        setEvents(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setEventsLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      const response = await bookingAPI.updateStatus(bookingId, newStatus);
      if (response.data.success) {
        fetchBookings();
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update booking status');
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        const response = await bookingAPI.delete(bookingId);
        if (response.data.success) {
          fetchBookings();
        }
      } catch (error) {
        console.error('Error deleting booking:', error);
        alert('Failed to delete booking');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <FiCheckCircle className="w-4 h-4" />;
      case 'pending':
        return <FiClock className="w-4 h-4" />;
      case 'cancelled':
        return <FiXCircle className="w-4 h-4" />;
      default:
        return <FiClock className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCapitalize = (value) => {
    if (!value) return 'N/A';
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  // Calculate event-specific stats
  const getEventStats = () => {
    if (!showEventBookings || !bookings.length) {
      return { total: 0, pending: 0, confirmed: 0, cancelled: 0 };
    }

    const total = bookings.length;
    const pending = bookings.filter(booking => booking.status === 'pending').length;
    const confirmed = bookings.filter(booking => booking.status === 'confirmed').length;
    const cancelled = bookings.filter(booking => booking.status === 'cancelled').length;

    return { total, pending, confirmed, cancelled };
  };

  const handleEventClick = async (event) => {
    setSelectedEvent(event);
    setShowEventBookings(true);
    try {
      setLoading(true);
      const response = await bookingAPI.getByEvent(event._id);
      if (response.data.success) {
        // Filter bookings to only show those for the selected event
        const eventBookings = response.data.data.filter(booking => 
          booking.eventId && booking.eventId._id === event._id
        );
        setBookings(eventBookings);
      }
    } catch (error) {
      console.error('Error fetching event bookings:', error);
      // Fallback: filter from all bookings
      const eventBookings = bookings.filter(booking => 
        booking.eventId && booking.eventId._id === event._id
      );
      setBookings(eventBookings);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToAllBookings = () => {
    setShowEventBookings(false);
    setSelectedEvent(null);
    fetchBookings();
  };

  const exportBookingsToExcel = () => {
    const dataToExport = showEventBookings && selectedEvent 
      ? bookings.filter(booking => booking.eventId?._id === selectedEvent._id)
      : bookings;

    // Create Excel-compatible content
    const excelContent = [
      ['#', 'Full Name', 'Email', 'Phone', 'Location', 'Gender', 'Employment', 'Education', 'Expectation', 'Event Title', 'Event Date', 'Booking Date'],
      ...dataToExport.map((booking, index) => [
        index + 1,
        booking.fullName,
        booking.email,
        booking.mobileNumber,
        booking.location,
        formatCapitalize(booking.gender),
        formatCapitalize(booking.employmentStatus),
        booking.educationBackground || 'N/A',
        booking.expectation || '',
        booking.eventId?.title || 'Event Not Found',
        booking.eventId?.eventDate ? new Date(booking.eventId.eventDate).toLocaleDateString() : 'N/A',
        formatDate(booking.bookingDate)
      ])
    ];

    // Convert to Excel format (using HTML table format that Excel can open)
    const htmlContent = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" 
            xmlns:x="urn:schemas-microsoft-com:office:excel" 
            xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8">
        <meta name="ExcelCreated" content="true">
        <!--[if gte mso 9]>
        <xml>
          <x:ExcelWorkbook>
            <x:ExcelWorksheets>
              <x:ExcelWorksheet>
                <x:Name>Bookings</x:Name>
                <x:WorksheetOptions>
                  <x:DefaultRowHeight>285</x:DefaultRowHeight>
                </x:WorksheetOptions>
              </x:ExcelWorksheet>
            </x:ExcelWorksheets>
          </x:ExcelWorkbook>
        </xml>
        <![endif]-->
        <style>
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #000; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; font-weight: bold; }
        </style>
      </head>
      <body>
        <table>
          ${excelContent.map(row => 
            `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`
          ).join('')}
        </table>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { 
      type: 'application/vnd.ms-excel;charset=utf-8;' 
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedEvent ? selectedEvent.title + '-' : ''}bookings-${new Date().toISOString().split('T')[0]}.xls`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading && bookings.length === 0) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  // Filter events based on search
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(eventSearchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Event Bookings Management</h1>
        <p className="text-gray-600">Manage and track all event registrations</p>
      </div>

      {showEventBookings ? (
        // Bookings View for Selected Event
        <div>
          {/* Back Button */}
          <div className="mb-6">
            <button
              onClick={handleBackToAllBookings}
              className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FiArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </button>
          </div>

          {/* Event Info Header */}
          {selectedEvent && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedEvent.title}</h2>
              <p className="text-gray-600 mb-4">{selectedEvent.shortDescription}</p>
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <FiCalendar className="w-4 h-4 mr-2" />
                  {selectedEvent.eventDate ? new Date(selectedEvent.eventDate).toLocaleDateString() : 'TBD'}
                </div>
                <div className="flex items-center">
                  <FiMapPin className="w-4 h-4 mr-2" />
                  {selectedEvent.location || 'Location TBD'}
                </div>
                <div className="flex items-center">
                  <FiUser className="w-4 h-4 mr-2" />
                  {bookings.length} booking{bookings.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
          )}

          {/* Event-Specific Stats Cards */}
          {showEventBookings && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FiUser className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                    <p className="text-2xl font-bold text-gray-900">{getEventStats().total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <FiClock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-gray-900">{getEventStats().pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <FiCheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Confirmed</p>
                    <p className="text-2xl font-bold text-gray-900">{getEventStats().confirmed}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <FiXCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cancelled</p>
                    <p className="text-2xl font-bold text-gray-900">{getEventStats().cancelled}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bookings Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                      #
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                      Full Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                      Email
                </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                      Phone
                </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                      Location
                </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                      Gender
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                      Employment
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                      Education
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                      Expectation
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                  Booking Date
                </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
                <tbody className="bg-white">
                  {bookings.map((booking, index) => (
                    <tr key={booking._id} className="hover:bg-gray-50 transition-colors border-b border-gray-200">
                      <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 border-r border-gray-200">
                        {booking.fullName}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                          {booking.email}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                          {booking.mobileNumber}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                          {booking.location}
                  </td>
                      <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                          {formatCapitalize(booking.gender)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                          {formatCapitalize(booking.employmentStatus)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                          {booking.educationBackground || 'N/A'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                          <div className="max-w-xs truncate" title={booking.expectation}>
                            {booking.expectation || '—'}
                          </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                    {formatDate(booking.bookingDate)}
                  </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-1">
                      {/* Status Update Buttons */}
                      {booking.status !== 'confirmed' && (
                        <button
                          onClick={() => handleStatusUpdate(booking._id, 'confirmed')}
                              className="p-1.5 text-green-600 hover:bg-green-100 rounded transition-colors"
                          title="Confirm"
                        >
                          <FiCheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      {booking.status !== 'cancelled' && (
                        <button
                          onClick={() => handleStatusUpdate(booking._id, 'cancelled')}
                              className="p-1.5 text-red-600 hover:bg-red-100 rounded transition-colors"
                          title="Cancel"
                        >
                          <FiXCircle className="w-4 h-4" />
                        </button>
                      )}
                      {booking.status !== 'pending' && (
                        <button
                          onClick={() => handleStatusUpdate(booking._id, 'pending')}
                              className="p-1.5 text-yellow-600 hover:bg-yellow-100 rounded transition-colors"
                          title="Set Pending"
                        >
                          <FiClock className="w-4 h-4" />
                        </button>
                      )}
                      
                      {/* Delete Button */}
                      <button
                        onClick={() => handleDeleteBooking(booking._id)}
                            className="p-1.5 text-red-600 hover:bg-red-100 rounded transition-colors"
                        title="Delete"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

            {/* Export Button for Event Bookings */}
          <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
            <div className="text-sm text-gray-700">
                {bookings.length} booking{bookings.length !== 1 ? 's' : ''} for this event
            </div>
              <button
                onClick={exportBookingsToExcel}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <FiFileText className="w-4 h-4 mr-2" />
                Export Excel
              </button>
            </div>
      </div>

          {/* Empty State for Event Bookings */}
      {bookings.length === 0 && !loading && (
        <div className="text-center py-12">
          <FiUser className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-500">No registrations for this event yet.</p>
            </div>
          )}
        </div>
      ) : (
        // Events Table View
        <div>
          {/* Events Search */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">All Events</h2>
              <div className="relative w-80">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search events by title..."
                  value={eventSearchTerm}
                  onChange={(e) => setEventSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Events Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                      #
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                      Event Title
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                      Description
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                      Event Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                      Location
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {eventsLoading ? (
                    <tr>
                      <td colSpan="6" className="px-4 py-8 text-center">
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                      </td>
                    </tr>
                  ) : filteredEvents.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                        No events found
                      </td>
                    </tr>
                  ) : (
                    filteredEvents.map((event, index) => (
                      <tr key={event._id} className="hover:bg-gray-50 transition-colors border-b border-gray-200 cursor-pointer" onClick={() => handleEventClick(event)}>
                        <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                          {index + 1}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 border-r border-gray-200">
                          {event.title}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                          <div className="max-w-xs truncate" title={event.shortDescription}>
                            {event.shortDescription}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                          {event.eventDate ? new Date(event.eventDate).toLocaleDateString() : 'TBD'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200">
                          {event.location || 'Location TBD'}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEventClick(event);
                              }}
                              className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                            >
                              <FiEye className="w-4 h-4 mr-1" />
                              View Bookings
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default BookingsManagement;
