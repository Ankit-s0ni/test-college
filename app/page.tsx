import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-4xl font-sans">
      <Button>Hello world!</Button>
      <Link className="text-disabled hover:text-action-hover" href={'/about'}>
        About
      </Link>
    </div>
  );
}
