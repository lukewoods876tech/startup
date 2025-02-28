import { useContext, useState } from 'react'
import { ZooContext } from '../context/ZooContext'
import './animals.css'

function Animals() {
  const { animals, removeAnimal } = useContext(ZooContext)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  const filteredAnimals = animals.filter(animal => {
    const matchesSearch = animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         animal.species.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || animal.type === filterType
    return matchesSearch && matchesType
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
        />
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All Animals</option>
          <option value="mammal">Mammals</option>
          <option value="bird">Birds</option>
          <option value="reptile">Reptiles</option>
        </select>
      </div>

      <div className="animal-grid">
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
                <p className="age">Age: {animal.age} years</p>
                <p className="weight">Weight: {animal.weight} lbs</p>
              </div>
              <button 
                onClick={() => removeAnimal(animal.id)}
                className="remove-button"
              >
                Remove from Zoo
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Animals 