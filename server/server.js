import express from 'express'
import cors from 'cors'
import { fetchAllNews, getCachedNews, getNewsByDate, getAvailableSources } from './services/crawler.js'
import { generateSummary } from './services/ai.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.get('/api/news', async (req, res) => {
  try {
    const { date, category, source } = req.query
    let news = getCachedNews()
    
    if (!news || news.length === 0) {
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
      sources: getAvailableSources(),
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

app.get('/api/news/refresh', async (req, res) => {
  try {
    const news = await fetchAllNews()
    const summary = generateSummary(news)
    
    res.json({
      success: true,
      news,
      summary,
      total: news.length,
      sources: getAvailableSources(),
      lastUpdate: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
})

app.get('/api/sources', (req, res) => {
  res.json({
    success: true,
    sources: getAvailableSources()
  })
})

app.get('/api/categories', (req, res) => {
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

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    mode: 'real-crawler',
    timestamp: new Date().toISOString(),
    cachedNews: getCachedNews()?.length || 0
  })
})

async function startServer() {
  console.log('🚀 AI News Real Crawler Server starting...')
  console.log('📡 Initializing news fetch...')
  
  await fetchAllNews()
  
  setInterval(fetchAllNews, 30 * 60 * 1000)
  
  app.listen(PORT, () => {
    console.log(`\n✅ Server running on http://localhost:${PORT}`)
    console.log(`📡 API endpoints:`)
    console.log(`   - GET /api/news`)
    console.log(`   - GET /api/news/refresh`)
    console.log(`   - GET /api/sources`)
    console.log(`   - GET /api/categories`)
    console.log(`   - GET /api/health`)
    console.log(`\n🔄 Auto-refresh every 30 minutes`)
  })
}

startServer().catch(console.error)
