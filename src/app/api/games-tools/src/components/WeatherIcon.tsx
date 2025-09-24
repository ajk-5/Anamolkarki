import type { HTMLAttributes } from 'react';

interface WeatherIconProps extends HTMLAttributes<HTMLSpanElement> {
  code: number;
  isDay?: boolean;
}

type IconDefinition = {
  codes: number[];
  day: string;
  night?: string;
  label: string;
};

const WEATHER_ICONS: IconDefinition[] = [
  { codes: [0], day: '☀️', night: '🌕', label: 'Clear sky' },
  {
    codes: [1, 2],
    day: '🌤️',
    night: '🌥️',
    label: 'Mostly clear',
  },
  { codes: [3], day: '☁️', label: 'Overcast' },
  { codes: [45, 48], day: '🌫️', label: 'Fog' },
  {
    codes: [51, 53, 55, 56, 57],
    day: '🌦️',
    label: 'Drizzle',
  },
  {
    codes: [61, 63, 65, 80, 81, 82],
    day: '🌧️',
    label: 'Rain',
  },
  {
    codes: [66, 67],
    day: '🌧️',
    label: 'Freezing rain',
  },
  {
    codes: [71, 73, 75, 77, 85, 86],
    day: '🌨️',
    label: 'Snow',
  },
  {
    codes: [95],
    day: '⛈️',
    label: 'Thunderstorm',
  },
  {
    codes: [96, 99],
    day: '🌩️',
    label: 'Thunderstorm with hail',
  },
];

const DEFAULT_ICON = { symbol: '❓', label: 'Unknown weather' };

function resolveIcon(code: number, isDay?: boolean) {
  const match = WEATHER_ICONS.find((entry) => entry.codes.includes(code));
  if (!match) {
    return DEFAULT_ICON;
  }

  const symbol = isDay || match.night === undefined ? match.day : match.night;
  return {
    symbol,
    label: match.label,
  };
}

export default function WeatherIcon({
  code,
  isDay,
  className,
  ...rest
}: WeatherIconProps) {
  const { symbol, label } = resolveIcon(code, isDay);
  return (
    <span role="img" aria-label={label} className={className} {...rest}>
      {symbol}
    </span>
  );
}
