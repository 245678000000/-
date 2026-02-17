import { useState, useMemo, useEffect } from 'react';
import { useI18n } from '@/i18n/context';
import { allCards } from '@/data/tarot/cards';
import { TarotCardTile } from '@/components/TarotCardTile';
import { EmptyState } from '@/components/EmptyState';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import type { Suit } from '@/types/tarot';

type Filter = 'all' | 'major' | 'minor' | Suit;

export default function Cards() {
  const { t, locale } = useI18n();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    document.title = locale === 'zh' ? '塔罗牌库 — 塔罗秘境' : 'Card Library — Tarot Oracle';
  }, [locale]);

  const filters: { value: Filter; label: string }[] = [
    { value: 'all', label: t('cards.filter.all') },
    { value: 'major', label: t('cards.filter.major') },
    { value: 'minor', label: t('cards.filter.minor') },
    { value: 'wands', label: t('cards.filter.wands') },
    { value: 'cups', label: t('cards.filter.cups') },
    { value: 'swords', label: t('cards.filter.swords') },
    { value: 'pentacles', label: t('cards.filter.pentacles') },
  ];

  const filtered = useMemo(() => {
    let cards = allCards;
    if (filter === 'major') cards = cards.filter((c) => c.arcana === 'major');
    else if (filter === 'minor') cards = cards.filter((c) => c.arcana === 'minor');
    else if (['wands', 'cups', 'swords', 'pentacles'].includes(filter))
      cards = cards.filter((c) => c.suit === filter);

    if (search.trim()) {
      const q = search.toLowerCase();
      cards = cards.filter(
        (c) => c.nameZh.includes(q) || c.nameEn.toLowerCase().includes(q)
      );
    }
    return cards;
  }, [filter, search]);

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-center font-display text-4xl font-bold">{t('cards.title')}</h1>

      <div className="mb-6 space-y-4">
        <Input
          placeholder={t('cards.search')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm mx-auto"
          aria-label={t('cards.search')}
        />
        <div className="flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <Badge
              key={f.value}
              variant={filter === f.value ? 'default' : 'outline'}
              className="cursor-pointer select-none"
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </Badge>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title={t('cards.empty')} />
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((card) => (
            <TarotCardTile key={card.id} card={card} />
          ))}
        </div>
      )}
    </main>
  );
}
