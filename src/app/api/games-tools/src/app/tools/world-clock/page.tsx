
// Data courtesy of Open-Meteo (https://open-meteo.com/)

import { Metadata } from 'next';

import { WORLD_CITIES, WorldCity } from '@/lib/worldCities';
import WorldClockClient from './WorldClockClient';
import type { CityWeather } from './types';


export const metadata: Metadata = {
  title: 'World Clock – Global Time & Weather',
  description: 'Current local time and weather for 100 major cities around the world.',
  keywords: ['world clock', 'global time', 'weather', 'cities', 'tools'],
};

async function fetchCity(city: WorldCity): Promise<CityWeather> {
  const now = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: city.timezone,
  }).format(new Date());

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true&timezone=${encodeURIComponent(city.timezone)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    return {
      ...city,
      time: now,
      temperature: data.current_weather?.temperature ?? 0,
      weathercode: data.current_weather?.weathercode ?? 0,
      is_day: data.current_weather?.is_day ?? 1,
    };
  } catch {
    return {
      ...city,
      time: now,
      temperature: 0,
      weathercode: 0,
      is_day: 1,
    };
  }
}

export default async function WorldClockPage() {
  const cities = await Promise.all(WORLD_CITIES.map(fetchCity));
  return <WorldClockClient cities={cities} />;
}

