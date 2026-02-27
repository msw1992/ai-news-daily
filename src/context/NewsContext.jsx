import { createContext, useContext, useState, useEffect } from 'react'

const NewsContext = createContext()

const API_BASE_URL = import.meta.env.VITE_API_URL || ''

export const CATEGORIES = [
  { id: 'all', name: '全部', icon: 'LayoutGrid', color: 'bg-gray-500' },
  { id: 'llm', name: '大模型', icon: 'Brain', color: 'bg-purple-500' },
  { id: 'chip', name: '芯片算力', icon: 'Cpu', color: 'bg-blue-500' },
  { id: 'application', name: '应用落地', icon: 'Smartphone', color: 'bg-green-500' },
  { id: 'enterprise', name: '企业动态', icon: 'Building2', color: 'bg-orange-500' },
  { id: 'policy', name: '政策法规', icon: 'Scale', color: 'bg-red-500' },
  { id: 'research', name: '研究突破', icon: 'FlaskConical', color: 'bg-cyan-500' },
]

export function NewsProvider({ children }) {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites')
    return saved ? JSON.parse(saved) : []
  })
  const [dailySummary, setDailySummary] = useState('')

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const getApiUrl = (endpoint) => {
    if (API_BASE_URL) {
      return `${API_BASE_URL}${endpoint}`
    }
    return endpoint
  }

  const fetchNews = async (date) => {
    setLoading(true)
    setError(null)
    try {
      const url = getApiUrl(`/api/news?date=${date}`)
      const response = await fetch(url)
      if (!response.ok) throw new Error('Failed to fetch news')
      const data = await response.json()
      setNews(data.news || [])
      setDailySummary(data.summary || '')
    } catch (err) {
      setError(err.message)
      setNews([])
      setDailySummary('')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews(selectedDate)
  }, [selectedDate])

  const filteredNews = news.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleFavorite = (newsId) => {
    setFavorites(prev => {
      if (prev.includes(newsId)) {
        return prev.filter(id => id !== newsId)
      }
      return [...prev, newsId]
    })
  }

  const isFavorite = (newsId) => favorites.includes(newsId)

  const refreshNews = () => fetchNews(selectedDate)

  return (
    <NewsContext.Provider value={{
      news,
      filteredNews,
      loading,
      error,
      selectedCategory,
      setSelectedCategory,
      selectedDate,
      setSelectedDate,
      searchQuery,
      setSearchQuery,
      favorites,
      toggleFavorite,
      isFavorite,
      dailySummary,
      refreshNews,
    }}>
      {children}
    </NewsContext.Provider>
  )
}

export const useNews = () => {
  const context = useContext(NewsContext)
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider')
  }
  return context
}
