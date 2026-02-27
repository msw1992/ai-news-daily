import { useNews, CATEGORIES } from '../context/NewsContext'
import { Star, TrendingUp, Clock, Bookmark, Flame, Zap } from 'lucide-react'

export default function Sidebar() {
  const { news, favorites, selectedCategory, setSelectedCategory } = useNews()

  const hotNews = [...news]
    .filter(n => n.isHot || n.views > 500)
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5)

  const favoriteNews = news.filter(n => favorites.includes(n.id))

  return (
    <aside className="hidden xl:block w-80 flex-shrink-0">
      <div className="sticky top-24 space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-5 h-5 text-orange-500" />
            <h3 className="font-semibold text-gray-900 dark:text-white">热门资讯</h3>
          </div>
          <div className="space-y-3">
            {hotNews.length > 0 ? hotNews.map((item, index) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="flex gap-3">
                  <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    index === 0 ? 'bg-red-500 text-white' :
                    index === 1 ? 'bg-orange-500 text-white' :
                    index === 2 ? 'bg-yellow-500 text-white' :
                    'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}>
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700 dark:text-gray-200 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.source}</p>
                  </div>
                </div>
              </a>
            )) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">暂无热门资讯</p>
            )}
          </div>
        </div>

        {favoriteNews.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <Bookmark className="w-5 h-5 text-yellow-500" />
              <h3 className="font-semibold text-gray-900 dark:text-white">我的收藏</h3>
              <span className="ml-auto text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                {favoriteNews.length}
              </span>
            </div>
            <div className="space-y-3">
              {favoriteNews.slice(0, 5).map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <p className="text-sm text-gray-700 dark:text-gray-200 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.source}</p>
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl p-4 text-white">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-5 h-5" />
            <h3 className="font-semibold">快速统计</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/20 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold">{news.length}</p>
              <p className="text-xs opacity-80">今日资讯</p>
            </div>
            <div className="bg-white/20 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold">{favorites.length}</p>
              <p className="text-xs opacity-80">收藏数量</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-gray-100 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">数据来源</h3>
          <div className="flex flex-wrap gap-2">
            {['36氪', '机器之心', '量子位', 'InfoQ', 'VentureBeat', 'TechCrunch'].map((source) => (
              <span 
                key={source}
                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md"
              >
                {source}
              </span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
