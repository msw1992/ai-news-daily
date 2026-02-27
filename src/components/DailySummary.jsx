import { useNews, CATEGORIES } from '../context/NewsContext'
import { Sparkles, TrendingUp, Clock, Globe } from 'lucide-react'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

export default function DailySummary() {
  const { dailySummary, news, selectedDate } = useNews()

  const stats = {
    total: news.length,
    categories: CATEGORIES.slice(1).map(cat => ({
      name: cat.name,
      count: news.filter(n => n.category === cat.id).length,
      color: cat.color
    })).filter(c => c.count > 0)
  }

  return (
    <div className="bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 rounded-2xl p-6 mb-8 border border-primary-100 dark:border-gray-700">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {format(new Date(selectedDate), 'MM月dd日', { locale: zhCN })} AI资讯速递
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">AI生成的每日热点总结</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Clock className="w-4 h-4" />
          {format(new Date(), 'HH:mm')}
        </div>
      </div>

      {dailySummary ? (
        <div className="bg-white/60 dark:bg-gray-700/50 rounded-xl p-4 mb-4">
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
            {dailySummary}
          </p>
        </div>
      ) : (
        <div className="bg-white/60 dark:bg-gray-700/50 rounded-xl p-4 mb-4">
          <p className="text-gray-500 dark:text-gray-400 italic">
            暂无当日总结，请稍后刷新查看...
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/60 dark:bg-gray-700/50 rounded-full">
          <TrendingUp className="w-4 h-4 text-primary-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            今日 {stats.total} 条资讯
          </span>
        </div>

        {stats.categories.slice(0, 4).map((cat, index) => (
          <div key={index} className="flex items-center gap-2 px-3 py-1.5 bg-white/60 dark:bg-gray-700/50 rounded-full">
            <div className={`w-2 h-2 rounded-full ${cat.color}`} />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {cat.name} {cat.count}
            </span>
          </div>
        ))}

        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/60 dark:bg-gray-700/50 rounded-full">
          <Globe className="w-4 h-4 text-green-500" />
          <span className="text-sm text-gray-600 dark:text-gray-300">全球覆盖</span>
        </div>
      </div>
    </div>
  )
}
