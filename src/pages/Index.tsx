import { Link } from 'react-router-dom';
import { useI18n } from '@/i18n/context';
import { Button } from '@/components/ui/button';
import { Sparkles, BookOpen } from 'lucide-react';
import { useEffect } from 'react';

export default function Index() {
  const { t, locale } = useI18n();

  useEffect(() => {
    document.title = locale === 'zh' ? '塔罗秘境 — 倾听宇宙的低语' : 'Tarot Oracle — Listen to the Universe';
  }, [locale]);

  return (
    <main className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-4 text-center">
      <div className="animate-fade-in space-y-8">
        <div className="space-y-4">
          <h1 className="font-display text-5xl font-bold tracking-tight sm:text-7xl">
            {t('home.title')}
          </h1>
          <p className="mx-auto max-w-md text-lg text-muted-foreground">
            {t('home.subtitle')}
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="gap-2">
            <Link to="/draw">
              <Sparkles className="h-4 w-4" />
              {t('home.cta.draw')}
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link to="/cards">
              <BookOpen className="h-4 w-4" />
              {t('home.cta.cards')}
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
