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

  const addAnimal = async (animal) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      let response
      
      if (animal.imageFile) {
        // Handle file upload
        const formData = new FormData()
        formData.append('image', animal.imageFile)
        formData.append('animal', JSON.stringify({
          name: animal.name,
          species: animal.species,
          age: animal.age,
          weight: animal.weight
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
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(animal)
        })
      }

      if (!response.ok) {
        throw new Error('Failed to add animal')
      }

      const newAnimal = await response.json()
      setAnimals(prev => [...prev, newAnimal])
      return newAnimal
    } catch (err) {
      setError(err.message)
      console.error('Error adding animal:', err)
      throw err
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

      setAnimals(prev => prev.filter(animal => animal.id !== animalId))
    } catch (err) {
      setError(err.message)
      console.error('Error removing animal:', err)
    }
  }

  const updateAnimal = async (animalId, updates) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const response = await fetch(`/api/animals/${animalId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      })

      if (!response.ok) {
        throw new Error('Failed to update animal')
      }

      setAnimals(prev => prev.map(animal => 
        animal.id === animalId ? { ...animal, ...updates } : animal
      ))
    } catch (err) {
      setError(err.message)
      console.error('Error updating animal:', err)
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