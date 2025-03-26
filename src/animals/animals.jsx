import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ZooContext } from '../context/ZooContext'
import { useNotification } from '../context/NotificationContext'
import './animals.css'

function Animals() {
  const { animals, removeAnimal, updateAnimal } = useContext(ZooContext)
  const { showNotification } = useNotification()
  const [searchTerm, setSearchTerm] = useState('')
  const [animalToDelete, setAnimalToDelete] = useState(null)
  const navigate = useNavigate()

  const handleFeed = (animal) => {
    const newWeight = parseFloat(animal.weight) + 1
    updateAnimal(animal.id, { weight: newWeight.toString() })
  }
  
  const handleDeleteClick = (animal) => {
    setAnimalToDelete(animal)
  }
  
  const handleConfirmDelete = () => {
    if (animalToDelete) {
      removeAnimal(animalToDelete.id)
      showNotification(`${animalToDelete.name} has been removed from your zoo.`)
      setAnimalToDelete(null)
    }
  }
  
  const handleCancelDelete = () => {
    setAnimalToDelete(null)
  }

  const filteredAnimals = animals.filter(animal => {
    const matchesSearch = animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         animal.species.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  console.log('Animals loaded:', animals);

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
              onError={(e) => {
                console.error(`Failed to load image from: ${animal.imageUrl}`);
                console.error('Animal object:', animal);
                e.target.src = "/images/placeholder.jpg";
                e.target.onerror = null;
              }}
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
                onClick={() => handleDeleteClick(animal)}
                className="remove-button"
              >
                Euthanize Animal
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Confirmation Modal */}
      {animalToDelete && (
        <div className="delete-confirmation-overlay">
          <div className="delete-confirmation-modal">
            <span className="close-button" onClick={handleCancelDelete}>&times;</span>
            <h3>Confirm Euthanization</h3>
            <p>Are you sure you want to euthanize {animalToDelete.name}? This action cannot be undone.</p>
            <div className="confirmation-buttons">
              <button onClick={handleCancelDelete} className="cancel-button">Cancel</button>
              <button onClick={handleConfirmDelete} className="confirm-button">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default Animals 