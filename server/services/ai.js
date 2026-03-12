const SUMMARY_TEMPLATES = {
  llm: '大模型领域今日动态活跃',
  chip: '芯片算力领域持续发展',
  application: 'AI应用落地场景不断拓展',
  enterprise: '企业动态方面',
  policy: '政策法规层面',
  research: '研究突破方面'
}

export function classifyNews(title, summary) {
  const text = `${title} ${summary}`.toLowerCase()
  
  const keywords = {
    llm: ['gpt', 'chatgpt', 'claude', 'llm', '大模型', '语言模型', 'gemini', '文心', '通义', 'llama', 'gemma', 'mistral', 'deepseek', 'qwen', 'sora'],
    chip: ['gpu', '芯片', 'nvidia', 'amd', 'intel', 'tpu', '算力', 'h100', 'a100', '半导体', 'cpu', 'b200', 'blackwell'],
    application: ['应用', '产品', '落地', '场景', '助手', '工具', '自动化', 'copilot', 'agent', '智能体', '机器人'],
    enterprise: ['融资', '收购', '上市', '投资', 'openai', 'google', 'microsoft', 'meta', '百度', '阿里', '腾讯', '字节'],
    policy: ['法规', '监管', '政策', '法律', '安全', '隐私', '伦理', '治理', 'ai法案'],
    research: ['研究', '论文', '突破', '创新', '技术', '算法', 'neurips', 'icml', 'cvpr', 'deepmind']
  }
  
  for (const [category, words] of Object.entries(keywords)) {
    for (const word of words) {
      if (text.includes(word)) {
        return category
      }
    }
  }
  
  return 'application'
}

export function generateSummary(news) {
  if (!news || news.length === 0) {
    return '暂无当日资讯，请稍后刷新查看最新动态。'
  }
  
  const categories = {}
  news.forEach(item => {
    if (!categories[item.category]) {
      categories[item.category] = []
    }
    categories[item.category].push(item)
  })
  
  const hotNews = news.filter(n => n.isHot).slice(0, 3)
  const totalNews = news.length
  
  const topics = []
  const trends = []
  
  const allText = news.map(n => `${n.title} ${n.summary}`).join(' ').toLowerCase()
  
  if (allText.includes('agent') || allText.includes('智能体')) {
    trends.push('AI智能体成为新热点')
  }
  if (allText.includes('开源')) {
    trends.push('开源生态持续繁荣')
  }
  if (allText.includes('融资') || allText.includes('投资')) {
    trends.push('资本市场活跃')
  }
  if (allText.includes('视频') || allText.includes('sora') || allText.includes('生成')) {
    trends.push('多模态生成技术突破')
  }
  if (allText.includes('芯片') || allText.includes('gpu') || allText.includes('算力')) {
    trends.push('算力竞争加剧')
  }
  if (allText.includes('应用') || allText.includes('落地')) {
    trends.push('应用落地加速')
  }
  
  if (hotNews.length > 0) {
    hotNews.forEach(n => {
      const shortTitle = n.title.length > 15 ? n.title.slice(0, 15) + '...' : n.title
      topics.push(shortTitle)
    })
  }
  
  let summary = ''
  
  if (trends.length > 0) {
    summary = `今日AI领域${trends.slice(0, 3).join('、')}。`
  } else {
    summary = `今日AI领域动态活跃，`
  }
  
  if (topics.length > 0) {
    summary += `热点关注：${topics.slice(0, 3).join('、')}等话题引发讨论。`
  }
  
  const categoryNames = {
    llm: '大模型',
    chip: '芯片算力',
    application: '应用落地',
    enterprise: '企业动态',
    policy: '政策法规',
    research: '研究突破'
  }
  
  const mainCategories = Object.entries(categories)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 3)
    .map(([cat]) => categoryNames[cat])
    .filter(Boolean)
  
  if (mainCategories.length > 0) {
    summary += `今日${mainCategories.join('、')}领域资讯较为活跃，共收录${totalNews}条资讯。`
  } else {
    summary += `共收录${totalNews}条资讯。`
  }
  
  return summary
}

export function extractKeywords(text) {
  const stopWords = ['的', '了', '和', '是', '在', '有', '与', '为', '对', '等', '中', '上', '这', '那', '个', '将', '被', '从', '到', '把', '让', '使', '给']
  
  const words = text.toLowerCase()
    .replace(/[^\u4e00-\u9fa5a-zA-Z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 1 && !stopWords.includes(word))
  
  const frequency = {}
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1
  })
  
  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word]) => word)
}
