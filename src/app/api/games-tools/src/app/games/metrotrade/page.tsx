import { Metadata } from 'next';
import MetroTradeGame from '@/components/metrotrade';


export const metadata: Metadata = {
  title: 'MetroTrader Strategy Game | Build Your Transit Empire',
  description: 'Play MetroTrader, the trending city transit strategy game from The Nineties Times arcade. Balance budgets, upgrade lines, and beat the daily commute.',
  keywords: [
    'metro trader game',
    'transit strategy simulator',
    'city builder browser game',
    'metro management game',
    '90sTimes arcade',
    'casual strategy game',
    'play metro trader online'
  ],
  alternates: { canonical: '/games/metrotrade' },
  openGraph: {
    title: 'Play MetroTrader Online',
    description: 'Manage routes, upgrade trains, and build the ultimate metro empire in MetroTrader by The Nineties Times.',
    url: '/games/metrotrade',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'MetroTrader Strategy Game',
    description: 'Test your transport skills with MetroTrader-upgrade tracks, manage riders, and keep the city moving.',
  },
};

export default function MetroTradePage() {
  return <MetroTradeGame />;
}
