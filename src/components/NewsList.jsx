import { useNews } from '../context/NewsContext'
import NewsCard from './NewsCard'
import { Loader2, AlertCircle, Newspaper, Search } from 'lucide-react'

export default function NewsList() {
  const { filteredNews, loading, error, searchQuery, selectedCategory } = useNews()

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 sm:py-20">
        <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-primary-500 animate-spin mb-3 sm:mb-4" />
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">正在获取最新AI资讯...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 sm:py-20">
        <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-red-500 mb-3 sm:mb-4" />
        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium mb-2">获取资讯失败</p>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{error}</p>
      </div>
    )
  }

  if (filteredNews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 sm:py-20">
        {searchQuery ? (
          <>
            <Search className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mb-3 sm:mb-4" />
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium mb-2">未找到相关资讯</p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">尝试更换搜索关键词</p>
          </>
        ) : (
          <>
            <Newspaper className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mb-3 sm:mb-4" />
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium mb-2">暂无资讯</p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">当日还没有相关资讯，请稍后刷新</p>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
      {filteredNews.map((news, index) => (
        <NewsCard key={news.id} news={news} index={index} />
      ))}
    </div>
  )
}
