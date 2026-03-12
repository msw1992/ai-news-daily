import { Heart, Github, ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            <span>用</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>构建 | 每日AI资讯 © 2026</span>
          </div>
          
          <div className="flex items-center gap-4 sm:gap-6">
            <a 
              href="#" 
              className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              GitHub
            </a>
            <a 
              href="#" 
              className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              关于我们
              <ExternalLink className="w-3 h-3" />
            </a>
            <a 
              href="#" 
              className="hidden sm:flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              隐私政策
            </a>
          </div>
        </div>
        
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-500">
            本站资讯来源于公开渠道，仅供学习交流使用。如有侵权请联系删除。
          </p>
        </div>
      </div>
    </footer>
  )
}
