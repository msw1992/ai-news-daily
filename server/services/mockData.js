const mockNews = [
  {
    id: 'mock-1',
    title: 'OpenAI发布GPT-4.5，推理能力大幅提升',
    summary: 'OpenAI正式发布GPT-4.5模型，在复杂推理、数学和编程能力方面取得显著进步，同时降低了API调用成本，为开发者提供更强大的AI能力。',
    url: 'https://openai.com/index/introducing-gpt-4-5/',
    source: 'OpenAI',
    category: 'llm',
    publishedAt: new Date().toISOString(),
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    isHot: true,
    views: 5234
  },
  {
    id: 'mock-2',
    title: 'NVIDIA发布RTX 5090，AI性能提升2倍',
    summary: 'NVIDIA发布新一代旗舰显卡RTX 5090，采用Blackwell架构，AI推理性能相比上一代提升2倍，为AI开发者和创作者提供更强算力支持。',
    url: 'https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5090/',
    source: 'NVIDIA',
    category: 'chip',
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800',
    isHot: true,
    views: 4521
  },
  {
    id: 'mock-3',
    title: 'Claude 3.5 Sonnet更新，编程能力再创新高',
    summary: 'Anthropic发布Claude 3.5 Sonnet重大更新，在SWE-bench编程测试中取得业界领先成绩，同时推出新的计算机使用能力，可自主操作电脑。',
    url: 'https://www.anthropic.com/news/claude-3-5-sonnet',
    source: 'Anthropic',
    category: 'llm',
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    image: 'https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=800',
    isHot: true,
    views: 3892
  },
  {
    id: 'mock-4',
    title: 'Google DeepMind推出Gemini 2.0，原生多模态能力突破',
    summary: 'Google DeepMind发布Gemini 2.0，具备原生多模态输入输出能力，支持图像、音频、视频的实时理解和生成，在多项基准测试中领先。',
    url: 'https://deepmind.google/technologies/gemini/',
    source: 'Google',
    category: 'research',
    publishedAt: new Date(Date.now() - 10800000).toISOString(),
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800',
    isHot: false,
    views: 2341
  },
  {
    id: 'mock-5',
    title: '微软Copilot迎来重大更新，支持AI Agent自主执行',
    summary: '微软宣布Copilot Studio支持构建自主AI Agent，可独立完成复杂业务流程，同时推出Copilot Actions功能，自动化日常办公任务。',
    url: 'https://www.microsoft.com/en-us/microsoft-copilot/blog/',
    source: 'Microsoft',
    category: 'application',
    publishedAt: new Date(Date.now() - 14400000).toISOString(),
    image: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=800',
    isHot: false,
    views: 2876
  },
  {
    id: 'mock-6',
    title: '欧盟AI法案正式实施，科技巨头加速合规',
    summary: '欧盟《人工智能法案》正式进入实施阶段，对高风险AI系统实施严格监管要求，Google、Microsoft等科技公司纷纷调整产品策略以符合新规。',
    url: 'https://artificialintelligenceact.eu/',
    source: 'TechCrunch',
    category: 'policy',
    publishedAt: new Date(Date.now() - 18000000).toISOString(),
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800',
    isHot: false,
    views: 1987
  },
  {
    id: 'mock-7',
    title: '字节跳动豆包大模型日调用量突破4万亿',
    summary: '字节跳动宣布豆包大模型日均调用量突破4万亿次，成为全球使用量最大的大模型之一，同时推出视频生成模型PixelDance。',
    url: 'https://www.doubao.com/',
    source: '36氪',
    category: 'llm',
    publishedAt: new Date(Date.now() - 21600000).toISOString(),
    image: 'https://images.unsplash.com/photo-1676299081847-824916de030a?w=800',
    isHot: false,
    views: 2156
  },
  {
    id: 'mock-8',
    title: 'Meta发布Llama 3.3，70B参数媲美405B性能',
    summary: 'Meta发布Llama 3.3 70B模型，在保持较小参数量的同时达到Llama 3.1 405B的性能水平，大幅降低部署成本，推动开源大模型普及。',
    url: 'https://ai.meta.com/blog/llama-3-3/',
    source: 'VentureBeat',
    category: 'llm',
    publishedAt: new Date(Date.now() - 25200000).toISOString(),
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
    isHot: false,
    views: 3421
  },
  {
    id: 'mock-9',
    title: '特斯拉FSD V13发布，端到端神经网络全面升级',
    summary: '特斯拉发布FSD V13版本，采用全新的端到端神经网络架构，取消传统规则代码，实现更自然的自动驾驶体验，同时扩大测试范围。',
    url: 'https://www.tesla.com/autopilot',
    source: '机器之心',
    category: 'application',
    publishedAt: new Date(Date.now() - 28800000).toISOString(),
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800',
    isHot: false,
    views: 1876
  },
  {
    id: 'mock-10',
    title: 'DeepSeek-V3发布，国产大模型再创佳绩',
    summary: 'DeepSeek发布V3版本大模型，在多项基准测试中接近GPT-4水平，同时保持极低的API定价，引发行业关注，推动AI民主化进程。',
    url: 'https://www.deepseek.com/',
    source: 'InfoQ',
    category: 'llm',
    publishedAt: new Date(Date.now() - 32400000).toISOString(),
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
    isHot: true,
    views: 4543
  },
  {
    id: 'mock-11',
    title: '百度文心一言4.0发布，多模态能力全面升级',
    summary: '百度发布文心一言4.0版本，在图像理解、视频分析、代码生成等多模态能力方面实现突破，同时推出企业级AI解决方案。',
    url: 'https://yiyan.baidu.com/',
    source: '量子位',
    category: 'llm',
    publishedAt: new Date(Date.now() - 36000000).toISOString(),
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
    isHot: false,
    views: 2034
  },
  {
    id: 'mock-12',
    title: 'OpenAI Sora正式开放，AI视频生成进入新时代',
    summary: 'OpenAI正式向公众开放Sora视频生成模型，支持最长60秒高清视频生成，具备物理世界理解能力，引发影视创作行业变革。',
    url: 'https://openai.com/index/sora/',
    source: '机器之心',
    category: 'application',
    publishedAt: new Date(Date.now() - 39600000).toISOString(),
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    isHot: true,
    views: 6234
  },
  {
    id: 'mock-13',
    title: '阿里通义千问3.0发布，开源生态持续扩大',
    summary: '阿里云发布通义千问3.0系列模型，推出Qwen2.5开源版本，在代码、数学、推理等能力上取得显著进步，持续推动开源社区发展。',
    url: 'https://tongyi.aliyun.com/',
    source: '36氪',
    category: 'llm',
    publishedAt: new Date(Date.now() - 43200000).toISOString(),
    image: 'https://images.unsplash.com/photo-1676299081847-824916de030a?w=800',
    isHot: false,
    views: 1856
  },
  {
    id: 'mock-14',
    title: 'Stability AI推出Stable Diffusion 3.5',
    summary: 'Stability AI发布Stable Diffusion 3.5，在图像质量、文字渲染、多主体生成等方面实现重大突破，同时保持开源免费使用。',
    url: 'https://stability.ai/news/stable-diffusion-3-5',
    source: 'VentureBeat',
    category: 'application',
    publishedAt: new Date(Date.now() - 46800000).toISOString(),
    image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800',
    isHot: false,
    views: 2134
  },
  {
    id: 'mock-15',
    title: '华为发布昇腾910C芯片，国产AI算力新突破',
    summary: '华为发布新一代AI训练芯片昇腾910C，采用先进制程工艺，算力密度提升50%，为国产AI基础设施提供重要支撑。',
    url: 'https://www.huawei.com/cn/products/computing/ascend',
    source: '量子位',
    category: 'chip',
    publishedAt: new Date(Date.now() - 50400000).toISOString(),
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
    isHot: true,
    views: 3567
  }
]

const mockSummary = `今日共收录 ${mockNews.length} 条AI领域资讯，涵盖大模型、芯片算力、应用落地等多个热门方向。热门话题包括：OpenAI发布GPT-4.5、Sora正式开放、DeepSeek-V3发布等。各领域分布：大模型7条、芯片算力2条、应用落地4条、政策法规1条、研究突破1条。资讯来源：OpenAI、NVIDIA、Anthropic、Google、Microsoft、Meta、百度、阿里等国内外领先企业。`

export function getMockNews() {
  return mockNews
}

export function getMockSummary() {
  return mockSummary
}

export function getMockNewsByCategory(category) {
  if (category === 'all') return mockNews
  return mockNews.filter(news => news.category === category)
}

export function searchMockNews(query) {
  const lowerQuery = query.toLowerCase()
  return mockNews.filter(news => 
    news.title.toLowerCase().includes(lowerQuery) ||
    news.summary.toLowerCase().includes(lowerQuery)
  )
}
