export interface WorldCity {
  name: string;
  country: string;
  timezone: string;
  lat: number;
  lon: number;
}

export const WORLD_CITIES: WorldCity[] = [
  { name: 'New York', country: 'United States', timezone: 'America/New_York', lat: 40.7128, lon: -74.006 },
  { name: 'Los Angeles', country: 'United States', timezone: 'America/Los_Angeles', lat: 34.0522, lon: -118.2437 },
  { name: 'Chicago', country: 'United States', timezone: 'America/Chicago', lat: 41.8781, lon: -87.6298 },
  { name: 'Toronto', country: 'Canada', timezone: 'America/Toronto', lat: 43.6532, lon: -79.3832 },
  { name: 'Mexico City', country: 'Mexico', timezone: 'America/Mexico_City', lat: 19.4326, lon: -99.1332 },
  { name: 'London', country: 'United Kingdom', timezone: 'Europe/London', lat: 51.5074, lon: -0.1278 },
  { name: 'Paris', country: 'France', timezone: 'Europe/Paris', lat: 48.8566, lon: 2.3522 },
  { name: 'Berlin', country: 'Germany', timezone: 'Europe/Berlin', lat: 52.52, lon: 13.405 },
  { name: 'Madrid', country: 'Spain', timezone: 'Europe/Madrid', lat: 40.4168, lon: -3.7038 },
  { name: 'Rome', country: 'Italy', timezone: 'Europe/Rome', lat: 41.9028, lon: 12.4964 },
  { name: 'Stockholm', country: 'Sweden', timezone: 'Europe/Stockholm', lat: 59.3293, lon: 18.0686 },
  { name: 'Moscow', country: 'Russia', timezone: 'Europe/Moscow', lat: 55.7558, lon: 37.6173 },
  { name: 'Dubai', country: 'United Arab Emirates', timezone: 'Asia/Dubai', lat: 25.2048, lon: 55.2708 },
  { name: 'Mumbai', country: 'India', timezone: 'Asia/Kolkata', lat: 19.076, lon: 72.8777 },
  { name: 'Singapore', country: 'Singapore', timezone: 'Asia/Singapore', lat: 1.3521, lon: 103.8198 },
  { name: 'Tokyo', country: 'Japan', timezone: 'Asia/Tokyo', lat: 35.6895, lon: 139.6917 },
  { name: 'Seoul', country: 'South Korea', timezone: 'Asia/Seoul', lat: 37.5665, lon: 126.978 },
  { name: 'Beijing', country: 'China', timezone: 'Asia/Shanghai', lat: 39.9042, lon: 116.4074 },
  { name: 'Sydney', country: 'Australia', timezone: 'Australia/Sydney', lat: -33.8688, lon: 151.2093 },
  { name: 'Melbourne', country: 'Australia', timezone: 'Australia/Melbourne', lat: -37.8136, lon: 144.9631 },
  { name: 'Auckland', country: 'New Zealand', timezone: 'Pacific/Auckland', lat: -36.8485, lon: 174.7633 },
  { name: 'São Paulo', country: 'Brazil', timezone: 'America/Sao_Paulo', lat: -23.5558, lon: -46.6396 },
  { name: 'Buenos Aires', country: 'Argentina', timezone: 'America/Argentina/Buenos_Aires', lat: -34.6037, lon: -58.3816 },
  { name: 'Cape Town', country: 'South Africa', timezone: 'Africa/Johannesburg', lat: -33.9249, lon: 18.4241 },
  { name: 'Nairobi', country: 'Kenya', timezone: 'Africa/Nairobi', lat: -1.2921, lon: 36.8219 },
  { name: 'Cairo', country: 'Egypt', timezone: 'Africa/Cairo', lat: 30.0444, lon: 31.2357 },
  { name: 'Istanbul', country: 'Turkey', timezone: 'Europe/Istanbul', lat: 41.0082, lon: 28.9784 },
  { name: 'Bangkok', country: 'Thailand', timezone: 'Asia/Bangkok', lat: 13.7563, lon: 100.5018 },
  { name: 'Jakarta', country: 'Indonesia', timezone: 'Asia/Jakarta', lat: -6.2088, lon: 106.8456 },
  { name: 'Manila', country: 'Philippines', timezone: 'Asia/Manila', lat: 14.5995, lon: 120.9842 },
  { name: 'Honolulu', country: 'United States', timezone: 'Pacific/Honolulu', lat: 21.3069, lon: -157.8583 },
  { name: 'Anchorage', country: 'United States', timezone: 'America/Anchorage', lat: 61.2181, lon: -149.9003 }
];
