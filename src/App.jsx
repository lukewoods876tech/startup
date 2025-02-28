import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Home from './home/home'
import Manage from './manage/manage'
import Animals from './animals/animals'
import About from './about/about'
import Login from './login/login'
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
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </ZooProvider>
  )
}

export default App 