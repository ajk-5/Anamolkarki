import { Metadata } from 'next';
import TypingPracticeClient from './components/TypingPracticeClient';
import { getArticlesByCategory } from '../../../lib/server/articles';
import { stripHtml } from '../../../lib/text';

export const metadata: Metadata = {
  title: 'Typing Practice',
  description:
    'Practice typing online using the our latest technology article. Typing test1, practice typing test, typing online practice81, typing online, practice typing online, typing master.',
  keywords: [
    'typing test1',
    'practice typing test',
    'typing online practice81',
    'typing online',
    'practice typing online',
    'typing master',
  ],
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
