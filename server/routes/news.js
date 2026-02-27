import express from 'express'
import { fetchAllNews, getCachedNews, getNewsByDate } from '../services/crawler.js'
import { generateSummary } from '../services/ai.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const { date, category, source } = req.query
    let news = getCachedNews()
    
    if (!news) {
      news = await fetchAllNews()
    }
    
    if (date) {
      news = getNewsByDate(date)
    }
    
    if (category && category !== 'all') {
      news = news.filter(item => item.category === category)
    }
    
    if (source) {
      news = news.filter(item => item.source === source)
    }
    
    const summary = generateSummary(news)
    
    res.json({
      success: true,
      news,
      summary,
      total: news.length,
      lastUpdate: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error fetching news:', error)
    res.status(500).json({
      success: false,
      error: error.message,
      news: [],
      summary: '获取资讯失败，请稍后重试'
    })
  }
})

router.get('/refresh', async (req, res) => {
  try {
    const news = await fetchAllNews()
    const summary = generateSummary(news)
    
    res.json({
      success: true,
      news,
      summary,
      total: news.length,
      lastUpdate: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

router.get('/sources', (req, res) => {
  res.json({
    success: true,
    sources: [
      { name: '36氪', type: 'website', icon: '🚀' },
      { name: '机器之心', type: 'website', icon: '🤖' },
      { name: '量子位', type: 'rss', icon: '⚛️' },
      { name: 'InfoQ', type: 'rss', icon: '💡' },
      { name: 'VentureBeat', type: 'rss', icon: '📰' },
      { name: 'TechCrunch', type: 'rss', icon: '🔥' }
    ]
  })
})

router.get('/categories', (req, res) => {
  res.json({
    success: true,
    categories: [
      { id: 'all', name: '全部', icon: 'LayoutGrid' },
      { id: 'llm', name: '大模型', icon: 'Brain' },
      { id: 'chip', name: '芯片算力', icon: 'Cpu' },
      { id: 'application', name: '应用落地', icon: 'Smartphone' },
      { id: 'enterprise', name: '企业动态', icon: 'Building2' },
      { id: 'policy', name: '政策法规', icon: 'Scale' },
      { id: 'research', name: '研究突破', icon: 'FlaskConical' }
    ]
  })
})

export default router
