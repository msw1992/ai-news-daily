import { useNews } from '../context/NewsContext'
import { Lightbulb, Target, TrendingUp, Users, Zap, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

export default function PMAnalysis() {
  const { news } = useNews()
  const [isExpanded, setIsExpanded] = useState(true)

  if (!news || news.length === 0) {
    return null
  }

  const analysis = generatePMAnalysis(news)

  return (
    <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-8 border border-amber-100 dark:border-gray-700">
      <div 
        className="flex items-center justify-between mb-4 cursor-pointer sm:cursor-default"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg flex-shrink-0">
            <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <h2 className="text-base sm:text-xl font-bold text-gray-900 dark:text-white">
              产品经理视角
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hidden sm:block">AI行业机会与趋势分析</p>
          </div>
        </div>
        <button className="sm:hidden p-1 text-gray-500 dark:text-gray-400">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {(isExpanded || (typeof window !== 'undefined' && window.innerWidth >= 640)) && (
        <div className="space-y-3 sm:space-y-4">
          {analysis.trends && analysis.trends.length > 0 && (
            <div className="bg-white/60 dark:bg-gray-700/50 rounded-lg sm:rounded-xl p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">行业趋势</h3>
              </div>
              <ul className="space-y-1.5 sm:space-y-2">
                {analysis.trends.map((trend, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700 dark:text-gray-200">
                    <span className="text-amber-500 mt-0.5 flex-shrink-0">•</span>
                    <span>{trend}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {analysis.opportunities && analysis.opportunities.length > 0 && (
            <div className="bg-white/60 dark:bg-gray-700/50 rounded-lg sm:rounded-xl p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">产品机会</h3>
              </div>
              <ul className="space-y-1.5 sm:space-y-2">
                {analysis.opportunities.map((opp, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700 dark:text-gray-200">
                    <span className="text-green-500 mt-0.5 flex-shrink-0">•</span>
                    <span>{opp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {analysis.userNeeds && analysis.userNeeds.length > 0 && (
            <div className="bg-white/60 dark:bg-gray-700/50 rounded-lg sm:rounded-xl p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">用户需求洞察</h3>
              </div>
              <ul className="space-y-1.5 sm:space-y-2">
                {analysis.userNeeds.map((need, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700 dark:text-gray-200">
                    <span className="text-blue-500 mt-0.5 flex-shrink-0">•</span>
                    <span>{need}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {analysis.risks && analysis.risks.length > 0 && (
            <div className="bg-white/60 dark:bg-gray-700/50 rounded-lg sm:rounded-xl p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">风险提示</h3>
              </div>
              <ul className="space-y-1.5 sm:space-y-2">
                {analysis.risks.map((risk, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700 dark:text-gray-200">
                    <span className="text-red-500 mt-0.5 flex-shrink-0">•</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {analysis.recommendations && analysis.recommendations.length > 0 && (
            <div className="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-lg sm:rounded-xl p-3 sm:p-4">
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">行动建议</h3>
              </div>
              <ul className="space-y-1.5 sm:space-y-2">
                {analysis.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700 dark:text-gray-200">
                    <span className="text-amber-600 font-bold mt-0.5 flex-shrink-0">{index + 1}.</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function generatePMAnalysis(news) {
  const analysis = {
    trends: [],
    opportunities: [],
    userNeeds: [],
    risks: [],
    recommendations: []
  }

  const text = news.map(n => `${n.title} ${n.summary}`).join(' ').toLowerCase()
  
  if (text.includes('agent') || text.includes('智能体')) {
    analysis.trends.push('AI Agent成为新热点，各大厂商加速布局智能体生态')
    analysis.opportunities.push('垂直领域AI Agent产品存在大量机会')
    analysis.userNeeds.push('用户需要更智能、更自主的AI助手')
  }

  if (text.includes('大模型') || text.includes('llm') || text.includes('gpt') || text.includes('claude')) {
    analysis.trends.push('大模型竞争白热化，开源与闭源差距缩小')
    analysis.opportunities.push('基于大模型的应用层产品迎来红利期')
    analysis.risks.push('模型同质化严重，需构建差异化优势')
  }

  if (text.includes('芯片') || text.includes('gpu') || text.includes('算力')) {
    analysis.trends.push('AI芯片竞争加剧，国产替代加速')
    analysis.opportunities.push('算力优化、模型压缩方向存在机会')
    analysis.userNeeds.push('中小企业对低成本算力方案需求强烈')
  }

  if (text.includes('应用') || text.includes('落地') || text.includes('场景')) {
    analysis.trends.push('AI应用落地加速，从概念走向规模化')
    analysis.opportunities.push('行业垂直应用仍有大量空白市场')
    analysis.userNeeds.push('企业需要开箱即用的AI解决方案')
  }

  if (text.includes('融资') || text.includes('投资') || text.includes('收购')) {
    analysis.trends.push('AI投资热度不减，更关注商业化能力')
    analysis.risks.push('估值泡沫风险，部分赛道已现拥挤')
    analysis.recommendations.push('关注被大厂收购方向，寻找类似机会')
  }

  if (text.includes('监管') || text.includes('法规') || text.includes('政策')) {
    analysis.trends.push('AI监管框架完善，合规成为必备要素')
    analysis.risks.push('政策变化可能影响产品方向')
    analysis.recommendations.push('产品设计阶段即考虑合规要求')
  }

  if (text.includes('视频') || text.includes('图像') || text.includes('生成')) {
    analysis.trends.push('多模态AI快速成熟，视频生成场景爆发')
    analysis.opportunities.push('内容创作、营销、设计等领域存在机会')
    analysis.userNeeds.push('创作者需要更易用的AI内容生成工具')
  }

  if (text.includes('开源')) {
    analysis.trends.push('开源生态蓬勃发展，性能逼近闭源')
    analysis.opportunities.push('基于开源模型的定制化服务存在机会')
    analysis.recommendations.push('关注开源社区动态，快速跟进迭代')
  }

  if (analysis.trends.length === 0) {
    analysis.trends.push('AI行业持续快速发展，技术创新与商业落地并进')
  }

  if (analysis.opportunities.length === 0) {
    analysis.opportunities.push('关注AI与传统行业结合的垂直应用场景')
    analysis.opportunities.push('AI工具类产品仍有大量细分市场机会')
  }

  if (analysis.recommendations.length === 0) {
    analysis.recommendations.push('持续关注行业头部玩家动态')
    analysis.recommendations.push('深耕垂直场景，构建数据和场景壁垒')
  }

  return analysis
}
