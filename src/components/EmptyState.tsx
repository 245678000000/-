import { Sparkles } from 'lucide-react';

export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Sparkles className="mb-4 h-10 w-10 text-muted-foreground/40" />
      <h3 className="font-display text-lg font-semibold text-muted-foreground">{title}</h3>
      {description && <p className="mt-1 text-sm text-muted-foreground/70">{description}</p>}
    </div>
  );
}
