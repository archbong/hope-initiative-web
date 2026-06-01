import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Programs from './pages/Programs'
import ProgramDetail from './pages/ProgramDetail'
import SuccessStories from './pages/SuccessStories'
import StoryDetail from './pages/StoryDetail'
import Gallery from './pages/Gallery'
import Volunteer from './pages/Volunteer'
import Donate from './pages/Donate'
import Partners from './pages/Partners'
import NewsEvents from './pages/NewsEvents'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import CookiePolicy from './pages/CookiePolicy'
import EventDetail from './pages/EventDetail'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/programs/:programId" element={<ProgramDetail />} />
        <Route path="/success-stories" element={<SuccessStories />} />
        <Route path="/success-stories/:storyId" element={<StoryDetail />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/news-events" element={<NewsEvents />} />
        <Route path="/news-events/:slug" element={<EventDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

export default App