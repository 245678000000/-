import { useI18n } from '@/i18n/context';
import { useEffect } from 'react';

export default function About() {
  const { t, locale } = useI18n();

  useEffect(() => {
    document.title = locale === 'zh' ? '关于 — 塔罗秘境' : 'About — Tarot Oracle';
  }, [locale]);

  return (
    <main className="container mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-8 text-center font-display text-4xl font-bold">{t('about.title')}</h1>

      <div className="space-y-8">
        <section className="rounded-lg border border-border bg-card p-6">
          <h2 className="mb-4 font-display text-xl font-semibold">{t('about.disclaimer.title')}</h2>
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>{t('about.disclaimer.zh')}</p>
            <p className="italic">{t('about.disclaimer.en')}</p>
          </div>
        </section>
      </div>
    </main>
  );
}
