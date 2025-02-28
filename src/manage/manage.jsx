import { useState, useContext } from 'react'
import { ZooContext } from '../context/ZooContext'
import './manage.css'

function Manage() {
  const { addAnimal } = useContext(ZooContext)
  const [newAnimal, setNewAnimal] = useState({
    name: '',
    species: '',
    age: '',
    imageUrl: ''
  })
  const [previewImage, setPreviewImage] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewAnimal(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result)
        setNewAnimal(prev => ({
          ...prev,
          imageUrl: reader.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addAnimal(newAnimal)
    // Reset form
    setNewAnimal({
      name: '',
      species: '',
      age: '',
      imageUrl: ''
    })
    setPreviewImage(null)
  }

  return (
    <main>
      <h2>Add New Animal</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Animal Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newAnimal.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="species">Species:</label>
          <input
            type="text"
            id="species"
            name="species"
            value={newAnimal.species}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={newAnimal.age}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Animal Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            className="file-input"
          />
        </div>

        {previewImage && (
          <div className="image-preview-container">
            <img src={previewImage} alt="Preview" />
          </div>
        )}

        <button type="submit">Add Animal</button>
      </form>
    </main>
  )
}

export default Manage 