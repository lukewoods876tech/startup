import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ZooContext } from '../context/ZooContext'
import './animals.css'

function Animals() {
  const { animals, removeAnimal, updateAnimal } = useContext(ZooContext)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const handleFeed = (animal) => {
    const newWeight = parseFloat(animal.weight) + 1
    updateAnimal(animal.id, { weight: newWeight.toString() })
  }

  const filteredAnimals = animals.filter(animal => {
    const matchesSearch = animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         animal.species.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  return (
    <main>
      <h2>Animals in Your Zoo</h2>
      <p>Here's a list of all the animals currently in your zoo. Click on any animal for more details!</p>

      <div className="filters">
        <input 
          type="text" 
          placeholder="Search animals..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="full-width-search"
        />
      </div>

      <div className="animal-grid">
        {/* Add Animal Card - Always first */}
        <div className="animal-card add-animal-card" onClick={() => navigate('/manage')}>
          <div className="add-icon">+</div>
          <h3>Add New Animal</h3>
          <p>Click to expand your zoo</p>
        </div>

        {filteredAnimals.map(animal => (
          <div key={animal.id} className="animal-card">
            <img 
              src={animal.imageUrl || "/images/placeholder.jpg"} 
              alt={animal.name} 
              className="animal-image"
            />
            <div className="animal-info">
              <h3>{animal.name}</h3>
              <p className="species">{animal.species}</p>
              <div className="animal-stats">
                <p className="age">Age: {animal.age}</p>
                <p className="weight">Lbs: {animal.weight}</p>
              </div>
              <button 
                onClick={() => handleFeed(animal)}
                className="feed-button"
              >
                Feed Animal
              </button>
              <button 
                onClick={() => removeAnimal(animal.id)}
                className="remove-button"
              >
                Euthanize Animal
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Animals 