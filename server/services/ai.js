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
    llm: ['gpt', 'chatgpt', 'claude', 'llm', '大模型', '语言模型', 'gemini', '文心', '通义', 'llama', 'gemma', 'mistral'],
    chip: ['gpu', '芯片', 'nvidia', 'amd', 'intel', 'tpu', '算力', 'h100', 'a100', '半导体', 'cpu'],
    application: ['应用', '产品', '落地', '场景', '助手', '工具', '自动化', 'copilot'],
    enterprise: ['融资', '收购', '上市', '投资', 'openai', 'google', 'microsoft', 'meta', '百度', '阿里', '腾讯'],
    policy: ['法规', '监管', '政策', '法律', '安全', '隐私', '伦理', '治理'],
    research: ['研究', '论文', '突破', '创新', '技术', '算法', 'neurips', 'icml', 'cvpr']
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
  
  let summary = `今日共收录 ${totalNews} 条AI领域资讯`
  
  if (hotNews.length > 0) {
    summary += `，热门话题包括：${hotNews.map(n => n.title.slice(0, 20)).join('、')}等`
  }
  
  const categorySummaries = []
  for (const [cat, items] of Object.entries(categories)) {
    if (items.length > 0) {
      const catNames = {
        llm: '大模型',
        chip: '芯片算力',
        application: '应用落地',
        enterprise: '企业动态',
        policy: '政策法规',
        research: '研究突破'
      }
      categorySummaries.push(`${catNames[cat] || cat}${items.length}条`)
    }
  }
  
  if (categorySummaries.length > 0) {
    summary += `。各领域分布：${categorySummaries.join('、')}`
  }
  
  const sources = [...new Set(news.map(n => n.source))]
  summary += `。资讯来源：${sources.slice(0, 5).join('、')}${sources.length > 5 ? '等' : ''}`
  
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
