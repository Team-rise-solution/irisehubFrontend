import { Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from "./Pages/Home"
import Ecosystem from "./Pages/Ecosystem"
import AboutUs from "./Pages/AboutUs"
import Community from "./Pages/Community"
import Startups from "./Pages/StartUps"
import AreasWeFocus from "./Pages/AreasWeFocus"
import Dashboard from "./Pages/Dashboard"
import NewsLetter from "./Pages/NewsLetter"
import RiseAcademy from "./Pages/EcosystemPages/RiseAcademy"
import PublicView from "./Pages/PublicView"
import NewsDetail from "./Pages/NewsDetail"
import EventDetail from "./Pages/EventDetail"
import NewsPage from "./Pages/NewsPage"
import EventsPage from "./Pages/EventsPage"
import UpcomingEvents from "./Pages/UpcomingEvents"
import UpcomingEventDetail from "./Pages/UpcomingEventDetail"
import PastEvents from "./Pages/PastEvents"
import PastEventDetail from "./Pages/PastEventDetail"
import ShareYourStory from "./Pages/ShareYourStory"
import StoryDetail from "./Pages/StoryDetail"
import AdminRoutes from "./admin/AdminRoutes"

// export const backendUrl = import.meta.env.VITE_BACKEND_URL= "http://localhost:3000"
function App (){

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ecosystem" element={<Ecosystem />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/community" element={<Community />} />
        <Route path="/startups" element={<Startups />} />
        <Route path="/areasWe" element={<AreasWeFocus />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/newsletter" element={<NewsLetter />} />
        <Route path="/riseAcademy" element={<RiseAcademy />} />
        <Route path="/public" element={<PublicView />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/upcoming-events" element={<UpcomingEvents />} />
        <Route path="/upcoming-events/:id" element={<UpcomingEventDetail />} />
        <Route path="/past-events" element={<PastEvents />} />
        <Route path="/past-events/:id" element={<PastEventDetail />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/share-your-story" element={<ShareYourStory />} />
        <Route path="/stories/:id" element={<StoryDetail />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
      
      {/* Toast Container for notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}
export default App