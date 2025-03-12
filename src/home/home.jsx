import { useState, useEffect } from 'react'
import './home.css'

function Home() {
  const [animalFact, setAnimalFact] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnimalFact = async () => {
      try {
        const response = await fetch('/api/animalfact')
        const data = await response.json()
        setAnimalFact(data.fact || 'Did you know? Animals are fascinating creatures!')
      } catch (error) {
        console.error('Error fetching animal fact:', error)
        setAnimalFact('Did you know? Animals are fascinating creatures!')
      } finally {
        setLoading(false)
      }
    }

    fetchAnimalFact()
  }, [])

  return (
    <main>
      <section className="hero-section">
        <h2>Your Virtual Zoo</h2>
        <p>Manage your zoo, add animals, and keep track of your zoo's progress!</p>
        <img src="/images/zooentrance.webp" alt="Zoo Entrance" width="300"/>
      </section>
      
      <section className="featured-content">
        <div className="animal-fact-container">
          <div className="animal-fact-box">
            <h3>Random Animal Fact</h3>
            {loading ? (
              <p className="loading-text">Loading animal fact...</p>
            ) : (
              <p className="fact-text">{animalFact}</p>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home 