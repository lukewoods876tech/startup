import { useState, useContext } from 'react'
import { ZooContext } from '../context/ZooContext'
import './manage.css'

function Manage() {
  const { addAnimal, loading, error } = useContext(ZooContext)
  const [newAnimal, setNewAnimal] = useState({
    name: '',
    species: '',
    age: '',
    weight: '',
    imageUrl: '',
    imageFile: null
  })
  const [previewImage, setPreviewImage] = useState(null)
  const [submitting, setSubmitting] = useState(false)

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
          imageUrl: reader.result,
          imageFile: file
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await addAnimal(newAnimal)
      // Reset form
      setNewAnimal({
        name: '',
        species: '',
        age: '',
        weight: '',
        imageUrl: '',
        imageFile: null
      })
      setPreviewImage(null)
    } catch (err) {
      console.error('Error in form submission:', err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main>
      <h2>Add New Animal</h2>
      {error && <div className="error-message">{error}</div>}
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
          <label htmlFor="weight">Weight (lbs):</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={newAnimal.weight}
            onChange={handleInputChange}
            required
            min="0"
            step="0.1"
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

        <button 
          type="submit" 
          disabled={submitting || loading}
        >
          {submitting ? 'Adding...' : 'Add Animal'}
        </button>
      </form>
    </main>
  )
}

export default Manage 