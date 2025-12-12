import { Metadata } from 'next';
import TypingPracticeClient from './components/TypingPracticeClient';
import { getArticlesByCategory } from '../../../lib/server/articles';
import { stripHtml } from '../../../lib/text';

export const metadata: Metadata = {
  title: 'Typing Practice | Free Online Typing Test',
  description:
    'Improve your typing speed with live articles, accuracy tracking, and instant words-per-minute stats. Browser-based, no account needed.',
  keywords: ['typing practice', 'typing test', 'typing speed test', 'typing online', 'wpm test', 'free typing tool'],
  openGraph: {
    title: 'Typing Practice | Free Online Typing Test',
    description: 'Practice typing with fresh text and WPM stats. No sign-up, works in your browser.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Typing Practice - Free WPM Test',
    description: 'Boost your typing speed with instant WPM and accuracy feedback.',
  },
};

async function fetchLatestTechText(): Promise<string> {
  try {
    const [latest] = await getArticlesByCategory('Technology', { limit: 10 });
    const text = stripHtml(latest?.content || latest?.summary || '');
    return (
      text.replace(/\s+/g, ' ').trim().slice(0, 2000) ||
      'Welcome to typing practice'
    );
  } catch {
    return 'Welcome to typing practice';
  }
}

export default async function TypingPracticePage() {
  const text = await fetchLatestTechText();
  return <TypingPracticeClient initialText={text} />;
}
