import { useContext } from 'react'
import { ZooContext } from '../context/ZooContext'
import './animals.css'

function Animals() {
  const { animals, removeAnimal } = useContext(ZooContext)

  return (
    <main>
      <h2>Animals in Your Zoo</h2>
      <p>Here's a list of all the animals currently in your zoo. Click on any animal for more details!</p>

      <table>
        <caption>List of Animals in MyZoo</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Species</th>
            <th>Age</th>
            <th>Picture</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {animals.map(animal => (
            <tr key={animal.id}>
              <td>{animal.name}</td>
              <td>{animal.species}</td>
              <td>{animal.age}</td>
              <td>
                <img 
                  src={animal.imageUrl || "/images/placeholder.jpg"} 
                  alt={animal.name} 
                  className="animal-thumbnail"
                />
              </td>
              <td>
                <button 
                  onClick={() => removeAnimal(animal.id)}
                  className="remove-button"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}

export default Animals 