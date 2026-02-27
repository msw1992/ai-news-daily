import { useNews } from '../context/NewsContext'
import { CATEGORIES } from '../context/NewsContext'
import { 
  LayoutGrid, Brain, Cpu, Smartphone, Building2, Scale, FlaskConical,
  ChevronRight
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
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm border border-gray-100 dark:border-gray-700 lg:hidden">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 -mb-2">
        {CATEGORIES.map((category) => {
          const Icon = iconMap[category.icon]
          const count = getCategoryCount(category.id)
          const isActive = selectedCategory === category.id
          
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? `${category.color} text-white shadow-lg scale-105`
                  : 'bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {Icon && <Icon className="w-4 h-4" />}
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
