import express from 'express'
import cors from 'cors'
import { getMockNews, getMockSummary, getMockNewsByCategory, searchMockNews } from './services/mockData.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.get('/api/news', (req, res) => {
  const { category, search } = req.query
  
  let news = getMockNews()
  
  if (category && category !== 'all') {
    news = getMockNewsByCategory(category)
  }
  
  if (search) {
    news = searchMockNews(search)
  }
  
  res.json({
    success: true,
    news,
    summary: getMockSummary(),
    total: news.length,
    lastUpdate: new Date().toISOString()
  })
})

app.get('/api/news/refresh', (req, res) => {
  res.json({
    success: true,
    news: getMockNews(),
    summary: getMockSummary(),
    total: getMockNews().length,
    lastUpdate: new Date().toISOString()
  })
})

app.get('/api/sources', (req, res) => {
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
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`🚀 AI News Mock Server running on http://localhost:${PORT}`)
  console.log(`📡 API endpoints:`)
  console.log(`   - GET /api/news`)
  console.log(`   - GET /api/news/refresh`)
  console.log(`   - GET /api/sources`)
  console.log(`   - GET /api/categories`)
  console.log(`   - GET /api/health`)
})
