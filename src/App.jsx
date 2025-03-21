import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './home/home'
import Manage from './manage/manage'
import Animals from './animals/animals'
import About from './about/about'
import Auth from './auth/Auth'
import { ZooProvider } from './context/ZooContext'

function App() {
  return (
    <ZooProvider>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/animals" element={<Animals />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
      <Footer />
    </ZooProvider>
  )
}

export default App 