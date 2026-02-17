import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '@/i18n/context';
import { drawCards } from '@/api/tarot';
import { generateReading } from '@/utils/reading';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import type { SpreadType } from '@/types/tarot';
import { Sparkles, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SALT_KEY = 'tarot-salt';

function getSalt(): string {
  let salt = localStorage.getItem(SALT_KEY);
  if (!salt) {
    salt = Math.random().toString(36).slice(2, 10);
    localStorage.setItem(SALT_KEY, salt);
  }
  return salt;
}

export default function Draw() {
  const { t, locale } = useI18n();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [question, setQuestion] = useState('');
  const [spread, setSpread] = useState<SpreadType>('single');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = locale === 'zh' ? '塔罗抽牌 — 塔罗秘境' : 'Draw Cards — Tarot Oracle';
  }, [locale]);

  const handleReshuffle = () => {
    const newSalt = Math.random().toString(36).slice(2, 10);
    localStorage.setItem(SALT_KEY, newSalt);
    toast({ title: locale === 'zh' ? '已重新洗牌' : 'Cards reshuffled' });
  };

  const handleDraw = useCallback(async () => {
    setLoading(true);
    try {
      const salt = getSalt();
      const drawnCards = await drawCards({ spread, question, salt });
      const reading = generateReading(drawnCards, spread, question);
      localStorage.setItem('tarot-current-reading', JSON.stringify(reading));
      navigate('/reading', { state: { reading } });
    } catch {
      toast({ title: t('draw.error'), variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [spread, question, navigate, toast, t]);

  return (
    <main className="container mx-auto max-w-lg px-4 py-12">
      <h1 className="mb-8 text-center font-display text-4xl font-bold">{t('draw.title')}</h1>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="question">{t('draw.question.label')}</Label>
          <Textarea
            id="question"
            placeholder={t('draw.question.placeholder')}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="resize-none"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label>{t('draw.spread.label')}</Label>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {(['single', 'three-card'] as SpreadType[]).map((s) => (
              <button
                key={s}
                onClick={() => setSpread(s)}
                className={`rounded-lg border p-4 text-left transition-all ${
                  spread === s
                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                    : 'border-border hover:border-primary/30'
                }`}
              >
                <span className="text-sm font-medium">
                  {s === 'single' ? t('draw.spread.single') : t('draw.spread.three')}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={handleDraw} disabled={loading} className="flex-1 gap-2" size="lg">
            <Sparkles className="h-4 w-4" />
            {loading ? t('draw.btn.drawing') : t('draw.btn.draw')}
          </Button>
          <Button variant="outline" size="lg" onClick={handleReshuffle} disabled={loading}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </main>
  );
}
