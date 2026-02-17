import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useI18n } from '@/i18n/context';
import { useJournal } from '@/hooks/useJournal';
import { useToast } from '@/hooks/use-toast';
import { generateShareText } from '@/utils/reading';
import { ReadingCard } from '@/components/ReadingCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { ReadingResult } from '@/types/tarot';
import { Copy, Save, RefreshCw } from 'lucide-react';
import { useEffect, useMemo } from 'react';

export default function Reading() {
  const { t, locale } = useI18n();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addEntry } = useJournal();

  const reading: ReadingResult | null = useMemo(() => {
    if (location.state?.reading) return location.state.reading;
    try {
      const stored = localStorage.getItem('tarot-current-reading');
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  }, [location.state]);

  useEffect(() => {
    document.title = locale === 'zh' ? '塔罗解读 — 塔罗秘境' : 'Reading — Tarot Oracle';
  }, [locale]);

  if (!reading) {
    return (
      <main className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4">
        <p className="mb-4 text-muted-foreground">{t('reading.nodata')}</p>
        <Button asChild><Link to="/draw">{t('home.cta.draw')}</Link></Button>
      </main>
    );
  }

  const handleCopy = async () => {
    const text = generateShareText(reading, locale);
    await navigator.clipboard.writeText(text);
    toast({ title: t('reading.copied') });
  };

  const handleSave = () => {
    addEntry(reading);
    toast({ title: t('reading.saved') });
  };

  const summary = locale === 'zh' ? reading.summaryZh : reading.summaryEn;
  const conclusion = locale === 'zh' ? reading.conclusionZh : reading.conclusionEn;
  const isSingle = reading.spread === 'single';
  const yesNo = isSingle ? reading.drawnCards[0].card.yesNoTendency : null;
  const yesNoReversed = isSingle && reading.drawnCards[0].isReversed;

  return (
    <main className="container mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-2 text-center font-display text-3xl font-bold">
        {isSingle ? t('reading.title.single') : t('reading.title.three')}
      </h1>
      {reading.question && (
        <p className="mb-8 text-center text-sm text-muted-foreground">
          {t('reading.question')}：{reading.question}
        </p>
      )}

      <div className="space-y-6">
        {reading.drawnCards.map((dc, i) => (
          <ReadingCard key={i} drawnCard={dc} />
        ))}
      </div>

      {isSingle && yesNo && (
        <div className="mt-8 rounded-lg border border-primary/20 bg-card p-4 text-center">
          <h3 className="mb-2 text-sm font-semibold text-muted-foreground">{t('reading.yesno')}</h3>
          <Badge variant={yesNoReversed ? 'destructive' : 'default'} className="text-base px-4 py-1">
            {yesNoReversed
              ? (yesNo === 'yes' ? t('reading.yesno.no') : yesNo === 'no' ? t('reading.yesno.yes') : t('reading.yesno.neutral'))
              : t(`reading.yesno.${yesNo}`)}
          </Badge>
        </div>
      )}

      <div className="mt-8 space-y-4 rounded-lg border border-border bg-card p-6">
        <h3 className="font-display text-xl font-semibold">{t('reading.summary')}</h3>
        <p className="whitespace-pre-line text-sm leading-relaxed text-card-foreground">{summary}</p>
        <div className="border-t border-border pt-4">
          <h4 className="mb-1 text-xs font-semibold text-muted-foreground">{t('reading.conclusion')}</h4>
          <p className="font-display text-base font-medium text-primary">{conclusion}</p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button variant="outline" onClick={handleCopy} className="gap-2">
          <Copy className="h-4 w-4" /> {t('reading.btn.copy')}
        </Button>
        <Button variant="outline" onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" /> {t('reading.btn.save')}
        </Button>
        <Button onClick={() => navigate('/draw')} className="gap-2">
          <RefreshCw className="h-4 w-4" /> {t('reading.btn.again')}
        </Button>
      </div>
    </main>
  );
}
