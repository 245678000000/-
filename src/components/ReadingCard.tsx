import type { DrawnCard } from '@/types/tarot';
import { useI18n } from '@/i18n/context';
import { getDoAdvice, getDontAdvice } from '@/utils/reading';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ReadingCard({ drawnCard }: { drawnCard: DrawnCard }) {
  const { locale, t } = useI18n();
  const { card, isReversed, position } = drawnCard;

  const name = locale === 'zh' ? card.nameZh : card.nameEn;
  const meaning = isReversed
    ? (locale === 'zh' ? card.reversedMeaningZh : card.reversedMeaningEn)
    : (locale === 'zh' ? card.uprightMeaningZh : card.uprightMeaningEn);
  const keywords = isReversed
    ? (locale === 'zh' ? card.reversedKeywordsZh : card.reversedKeywordsEn)
    : (locale === 'zh' ? card.uprightKeywordsZh : card.uprightKeywordsEn);

  const doAdvice = getDoAdvice(drawnCard, locale);
  const dontAdvice = getDontAdvice(drawnCard, locale);

  const positionLabel = position
    ? t(`reading.${position}`)
    : t('reading.guidance');

  return (
    <Card className="animate-fade-in border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {positionLabel}
          </span>
          <Badge variant={isReversed ? 'destructive' : 'default'} className="text-xs">
            {isReversed ? t('reading.reversed') : t('reading.upright')}
          </Badge>
        </div>
        <CardTitle className="font-display text-2xl">{name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-1.5">
          {keywords.map((kw) => (
            <Badge key={kw} variant="secondary" className="text-xs">{kw}</Badge>
          ))}
        </div>

        <div>
          <h4 className="mb-1 text-sm font-semibold text-muted-foreground">{t('reading.meaning')}</h4>
          <p className="font-display text-base leading-relaxed">{meaning}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-md bg-primary/5 p-3">
            <h4 className="mb-1.5 text-xs font-semibold text-primary">✓ {t('reading.do')}</h4>
            <ul className="space-y-1 text-xs text-card-foreground">
              {doAdvice.map((a, i) => <li key={i}>· {a}</li>)}
            </ul>
          </div>
          <div className="rounded-md bg-destructive/5 p-3">
            <h4 className="mb-1.5 text-xs font-semibold text-destructive">✗ {t('reading.dont')}</h4>
            <ul className="space-y-1 text-xs text-card-foreground">
              {dontAdvice.map((a, i) => <li key={i}>· {a}</li>)}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
