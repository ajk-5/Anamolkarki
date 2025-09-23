import { Metadata } from 'next';
import TetrisGame from './TetrisGame';


export const metadata: Metadata = {
  title: 'Tetris',
  description: 'Play a responsive Tetris game with photorealistic themes and mobile touch controls.',
  keywords: ['tetris', 'tetris game', 'block puzzle', 'web game', 'browser game', 'mobile game', 'touch controls', 'photorealistic themes'],
  alternates: { canonical: '/games/tetris' },
  openGraph: {
    title: 'Tetris — Play Online',
    description: 'Play a responsive Tetris game with photorealistic themes and mobile-friendly controls.',
    url: '/games/tetris',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Tetris — Play Online',
    description: 'Play a responsive Tetris game with photorealistic themes and mobile-friendly controls.',
  },
  robots: { index: true, follow: true },
};

export default function TetrisPage() {
  return <TetrisGame />;
}
