import { useNews, CATEGORIES } from '../context/NewsContext'
import { Star, ExternalLink, Clock, TrendingUp, Eye } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { zhCN } from 'date-fns/locale'

const categoryConfig = CATEGORIES.reduce((acc, cat) => {
  acc[cat.id] = cat
  return acc
}, {})

const sourceIcons = {
  '36氪': '🚀',
  '机器之心': '🤖',
  '量子位': '⚛️',
  'InfoQ': '💡',
  'VentureBeat': '📰',
  'TechCrunch': '🔥',
  'OpenAI': '🧠',
  'Anthropic': '🔮',
  'Google': '🔍',
  'Microsoft': '💻',
  'Meta': '🌐',
  '默认': '📌'
}

export default function NewsCard({ news, index }) {
  const { toggleFavorite, isFavorite } = useNews()
  const category = categoryConfig[news.category] || categoryConfig.all
  const sourceIcon = sourceIcons[news.source] || sourceIcons['默认']
  const favorite = isFavorite(news.id)

  const handleOpenLink = () => {
    if (news.url) {
      window.open(news.url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <article 
      className="news-card group animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {news.image && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={news.image} 
            alt={news.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <span className={`category-badge ${category.color} text-white`}>
              {category.name}
            </span>
          </div>
        </div>
      )}

      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-lg">{sourceIcon}</span>
            <span className="text-gray-500 dark:text-gray-400 font-medium">{news.source}</span>
            {news.isHot && (
              <span className="flex items-center gap-1 px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-xs">
                <TrendingUp className="w-3 h-3" />
                热门
              </span>
            )}
          </div>
          <button
            onClick={() => toggleFavorite(news.id)}
            className={`p-1.5 rounded-lg transition-colors ${
              favorite 
                ? 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/30' 
                : 'text-gray-400 hover:text-yellow-500 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            title={favorite ? '取消收藏' : '添加收藏'}
          >
            <Star className={`w-5 h-5 ${favorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        <h3 
          className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors cursor-pointer"
          onClick={handleOpenLink}
        >
          {news.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {news.summary}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {formatDistanceToNow(new Date(news.publishedAt), { addSuffix: true, locale: zhCN })}
            </div>
            {news.views && (
              <div className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {news.views > 1000 ? `${(news.views / 1000).toFixed(1)}k` : news.views}
              </div>
            )}
          </div>

          {news.url && (
            <button
              onClick={handleOpenLink}
              className="flex items-center gap-1 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
            >
              阅读原文
              <ExternalLink className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
