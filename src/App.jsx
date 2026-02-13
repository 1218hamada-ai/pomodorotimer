import { useState, useContext, useEffect } from 'react'
import './App.css'
import { UnitConverter } from './components/UnitConverter'
import Header from './components/Header'
import CategoryCard from './components/CategoryCard'
import ConversionHistory from './components/ConversionHistory'
import ToastContainer from './components/ToastContainer'
import { AppProvider, AppContext } from './context/AppContext'
import {
  convertTemperature,
  convertDistance,
  convertWeight,
  convertVolume,
  convertEnergy,
  convertArea,
  convertSpeed,
  convertPressure
} from './utils/conversions'

function AppContent() {
  const [activeCategory, setActiveCategory] = useState('temperature')
  const [showHistory, setShowHistory] = useState(false)
  const { darkMode, toast } = useContext(AppContext)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const categories = [
    {
      id: 'temperature',
      name: '温度',
      icon: '🌡️',
      units: ['°C', '°F', 'K'],
      converter: convertTemperature
    },
    {
      id: 'distance',
      name: '距離',
      icon: '📏',
      units: ['m', 'km', 'cm', 'mm', 'mi', 'yd', 'ft', 'in'],
      converter: convertDistance
    },
    {
      id: 'weight',
      name: '重さ',
      icon: '⚖️',
      units: ['kg', 'g', 'mg', 'lb', 'oz', 't'],
      converter: convertWeight
    },
    {
      id: 'volume',
      name: '体積',
      icon: '🫗',
      units: ['L', 'mL', 'cup', 'gal', 'fl oz', 'pint', 'quart', 'tbsp', 'tsp'],
      converter: convertVolume
    },
    {
      id: 'energy',
      name: 'エネルギー',
      icon: '⚡',
      units: ['J', 'kJ', 'kcal', 'BTU'],
      converter: convertEnergy
    },
    {
      id: 'area',
      name: '面積',
      icon: '📐',
      units: ['m²', 'km²', 'cm²', 'ha', 'acre', 'ft²', 'yd²'],
      converter: convertArea
    },
    {
      id: 'speed',
      name: '速度',
      icon: '💨',
      units: ['m/s', 'km/h', 'mph', 'knots'],
      converter: convertSpeed
    },
    {
      id: 'pressure',
      name: '圧力',
      icon: '🔬',
      units: ['Pa', 'kPa', 'atm', 'bar', 'psi'],
      converter: convertPressure
    }
  ]

  const currentCategory = categories.find(cat => cat.id === activeCategory)

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Category Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map(category => (
            <CategoryCard
              key={category.id}
              icon={category.icon}
              name={category.name}
              isActive={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            />
          ))}
        </div>

        {/* Converter Section */}
        {currentCategory && (
          <UnitConverter
            category={currentCategory.name}
            categoryId={currentCategory.id}
            units={currentCategory.units}
            conversionFunction={currentCategory.converter}
          />
        )}

        {/* History Toggle and Display */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold"
            >
              {showHistory ? '履歴を非表示' : '履歴を表示'}
            </button>
          </div>

          {showHistory && <ConversionHistory />}
        </div>
      </main>

      {/* Toast Notifications */}
      <ToastContainer toasts={toast.toasts} removeToast={toast.removeToast} />
    </div>
  )
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

export default App
