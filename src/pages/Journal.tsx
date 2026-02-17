import { useI18n } from '@/i18n/context';
import { useJournal } from '@/hooks/useJournal';
import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Trash2, Download, Trash, Eye } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Journal() {
  const { t, locale } = useI18n();
  const { entries, removeEntry, clearAll, exportJSON } = useJournal();
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    document.title = locale === 'zh' ? '占卜记录 — 塔罗秘境' : 'Journal — Tarot Oracle';
  }, [locale]);

  return (
    <main className="container mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-8 text-center font-display text-4xl font-bold">{t('journal.title')}</h1>

      {entries.length > 0 && (
        <div className="mb-6 flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={exportJSON} className="gap-1">
            <Download className="h-3.5 w-3.5" /> {t('journal.btn.export')}
          </Button>
          {confirmClear ? (
            <Button variant="destructive" size="sm" onClick={() => { clearAll(); setConfirmClear(false); }}>
              {t('journal.confirmClear')}
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setConfirmClear(true)} className="gap-1">
              <Trash className="h-3.5 w-3.5" /> {t('journal.btn.clearAll')}
            </Button>
          )}
        </div>
      )}

      {entries.length === 0 ? (
        <EmptyState title={t('journal.empty')} description={t('journal.empty.desc')} />
      ) : (
        <div className="space-y-3">
          {entries.map((entry) => {
            const cardNames = entry.drawnCards
              .map((dc) => locale === 'zh' ? dc.card.nameZh : dc.card.nameEn)
              .join(', ');
            const conclusion = locale === 'zh' ? entry.conclusionZh : entry.conclusionEn;
            return (
              <Card key={entry.id} className="transition-all hover:border-primary/30">
                <CardContent className="flex items-start justify-between gap-3 p-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{new Date(entry.timestamp).toLocaleDateString()}</span>
                      <span>·</span>
                      <span>{entry.spread === 'single' ? t('journal.spread.single') : t('journal.spread.three')}</span>
                    </div>
                    {entry.question && (
                      <p className="mt-1 truncate text-sm font-medium">{entry.question}</p>
                    )}
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">{cardNames}</p>
                    <p className="mt-1 text-xs text-primary">{conclusion}</p>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                      <Link to="/reading" state={{ reading: entry }}>
                        <Eye className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeEntry(entry.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </main>
  );
}
