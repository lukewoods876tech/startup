import { createContext, useState, useEffect } from 'react'

export const ZooContext = createContext()

export function ZooProvider({ children }) {
  const [animals, setAnimals] = useState(() => {
    // Load animals from localStorage on initialization
    const savedAnimals = localStorage.getItem('zooAnimals')
    return savedAnimals ? JSON.parse(savedAnimals) : []
  })

  // Save animals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('zooAnimals', JSON.stringify(animals))
  }, [animals])

  const addAnimal = (animal) => {
    setAnimals(prevAnimals => [...prevAnimals, {
      ...animal,
      id: Date.now(), // Simple way to generate unique IDs
      dateAdded: new Date().toISOString()
    }])
  }

  const removeAnimal = (animalId) => {
    setAnimals(prevAnimals => prevAnimals.filter(animal => animal.id !== animalId))
  }

  const updateAnimal = (animalId, updates) => {
    setAnimals(prevAnimals => prevAnimals.map(animal => 
      animal.id === animalId ? { ...animal, ...updates } : animal
    ))
  }

  return (
    <ZooContext.Provider value={{ animals, addAnimal, removeAnimal, updateAnimal }}>
      {children}
    </ZooContext.Provider>
  )
} 