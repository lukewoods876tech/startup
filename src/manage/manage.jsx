import { useState } from 'react'
import './manage.css'

function Manage() {
  const [imagePreview, setImagePreview] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setImagePreview(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleAddAnimal = (e) => {
    e.preventDefault()
    // Add animal logic here
  }

  const handleRemoveAnimal = (e) => {
    e.preventDefault()
    // Remove animal logic here
  }

  return (
    <main>
      <h2>Add a New Animal</h2>
      <form onSubmit={handleAddAnimal}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" required />
        <label htmlFor="species">Species:</label>
        <input type="text" id="species" required />
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" required />
        <label htmlFor="animal-image">Animal Image:</label>
        <input 
          type="file" 
          id="animal-image" 
          accept="image/*" 
          required 
          className="file-input"
          onChange={handleImageChange}
        />
        <div className="image-preview-container">
          {imagePreview && (
            <img 
              id="image-preview" 
              src={imagePreview} 
              alt="Image preview" 
              style={{ display: 'block' }}
            />
          )}
        </div>
        <button type="submit">Add Animal</button>
      </form>

      <h2>Remove an Animal</h2>
      <form onSubmit={handleRemoveAnimal}>
        <label htmlFor="remove-name">Animal Name:</label>
        <input type="text" id="remove-name" required />
        <button type="submit">Remove Animal</button>
      </form>
    </main>
  )
}

export default Manage 