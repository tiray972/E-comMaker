import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Boutique introuvable</h2>
        <p className="text-muted-foreground mb-6">
          La boutique que vous recherchez n&apos;existe pas ou vous n&apos;avez pas les autorisations nécessaires.
        </p>
        <Button asChild>
          <Link href="/dashboard">
            Retour au Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
}