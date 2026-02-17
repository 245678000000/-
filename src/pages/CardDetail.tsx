import { useParams, Link } from 'react-router-dom';
import { useI18n } from '@/i18n/context';
import { getCardById, getRelatedCards } from '@/data/tarot/cards';
import { TarotCardTile } from '@/components/TarotCardTile';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';

export default function CardDetail() {
  const { cardId } = useParams<{ cardId: string }>();
  const { t, locale } = useI18n();
  const card = cardId ? getCardById(cardId) : undefined;

  useEffect(() => {
    if (card) {
      document.title = `${locale === 'zh' ? card.nameZh : card.nameEn} — ${locale === 'zh' ? '塔罗秘境' : 'Tarot Oracle'}`;
    }
  }, [card, locale]);

  if (!card) {
    return (
      <main className="container mx-auto flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">Card not found</p>
      </main>
    );
  }

  const name = locale === 'zh' ? card.nameZh : card.nameEn;
  const related = getRelatedCards(card);

  const symbolEntries = [
    card.symbolPlanet && [t('card.planet'), card.symbolPlanet],
    card.symbolElement && [t('card.element'), card.symbolElement],
    card.symbolZodiac && [t('card.zodiac'), card.symbolZodiac],
    card.symbolNumerology && [t('card.numerology'), card.symbolNumerology],
  ].filter(Boolean) as [string, string][];

  return (
    <main className="container mx-auto max-w-2xl px-4 py-12">
      <Button asChild variant="ghost" size="sm" className="mb-6 gap-1">
        <Link to="/cards"><ArrowLeft className="h-4 w-4" /> {t('card.back')}</Link>
      </Button>

      <h1 className="mb-8 font-display text-4xl font-bold">{name}</h1>

      <div className="space-y-8">
        {/* Upright */}
        <section>
          <h2 className="mb-2 font-display text-xl font-semibold text-primary">{t('card.upright')}</h2>
          <p className="mb-3 leading-relaxed">{locale === 'zh' ? card.uprightMeaningZh : card.uprightMeaningEn}</p>
          <div className="flex flex-wrap gap-1.5">
            {(locale === 'zh' ? card.uprightKeywordsZh : card.uprightKeywordsEn).map((kw) => (
              <Badge key={kw} variant="secondary">{kw}</Badge>
            ))}
          </div>
        </section>

        {/* Reversed */}
        <section>
          <h2 className="mb-2 font-display text-xl font-semibold text-destructive">{t('card.reversed')}</h2>
          <p className="mb-3 leading-relaxed">{locale === 'zh' ? card.reversedMeaningZh : card.reversedMeaningEn}</p>
          <div className="flex flex-wrap gap-1.5">
            {(locale === 'zh' ? card.reversedKeywordsZh : card.reversedKeywordsEn).map((kw) => (
              <Badge key={kw} variant="outline">{kw}</Badge>
            ))}
          </div>
        </section>

        {/* Symbols */}
        {symbolEntries.length > 0 && (
          <section>
            <h2 className="mb-3 font-display text-xl font-semibold">{t('card.symbols')}</h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {symbolEntries.map(([label, value]) => (
                <div key={label} className="rounded-md border border-border p-3 text-center">
                  <span className="text-xs text-muted-foreground">{label}</span>
                  <p className="text-sm font-medium">{value}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Life Scenario */}
        <section>
          <h2 className="mb-2 font-display text-xl font-semibold">{t('card.lifeScenario')}</h2>
          <p className="leading-relaxed text-muted-foreground">
            {locale === 'zh' ? card.lifeScenariosZh : card.lifeScenariosEn}
          </p>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section>
            <h2 className="mb-4 font-display text-xl font-semibold">{t('card.related')}</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {related.map((c) => (
                <TarotCardTile key={c.id} card={c} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
