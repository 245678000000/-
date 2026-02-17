import type { DrawnCard, Locale, ReadingResult, SpreadType } from '@/types/tarot';

function getCardMeaning(dc: DrawnCard, locale: Locale): string {
  const { card, isReversed } = dc;
  if (locale === 'zh') {
    return isReversed ? card.reversedMeaningZh : card.uprightMeaningZh;
  }
  return isReversed ? card.reversedMeaningEn : card.uprightMeaningEn;
}

function getCardName(dc: DrawnCard, locale: Locale): string {
  const name = locale === 'zh' ? dc.card.nameZh : dc.card.nameEn;
  const pos = dc.isReversed
    ? (locale === 'zh' ? '逆位' : 'Reversed')
    : (locale === 'zh' ? '正位' : 'Upright');
  return `${name}（${pos}）`;
}

export function getDoAdvice(dc: DrawnCard, locale: Locale): string[] {
  const kw = dc.isReversed
    ? (locale === 'zh' ? dc.card.reversedKeywordsZh : dc.card.reversedKeywordsEn)
    : (locale === 'zh' ? dc.card.uprightKeywordsZh : dc.card.uprightKeywordsEn);

  if (locale === 'zh') {
    return [
      `拥抱「${kw[0]}」的力量，让它引领你前行`,
      `在日常中践行「${kw[1] || kw[0]}」，保持觉察`,
    ];
  }
  return [
    `Embrace the energy of "${kw[0]}" and let it guide you`,
    `Practice "${kw[1] || kw[0]}" in your daily life with awareness`,
  ];
}

export function getDontAdvice(dc: DrawnCard, locale: Locale): string[] {
  const kw = dc.isReversed
    ? (locale === 'zh' ? dc.card.uprightKeywordsZh : dc.card.uprightKeywordsEn)
    : (locale === 'zh' ? dc.card.reversedKeywordsZh : dc.card.reversedKeywordsEn);

  if (locale === 'zh') {
    return [
      `警惕「${kw[0]}」带来的迷惑，不要被表象蒙蔽`,
      `避免因「${kw[1] || kw[0]}」而做出仓促的决定`,
    ];
  }
  return [
    `Beware of the illusion of "${kw[0]}" — don't be misled`,
    `Avoid hasty decisions driven by "${kw[1] || kw[0]}"`,
  ];
}

export function generateReading(
  drawnCards: DrawnCard[],
  spread: SpreadType,
  question: string,
): ReadingResult {
  const id = `reading-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  // Generate summaries
  const summaryZh = drawnCards.map((dc, i) => {
    const posLabel = spread === 'three-card'
      ? ['过去', '现在', '未来'][i]
      : '指引';
    return `【${posLabel}】${getCardName(dc, 'zh')}——${getCardMeaning(dc, 'zh')}`;
  }).join('\n');

  const summaryEn = drawnCards.map((dc, i) => {
    const posLabel = spread === 'three-card'
      ? ['Past', 'Present', 'Future'][i]
      : 'Guidance';
    return `[${posLabel}] ${getCardName(dc, 'en')} — ${getCardMeaning(dc, 'en')}`;
  }).join('\n');

  // One-line conclusion
  const mainCard = drawnCards[drawnCards.length - 1];
  const mainKwZh = mainCard.isReversed ? mainCard.card.reversedKeywordsZh : mainCard.card.uprightKeywordsZh;
  const mainKwEn = mainCard.isReversed ? mainCard.card.reversedKeywordsEn : mainCard.card.uprightKeywordsEn;

  const conclusionZh = `此刻的核心启示：${mainKwZh.join('、')}。倾听内心，顺应命运的指引。`;
  const conclusionEn = `Core message: ${mainKwEn.join(', ')}. Listen to your inner voice and follow destiny's guidance.`;

  return {
    id,
    timestamp: Date.now(),
    spread,
    question,
    drawnCards,
    summaryZh,
    summaryEn,
    conclusionZh,
    conclusionEn,
  };
}

export function generateShareText(result: ReadingResult, locale: Locale): string {
  if (locale === 'zh') {
    const cards = result.drawnCards.map(dc => getCardName(dc, 'zh')).join(' | ');
    return `🔮 塔罗占卜结果\n❓ 问题：${result.question || '无特定问题'}\n🃏 牌阵：${result.spread === 'single' ? '单张牌' : '过去-现在-未来'}\n🎴 ${cards}\n📝 ${result.conclusionZh}`;
  }
  const cards = result.drawnCards.map(dc => getCardName(dc, 'en')).join(' | ');
  return `🔮 Tarot Reading\n❓ Question: ${result.question || 'No specific question'}\n🃏 Spread: ${result.spread === 'single' ? 'Single Card' : 'Past-Present-Future'}\n🎴 ${cards}\n📝 ${result.conclusionEn}`;
}
