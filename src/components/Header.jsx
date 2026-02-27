import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useNews, CATEGORIES } from '../context/NewsContext'
import { 
  Sun, Moon, Menu, X, Search, Calendar, RefreshCw, 
  LayoutGrid, Brain, Cpu, Smartphone, Building2, Scale, FlaskConical,
  Star, Bookmark
} from 'lucide-react'
import { format, subDays, addDays } from 'date-fns'
import { zhCN } from 'date-fns/locale'

const iconMap = {
  LayoutGrid,
  Brain,
  Cpu,
  Smartphone,
  Building2,
  Scale,
  FlaskConical,
}

export default function Header() {
  const { isDark, toggleTheme } = useTheme()
  const { 
    selectedCategory, 
    setSelectedCategory, 
    selectedDate, 
    setSelectedDate,
    searchQuery,
    setSearchQuery,
    refreshNews,
    loading
  } = useNews()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)

  const handlePrevDay = () => {
    const prev = subDays(new Date(selectedDate), 1)
    setSelectedDate(prev.toISOString().split('T')[0])
  }

  const handleNextDay = () => {
    const next = addDays(new Date(selectedDate), 1)
    const today = new Date().toISOString().split('T')[0]
    if (next.toISOString().split('T')[0] <= today) {
      setSelectedDate(next.toISOString().split('T')[0])
    }
  }

  const isToday = selectedDate === new Date().toISOString().split('T')[0]

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">每日AI资讯</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">聚焦全球人工智能最新动态</p>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={handlePrevDay}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                <X className="w-4 h-4 rotate-45 text-gray-600 dark:text-gray-300" />
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  <Calendar className="w-4 h-4" />
                  {format(new Date(selectedDate), 'MM月dd日 EEEE', { locale: zhCN })}
                </button>
                {showDatePicker && (
                  <div className="absolute top-full mt-2 left-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-2 z-50">
                    <input
                      type="date"
                      value={selectedDate}
                      max={new Date().toISOString().split('T')[0]}
                      onChange={(e) => {
                        setSelectedDate(e.target.value)
                        setShowDatePicker(false)
                      }}
                      className="input-field text-sm"
                    />
                  </div>
                )}
              </div>
              <button
                onClick={handleNextDay}
                disabled={isToday}
                className={`p-2 rounded-md transition-colors ${
                  isToday 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <X className="w-4 h-4 -rotate-45 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索资讯..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <button
              onClick={refreshNews}
              disabled={loading}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              title="刷新资讯"
            >
              <RefreshCw className={`w-5 h-5 text-gray-600 dark:text-gray-300 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              title={isDark ? '切换到浅色模式' : '切换到深色模式'}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <div className="hidden md:flex items-center gap-2 pb-3 overflow-x-auto">
          {CATEGORIES.map((category) => {
            const Icon = iconMap[category.icon]
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  selectedCategory === category.id
                    ? `${category.color} text-white shadow-lg`
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                {category.name}
              </button>
            )
          })}
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4 space-y-4">
          <div className="flex items-center gap-2">
            <button onClick={handlePrevDay} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <X className="w-4 h-4 rotate-45" />
            </button>
            <input
              type="date"
              value={selectedDate}
              max={new Date().toISOString().split('T')[0]}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="flex-1 input-field text-sm"
            />
            <button 
              onClick={handleNextDay} 
              disabled={isToday}
              className={`p-2 bg-gray-100 dark:bg-gray-800 rounded-lg ${isToday ? 'opacity-50' : ''}`}
            >
              <X className="w-4 h-4 -rotate-45" />
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索资讯..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => {
              const Icon = iconMap[category.icon]
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id)
                    setMobileMenuOpen(false)
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                    selectedCategory === category.id
                      ? `${category.color} text-white`
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {Icon && <Icon className="w-3 h-3" />}
                  {category.name}
                </button>
              )
            })}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
            <button onClick={refreshNews} className="btn-secondary flex items-center gap-2">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              刷新
            </button>
            <button onClick={toggleTheme} className="btn-secondary flex items-center gap-2">
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {isDark ? '浅色模式' : '深色模式'}
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
