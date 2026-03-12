import { useNews } from '../context/NewsContext'
import { CATEGORIES } from '../context/NewsContext'
import { 
  LayoutGrid, Brain, Cpu, Smartphone, Building2, Scale, FlaskConical
} from 'lucide-react'

const iconMap = {
  LayoutGrid,
  Brain,
  Cpu,
  Smartphone,
  Building2,
  Scale,
  FlaskConical,
}

export default function CategoryNav() {
  const { selectedCategory, setSelectedCategory, news } = useNews()

  const getCategoryCount = (categoryId) => {
    if (categoryId === 'all') return news.length
    return news.filter(n => n.category === categoryId).length
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 shadow-sm border border-gray-100 dark:border-gray-700 lg:hidden">
      <div className="flex items-center gap-2 overflow-x-auto pb-1 -mb-1 scrollbar-hide">
        {CATEGORIES.map((category) => {
          const Icon = iconMap[category.icon]
          const count = getCategoryCount(category.id)
          const isActive = selectedCategory === category.id
          
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 active:scale-95 ${
                isActive
                  ? `${category.color} text-white shadow-lg`
                  : 'bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {Icon && <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              <span>{category.name}</span>
              {count > 0 && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  isActive 
                    ? 'bg-white/20' 
                    : 'bg-gray-200 dark:bg-gray-600'
                }`}>
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
