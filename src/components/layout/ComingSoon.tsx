// Reusable "Coming Soon" component - Placeholder pages ke liye
import Link from 'next/link';
import { Construction, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ComingSoonProps {
  title    : string;
  subtitle : string;
  day      : number;
}

export function ComingSoon({ title, subtitle, day }: ComingSoonProps) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center px-4 max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-6">
          <Construction className="w-8 h-8 text-amber-400" />
        </div>
        <h1 className="text-2xl font-bold text-[#e8e8f0] mb-2">{title}</h1>
        <p className="text-[#6b6b8a] mb-2">{subtitle}</p>
        <p className="text-sm text-amber-400 font-medium mb-8">
          🚧 Coming in Day {day} of development
        </p>
        <Link href="/">
          <Button variant="outline" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}