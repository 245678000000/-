export type Suit = 'wands' | 'cups' | 'swords' | 'pentacles';
export type Arcana = 'major' | 'minor';
export type SpreadType = 'single' | 'three-card';
export type YesNoTendency = 'yes' | 'no' | 'neutral';
export type Locale = 'zh' | 'en';

export interface TarotCard {
  id: string;
  number: number;
  nameZh: string;
  nameEn: string;
  arcana: Arcana;
  suit?: Suit;
  uprightMeaningZh: string;
  uprightMeaningEn: string;
  reversedMeaningZh: string;
  reversedMeaningEn: string;
  uprightKeywordsZh: string[];
  uprightKeywordsEn: string[];
  reversedKeywordsZh: string[];
  reversedKeywordsEn: string[];
  symbolPlanet?: string;
  symbolElement?: string;
  symbolZodiac?: string;
  symbolNumerology?: string;
  yesNoTendency: YesNoTendency;
  lifeScenariosZh: string;
  lifeScenariosEn: string;
}

export interface DrawnCard {
  card: TarotCard;
  isReversed: boolean;
  position?: 'past' | 'present' | 'future';
}

export interface ReadingResult {
  id: string;
  timestamp: number;
  spread: SpreadType;
  question: string;
  drawnCards: DrawnCard[];
  summaryZh: string;
  summaryEn: string;
  conclusionZh: string;
  conclusionEn: string;
}

export type JournalEntry = ReadingResult;
