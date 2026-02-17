import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '@/i18n/context';
import { Home, Sparkles, BookOpen, Clock } from 'lucide-react';

export function FooterTabs() {
  const { t } = useI18n();
  const location = useLocation();

  const tabs = [
    { to: '/', icon: Home, label: t('nav.home') },
    { to: '/draw', icon: Sparkles, label: t('nav.draw') },
    { to: '/cards', icon: BookOpen, label: t('nav.cards') },
    { to: '/journal', icon: Clock, label: t('nav.journal') },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/90 backdrop-blur-md md:hidden">
      <div className="flex h-14 items-center justify-around">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.to;
          return (
            <Link
              key={tab.to}
              to={tab.to}
              className={`flex flex-col items-center gap-0.5 text-xs transition-colors ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
