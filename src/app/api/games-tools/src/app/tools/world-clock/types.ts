import type { WorldCity } from '../../../lib/worldCities';

export interface CityWeather extends WorldCity {
  time: string;
  temperature: number;
  weathercode: number;
  is_day: number;
}
