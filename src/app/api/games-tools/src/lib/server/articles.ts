export interface Article {
  id: string;
  title: string;
  summary?: string;
  content?: string;
  category: string;
  url?: string;
  publishedAt?: string;
}

const FALLBACK_ARTICLES: Article[] = [
  {
    id: 'tech-trends-ai',
    title: 'AI is reshaping everyday productivity',
    summary:
      'From copilots to search, practical AI features are rolling out to mainstream audiences at a rapid pace.',
    content:
      'Artificial intelligence is showing up in the tools people already use each day. Productivity suites, creative apps, and even web browsers now offer generative assistants that summarize information, draft content, and automate repetitive workflows. Analysts expect the trend to continue as models become faster and more efficient to run on consumer hardware.',
    category: 'Technology',
    publishedAt: '2024-01-15T00:00:00.000Z',
  },
];

interface FetchOptions {
  limit?: number;
}

export async function getArticlesByCategory(
  category: string,
  options: FetchOptions = {}
): Promise<Article[]> {
  const { limit } = options;
  const articles = FALLBACK_ARTICLES.filter(
    (article) => article.category.toLowerCase() === category.toLowerCase()
  );
  return limit ? articles.slice(0, limit) : articles;
}
