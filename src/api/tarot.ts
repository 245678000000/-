import { allCards } from '@/data/tarot/cards';
import { simulateDelay, maybeThrow } from './config';
import { createSeededRandom, buildSeed, seededShuffle } from '@/utils/seededRandom';
import type { TarotCard, DrawnCard, SpreadType } from '@/types/tarot';

export async function fetchAllCards(): Promise<TarotCard[]> {
  await simulateDelay();
  maybeThrow();
  return allCards;
}

export async function fetchCardById(cardId: string): Promise<TarotCard | undefined> {
  await simulateDelay();
  maybeThrow();
  return allCards.find((c) => c.id === cardId);
}

export interface DrawCardsParams {
  spread: SpreadType;
  question: string;
  salt: string;
}

export async function drawCards({ spread, question, salt }: DrawCardsParams): Promise<DrawnCard[]> {
  await simulateDelay();
  maybeThrow();

  const seed = buildSeed(spread, question, salt);
  const rng = createSeededRandom(seed);
  const count = spread === 'single' ? 1 : 3;
  const positions: Array<'past' | 'present' | 'future' | undefined> =
    spread === 'three-card' ? ['past', 'present', 'future'] : [undefined];

  const shuffled = seededShuffle(allCards, rng);
  const drawn: DrawnCard[] = shuffled.slice(0, count).map((card, i) => ({
    card,
    isReversed: rng() < 0.5,
    position: positions[i],
  }));

  return drawn;
}
