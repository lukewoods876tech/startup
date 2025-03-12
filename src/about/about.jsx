import { useState, useEffect } from 'react'
import './about.css'

function About() {
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
      <h2>What is MyZoo?</h2>
      <p>
        MyZoo is a virtual zoo management application where you can create and manage
        your own zoo. Whether you're an animal enthusiast or just looking to have fun,
        MyZoo allows you to:
      </p>
      <ul>
        <li>Add and remove animals from your zoo.</li>
        <li>View detailed information about the animals.</li>
        <li>Explore fun facts about different species.</li>
        <li>Simulate a real-life zoo experience.</li>
      </ul>

      <div className="animal-fact-box">
        <h3>Random Animal Fact</h3>
        {loading ? (
          <p>Loading animal fact...</p>
        ) : (
          <p>{animalFact}</p>
        )}
      </div>

      <h2>Why Choose MyZoo?</h2>
      <p>
        MyZoo is designed to be user-friendly and educational. It combines interactive
        features with a clean design to make managing your virtual zoo an enjoyable
        experience. With placeholders for real-time updates and future integrations
        with APIs, MyZoo is continuously improving to bring you the best virtual zoo
        experience.
      </p>

      <h2>About the Team</h2>
      <p>
        MyZoo was developed as a project to showcase how web technologies can be used
        to create interactive and educational experiences. It's a simple but engaging
        platform designed for learning and entertainment.

        Here is an image of the founder and developer of MyZoo, Luke Woods: 
      </p>
      
      <img src="/images/luke professional image.jpg" alt="Luke Woods" width="200"/>
    </main>
  )
}

export default About 