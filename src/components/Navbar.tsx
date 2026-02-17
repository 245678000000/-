import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '@/i18n/context';
import { useTheme } from '@/hooks/useTheme';
import { Moon, Sun, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const { t, locale, setLocale } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/draw', label: t('nav.draw') },
    { to: '/cards', label: t('nav.cards') },
    { to: '/journal', label: t('nav.journal') },
    { to: '/about', label: t('nav.about') },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link to="/" className="font-display text-xl font-semibold tracking-wide text-primary">
          {locale === 'zh' ? '塔罗秘境' : 'Tarot Oracle'}
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-muted ${
                location.pathname === l.to ? 'font-medium text-primary' : 'text-muted-foreground'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocale(locale === 'zh' ? 'en' : 'zh')}
            aria-label="Toggle language"
          >
            <Globe className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </nav>
    </header>
  );
}
