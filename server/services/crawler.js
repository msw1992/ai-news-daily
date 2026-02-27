import * as cheerio from 'cheerio'
import RSSParser from 'rss-parser'

const rssParser = new RSSParser()

const RSS_SOURCES = [
  {
    name: '36氪',
    url: 'https://36kr.com/feed',
    category: 'enterprise',
    enabled: true
  },
  {
    name: '机器之心',
    url: 'https://www.jiqizhixin.com/rss',
    category: 'llm',
    enabled: true
  },
  {
    name: '量子位',
    url: 'https://www.qbitai.com/feed',
    category: 'research',
    enabled: true
  },
  {
    name: 'InfoQ',
    url: 'https://www.infoq.cn/feed',
    category: 'application',
    enabled: true
  },
  {
    name: 'VentureBeat AI',
    url: 'https://venturebeat.com/category/ai/feed/',
    category: 'enterprise',
    enabled: true
  },
  {
    name: 'TechCrunch AI',
    url: 'https://techcrunch.com/category/artificial-intelligence/feed/',
    category: 'application',
    enabled: true
  },
  {
    name: 'OpenAI Blog',
    url: 'https://openai.com/blog/rss.xml',
    category: 'llm',
    enabled: true
  },
  {
    name: 'Google AI Blog',
    url: 'https://blog.google/technology/ai/rss/',
    category: 'research',
    enabled: true
  },
  {
    name: 'Microsoft AI Blog',
    url: 'https://blogs.microsoft.com/ai/feed/',
    category: 'application',
    enabled: true
  },
  {
    name: 'Anthropic Blog',
    url: 'https://www.anthropic.com/news/rss',
    category: 'llm',
    enabled: false
  },
  {
    name: 'Hugging Face Blog',
    url: 'https://huggingface.co/blog/feed.xml',
    category: 'research',
    enabled: true
  },
  {
    name: 'MIT Technology Review',
    url: 'https://www.technologyreview.com/feed/',
    category: 'research',
    enabled: true
  }
]

const KEYWORDS = {
  llm: ['GPT', 'ChatGPT', 'Claude', 'LLM', '大模型', '语言模型', 'Gemini', '文心', '通义', 'Llama', 'Gemma', 'Mistral', 'AI模型', 'DeepSeek', 'Qwen', 'Sora', 'DALL-E', 'Midjourney'],
  chip: ['GPU', '芯片', 'NVIDIA', 'AMD', 'Intel', 'TPU', '算力', 'H100', 'A100', '半导体', 'CPU', 'AI芯片', '昇腾', 'H800', 'B200', 'Blackwell'],
  application: ['应用', '产品', '落地', '场景', 'AI助手', 'AI工具', '自动化', '智能', 'Copilot', '自动驾驶', '机器人', 'Agent'],
  enterprise: ['融资', '收购', '上市', '投资', 'OpenAI', 'Google', 'Microsoft', 'Meta', '百度', '阿里', '腾讯', '字节', '估值', '融资轮'],
  policy: ['法规', '监管', '政策', '法律', '安全', '隐私', '伦理', '治理', '欧盟', 'AI法案', '合规', '审查'],
  research: ['研究', '论文', '突破', '创新', '技术', '算法', 'NeurIPS', 'ICML', 'CVPR', 'ACL', 'DeepMind', '开源']
}

let cachedNews = []
let lastFetchTime = null
const CACHE_DURATION = 30 * 60 * 1000

function categorizeByKeywords(title, summary, defaultCategory) {
  const text = `${title} ${summary}`.toLowerCase()
  
  for (const [category, keywords] of Object.entries(KEYWORDS)) {
    for (const keyword of keywords) {
      if (text.includes(keyword.toLowerCase())) {
        return category
      }
    }
  }
  
  return defaultCategory || 'application'
}

function extractImage(content) {
  if (!content) return null
  try {
    const $ = cheerio.load(content)
    const img = $('img').first()
    return img.attr('src') || null
  } catch {
    return null
  }
}

function isValidUrl(url) {
  if (!url) return false
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

async function fetchFromRSS(source) {
  try {
    console.log(`📡 Fetching from ${source.name}...`)
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)
    
    const response = await fetch(source.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; AINewsBot/1.0; +https://ai-news.example.com)',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*'
      },
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    
    const text = await response.text()
    const feed = await rssParser.parseString(text)
    
    const items = feed.items.slice(0, 15).map(item => {
      const title = item.title || '无标题'
      const summary = item.contentSnippet || item.summary || item.content || '暂无摘要'
      
      return {
        id: `rss-${source.name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title,
        summary: summary.slice(0, 300),
        url: item.link,
        source: source.name,
        category: categorizeByKeywords(title, summary, source.category),
        publishedAt: item.pubDate || item.isoDate || new Date().toISOString(),
        image: extractImage(item.content || item['content:encoded'] || ''),
        isHot: false,
        views: Math.floor(Math.random() * 1000) + 100
      }
    }).filter(item => isValidUrl(item.url))
    
    console.log(`✅ ${source.name}: ${items.length} items`)
    return items
  } catch (error) {
    console.error(`❌ ${source.name}: ${error.message}`)
    return []
  }
}

async function fetchFromAPI(source) {
  try {
    console.log(`📡 Fetching from ${source.name} API...`)
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)
    
    const response = await fetch(source.url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'application/json'
      },
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    
    const data = await response.json()
    
    const items = (data.data || data.items || data.articles || data).slice(0, 15).map((item, index) => {
      const title = item.title || item.headline || '无标题'
      const summary = item.summary || item.description || item.content || title
      
      return {
        id: `api-${source.name}-${Date.now()}-${index}`,
        title,
        summary: summary.slice(0, 300),
        url: item.url || item.link || item.web_url,
        source: source.name,
        category: categorizeByKeywords(title, summary, source.category),
        publishedAt: item.published_at || item.pubDate || item.created_at || new Date().toISOString(),
        image: item.cover_image || item.image || item.thumbnail,
        isHot: index < 3,
        views: item.views || item.read_count || Math.floor(Math.random() * 1500) + 200
      }
    }).filter(item => isValidUrl(item.url))
    
    console.log(`✅ ${source.name} API: ${items.length} items`)
    return items
  } catch (error) {
    console.error(`❌ ${source.name} API: ${error.message}`)
    return []
  }
}

export async function fetchAllNews() {
  console.log('🔄 Starting to fetch news from all sources...')
  console.log(`📅 ${new Date().toLocaleString('zh-CN')}`)
  
  const rssPromises = RSS_SOURCES
    .filter(s => s.enabled)
    .map(source => fetchFromRSS(source))
  
  const results = await Promise.allSettled(rssPromises)
  
  const allNews = results
    .filter(r => r.status === 'fulfilled')
    .flatMap(r => r.value)
    .filter(n => n.title && n.url && n.title !== '无标题')
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
  
  const uniqueNews = allNews.filter((news, index, self) =>
    index === self.findIndex(n => 
      n.title === news.title || 
      (n.url && news.url && new URL(n.url).pathname === new URL(news.url).pathname)
    )
  )
  
  cachedNews = uniqueNews
  lastFetchTime = Date.now()
  
  console.log(`\n📊 Summary:`)
  console.log(`   Total fetched: ${allNews.length}`)
  console.log(`   After dedup: ${uniqueNews.length}`)
  console.log(`   Sources: ${[...new Set(uniqueNews.map(n => n.source))].join(', ')}`)
  
  return uniqueNews
}

export function getCachedNews() {
  if (!cachedNews.length || (lastFetchTime && Date.now() - lastFetchTime > CACHE_DURATION)) {
    return null
  }
  return cachedNews
}

export function scheduleNewsFetch() {
  fetchAllNews()
  setInterval(fetchAllNews, CACHE_DURATION)
}

export function getNewsByDate(date) {
  const targetDate = new Date(date).toDateString()
  return cachedNews.filter(news => 
    new Date(news.publishedAt).toDateString() === targetDate
  )
}

export function getAvailableSources() {
  return RSS_SOURCES.filter(s => s.enabled).map(s => ({
    name: s.name,
    category: s.category
  }))
}
