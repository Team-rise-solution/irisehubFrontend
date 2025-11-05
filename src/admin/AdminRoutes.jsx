import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import AdminsManagement from './AdminsManagement';
import Analytics from './Analytics';
import Settings from './Settings';
import AddNews from './AddNews';
import AddEvent from './AddEvent';
import EventManagement from './EventManagement';
import NewsManagement from './NewsManagement';
import BookingsManagement from './BookingsManagement';
import StoriesManagement from './StoriesManagement';
import { SidebarProvider } from './SidebarContext';

const AdminRoutes = () => {
  return (
    <SidebarProvider>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="add-news" element={<AddNews />} />
          <Route path="news" element={<NewsManagement />} />
          <Route path="add-event" element={<AddEvent />} />
          <Route path="events" element={<EventManagement />} />
          <Route path="bookings" element={<BookingsManagement />} />
          <Route path="stories" element={<StoriesManagement />} />
          <Route path="admins" element={<AdminsManagement />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </SidebarProvider>
  );
};

export default AdminRoutes;
