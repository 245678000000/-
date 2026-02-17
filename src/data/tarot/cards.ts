import { majorArcana } from './majorArcana';
import { minorArcana } from './minorArcana';
import type { TarotCard } from '@/types/tarot';

export const allCards: TarotCard[] = [...majorArcana, ...minorArcana];

export function getCardById(id: string): TarotCard | undefined {
  return allCards.find((c) => c.id === id);
}

export function getRelatedCards(card: TarotCard, limit = 4): TarotCard[] {
  return allCards
    .filter((c) => c.id !== card.id && (c.suit === card.suit || c.arcana === card.arcana))
    .slice(0, limit);
}
