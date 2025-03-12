import { useContext } from 'react'
import { ZooContext } from '../context/ZooContext'
import './animals.css'

function Animals() {
  const { animals, removeAnimal, updateAnimal } = useContext(ZooContext)

  const handleFeed = (animal) => {
    const newWeight = parseFloat(animal.weight) + 1
    updateAnimal(animal.id, { weight: newWeight.toString() })
  }

  return (
    <main>
      <h2>Animals in Your Zoo</h2>
      <p>Here's a list of all the animals currently in your zoo. Click on any animal for more details!</p>

      <div className="animal-grid">
        {animals.map(animal => (
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