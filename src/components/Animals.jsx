import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ZooContext } from '../context/ZooContext'
import './animals.css'

function Animals() {
  const { animals } = useContext(ZooContext)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const navigate = useNavigate()

  const filteredAnimals = animals.filter(animal => {
    const matchesSearch = animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         animal.species.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || animal.type === filterType
    return matchesSearch && matchesType
  })

  return (
    <main className="animals-container">
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

      <div className="animals-grid">
        {/* Add Animal Card - Always first */}
        <div className="animal-card add-animal-card" onClick={() => navigate('/manage')}>
          <div className="add-icon">+</div>
          <h3>Add New Animal</h3>
          <p>Click to expand your zoo</p>
        </div>

        {/* Existing Animals */}
        {filteredAnimals.map(animal => (
          <div key={animal.id} className="animal-card">
            {/* Your existing animal card content */}
            <h3>{animal.name}</h3>
            <p>{animal.species}</p>
            {/* Rest of your animal card content */}
          </div>
        ))}
      </div>
    </main>
  )
}

export default Animals 