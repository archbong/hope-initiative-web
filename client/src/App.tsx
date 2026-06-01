import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Programs from './pages/Programs'
// import SuccessStories from './pages/SuccessStories'
// import Gallery from './pages/Gallery'
import Volunteer from './pages/Volunteer'
// import Donate from './pages/Donate'
// import Partners from './pages/Partners'
// import NewsEvents from './pages/NewsEvents'
// import Contact from './pages/Contact'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/programs" element={<Programs />} />
        {/* <Route path="/success-stories" element={<SuccessStories />} /> */}
        {/* <Route path="/gallery" element={<Gallery />} /> */}
        <Route path="/volunteer" element={<Volunteer />} />
        {/* <Route path="/donate" element={<Donate />} /> */}
        {/* <Route path="/partners" element={<Partners />} /> */}
        {/* <Route path="/news-events" element={<NewsEvents />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </Layout>
  )
}

export default App