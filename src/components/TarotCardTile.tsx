import { Link } from 'react-router-dom';
import type { TarotCard } from '@/types/tarot';
import { useI18n } from '@/i18n/context';

const suitSymbols: Record<string, string> = {
  wands: '🔥',
  cups: '💧',
  swords: '⚔️',
  pentacles: '⭐',
};

export function TarotCardTile({ card }: { card: TarotCard }) {
  const { locale } = useI18n();
  const name = locale === 'zh' ? card.nameZh : card.nameEn;
  const symbol = card.suit ? suitSymbols[card.suit] : '✦';

  return (
    <Link
      to={`/card/${card.id}`}
      className="group flex flex-col items-center rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-md"
    >
      <div className="mb-3 flex h-24 w-16 items-center justify-center rounded-md bg-gradient-to-b from-primary/10 to-accent/20 text-3xl transition-transform group-hover:scale-105">
        {symbol}
      </div>
      <span className="text-center text-sm font-medium text-card-foreground">{name}</span>
      <span className="mt-0.5 text-xs text-muted-foreground">
        {card.arcana === 'major' ? (locale === 'zh' ? '大阿卡纳' : 'Major') : (locale === 'zh' ? card.suit && { wands: '权杖', cups: '圣杯', swords: '宝剑', pentacles: '钱币' }[card.suit] : card.suit)}
      </span>
    </Link>
  );
}
