import { createContext, useState, useEffect } from 'react'

export const ZooContext = createContext()

export function ZooProvider({ children }) {
  const [animals, setAnimals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch animals from API when component mounts
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          setAnimals([])
          setLoading(false)
          return
        }

        const response = await fetch('/api/animals', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch animals')
        }

        const data = await response.json()
        setAnimals(data)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching animals:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAnimals()
  }, [])

  const addAnimal = async (animalData) => {
    setLoading(true)
    // Clear any previous errors when starting a new operation
    setError(null)
    
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No authentication token found')
      }

      let response
      
      if (animalData.imageFile) {
        // Handle file upload
        const formData = new FormData()
        formData.append('image', animalData.imageFile)
        formData.append('animal', JSON.stringify({
          name: animalData.name,
          species: animalData.species,
          age: animalData.age,
          weight: animalData.weight,
          type: animalData.type || 'mammal' // Default type if not provided
        }))
        
        response = await fetch('/api/animals', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        })
      } else {
        // Handle JSON data
        response = await fetch('/api/animals', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            name: animalData.name,
            species: animalData.species,
            age: animalData.age,
            weight: animalData.weight,
            type: animalData.type || 'mammal'
          })
        })
      }
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to add animal')
      }
      
      const newAnimal = await response.json()
      setAnimals(prevAnimals => [...prevAnimals, newAnimal])
      
      return newAnimal
    } catch (error) {
      setError(error.message || 'Failed to add animal')
      throw error
    } finally {
      setLoading(false)
    }
  }

  const removeAnimal = async (animalId) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const response = await fetch(`/api/animals/${animalId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to remove animal')
      }

      setAnimals(prev => prev.filter(animal => {
        // Handle both id and _id formats from MongoDB
        return animal.id !== animalId && animal._id !== animalId;
      }))
    } catch (err) {
      setError(err.message)
      console.error('Error removing animal:', err)
    }
  }

  const updateAnimal = async (animalId, updateData) => {
    setLoading(true)
    setError(null)
    
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No authentication token found')
      }

      const response = await fetch(`/api/animals/${animalId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      })

      if (!response.ok) {
        throw new Error('Failed to update animal')
      }

      setAnimals(prev => prev.map(animal => {
        // Handle both id and _id formats from MongoDB
        if (animal.id === animalId || animal._id === animalId) {
          return { ...animal, ...updateData };
        }
        return animal;
      }))
    } catch (err) {
      setError(err.message)
      console.error('Error updating animal:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ZooContext.Provider value={{ 
      animals, 
      addAnimal, 
      removeAnimal, 
      updateAnimal, 
      loading, 
      error 
    }}>
      {children}
    </ZooContext.Provider>
  )
} 