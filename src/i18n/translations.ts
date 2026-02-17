export type TranslationKey = keyof typeof translations;

export const translations = {
  // Nav
  'nav.home': { zh: '首页', en: 'Home' },
  'nav.draw': { zh: '抽牌', en: 'Draw' },
  'nav.cards': { zh: '牌库', en: 'Cards' },
  'nav.journal': { zh: '记录', en: 'Journal' },
  'nav.about': { zh: '关于', en: 'About' },

  // Home
  'home.title': { zh: '塔罗秘境', en: 'Tarot Oracle' },
  'home.subtitle': { zh: '倾听宇宙的低语，解读命运的密码', en: 'Listen to the whispers of the universe, decode the secrets of fate' },
  'home.cta.draw': { zh: '开始抽牌', en: 'Start Drawing' },
  'home.cta.cards': { zh: '浏览牌库', en: 'Browse Cards' },

  // Draw
  'draw.title': { zh: '塔罗抽牌', en: 'Tarot Draw' },
  'draw.question.label': { zh: '你的问题（可选）', en: 'Your Question (optional)' },
  'draw.question.placeholder': { zh: '在心中默念你的问题...', en: 'Focus on your question...' },
  'draw.spread.label': { zh: '选择牌阵', en: 'Choose Spread' },
  'draw.spread.single': { zh: '单张牌 · 今日指引', en: 'Single Card · Daily Guidance' },
  'draw.spread.three': { zh: '三张牌 · 过去-现在-未来', en: 'Three Cards · Past-Present-Future' },
  'draw.btn.draw': { zh: '抽牌', en: 'Draw Cards' },
  'draw.btn.drawing': { zh: '占卜中...', en: 'Drawing...' },
  'draw.btn.reshuffle': { zh: '重新洗牌', en: 'Reshuffle' },
  'draw.error': { zh: '占卜失败，请重试', en: 'Drawing failed, please retry' },

  // Reading
  'reading.title.single': { zh: '单张牌解读', en: 'Single Card Reading' },
  'reading.title.three': { zh: '过去 · 现在 · 未来', en: 'Past · Present · Future' },
  'reading.question': { zh: '你的问题', en: 'Your Question' },
  'reading.upright': { zh: '正位', en: 'Upright' },
  'reading.reversed': { zh: '逆位', en: 'Reversed' },
  'reading.keywords': { zh: '关键词', en: 'Keywords' },
  'reading.meaning': { zh: '核心含义', en: 'Core Meaning' },
  'reading.do': { zh: '宜', en: 'Do' },
  'reading.dont': { zh: '忌', en: "Don't" },
  'reading.summary': { zh: '综合解读', en: 'Summary' },
  'reading.conclusion': { zh: '一句话结论', en: 'Conclusion' },
  'reading.yesno': { zh: '是/否倾向', en: 'Yes/No Tendency' },
  'reading.yesno.yes': { zh: '倾向「是」', en: 'Leans Yes' },
  'reading.yesno.no': { zh: '倾向「否」', en: 'Leans No' },
  'reading.yesno.neutral': { zh: '中立 · 需进一步探索', en: 'Neutral · Explore Further' },
  'reading.btn.copy': { zh: '复制分享', en: 'Copy & Share' },
  'reading.btn.save': { zh: '保存记录', en: 'Save to Journal' },
  'reading.btn.again': { zh: '再抽一次', en: 'Draw Again' },
  'reading.copied': { zh: '已复制到剪贴板', en: 'Copied to clipboard' },
  'reading.saved': { zh: '已保存到记录', en: 'Saved to journal' },
  'reading.past': { zh: '过去', en: 'Past' },
  'reading.present': { zh: '现在', en: 'Present' },
  'reading.future': { zh: '未来', en: 'Future' },
  'reading.guidance': { zh: '指引', en: 'Guidance' },
  'reading.nodata': { zh: '暂无解读数据，请先抽牌', en: 'No reading data. Please draw cards first.' },

  // Cards
  'cards.title': { zh: '塔罗牌库', en: 'Tarot Library' },
  'cards.search': { zh: '搜索牌名...', en: 'Search card name...' },
  'cards.filter.all': { zh: '全部', en: 'All' },
  'cards.filter.major': { zh: '大阿卡纳', en: 'Major Arcana' },
  'cards.filter.minor': { zh: '小阿卡纳', en: 'Minor Arcana' },
  'cards.filter.wands': { zh: '权杖', en: 'Wands' },
  'cards.filter.cups': { zh: '圣杯', en: 'Cups' },
  'cards.filter.swords': { zh: '宝剑', en: 'Swords' },
  'cards.filter.pentacles': { zh: '钱币', en: 'Pentacles' },
  'cards.empty': { zh: '未找到匹配的牌', en: 'No cards found' },
  'cards.sort.number': { zh: '按编号', en: 'By Number' },

  // Card Detail
  'card.upright': { zh: '正位含义', en: 'Upright Meaning' },
  'card.reversed': { zh: '逆位含义', en: 'Reversed Meaning' },
  'card.symbols': { zh: '象征元素', en: 'Symbols' },
  'card.planet': { zh: '行星', en: 'Planet' },
  'card.element': { zh: '元素', en: 'Element' },
  'card.zodiac': { zh: '星座', en: 'Zodiac' },
  'card.numerology': { zh: '数字学', en: 'Numerology' },
  'card.lifeScenario': { zh: '生活场景解读', en: 'Life Scenario' },
  'card.related': { zh: '相关牌推荐', en: 'Related Cards' },
  'card.back': { zh: '返回牌库', en: 'Back to Library' },

  // Journal
  'journal.title': { zh: '占卜记录', en: 'Journal' },
  'journal.empty': { zh: '暂无占卜记录', en: 'No readings yet' },
  'journal.empty.desc': { zh: '去抽一次牌，开启你的塔罗旅程', en: 'Draw some cards to begin your tarot journey' },
  'journal.btn.view': { zh: '查看详情', en: 'View Details' },
  'journal.btn.delete': { zh: '删除', en: 'Delete' },
  'journal.btn.clearAll': { zh: '清空全部', en: 'Clear All' },
  'journal.btn.export': { zh: '导出 JSON', en: 'Export JSON' },
  'journal.confirmClear': { zh: '确定清空所有记录吗？', en: 'Clear all journal entries?' },
  'journal.spread.single': { zh: '单张牌', en: 'Single Card' },
  'journal.spread.three': { zh: '三张牌', en: 'Three Cards' },

  // About
  'about.title': { zh: '关于塔罗秘境', en: 'About Tarot Oracle' },
  'about.disclaimer.title': { zh: '免责声明', en: 'Disclaimer' },
  'about.disclaimer.zh': {
    zh: '塔罗牌解读仅供娱乐与自我反思之用，不构成任何医疗、法律或投资建议。请勿将塔罗结果作为重大人生决策的唯一依据。',
    en: '塔罗牌解读仅供娱乐与自我反思之用，不构成任何医疗、法律或投资建议。请勿将塔罗结果作为重大人生决策的唯一依据。',
  },
  'about.disclaimer.en': {
    zh: 'Tarot readings are for entertainment and self-reflection only. They do not constitute medical, legal, or financial advice. Do not use tarot results as the sole basis for major life decisions.',
    en: 'Tarot readings are for entertainment and self-reflection only. They do not constitute medical, legal, or financial advice. Do not use tarot results as the sole basis for major life decisions.',
  },

  // Theme
  'theme.light': { zh: '浅色', en: 'Light' },
  'theme.dark': { zh: '暗色', en: 'Dark' },

  // 404
  'notfound.title': { zh: '迷失在星空中', en: 'Lost in the Stars' },
  'notfound.desc': { zh: '这条命运之路似乎不存在...', en: 'This path of destiny does not seem to exist...' },
  'notfound.back': { zh: '回到首页', en: 'Return Home' },

  // Common
  'common.loading': { zh: '加载中...', en: 'Loading...' },
  'common.error': { zh: '出错了', en: 'Something went wrong' },
  'common.retry': { zh: '重试', en: 'Retry' },
} as const;
