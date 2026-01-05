
export interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export interface StreamStatus {
  isOnline: boolean;
  activeUrl: string;
  isFallback: boolean;
}

export interface RadioConfig {
  streamUrl: string;
  fallbackPlaylist: string[];
  stationName: string;
  tagline: string;
}

export enum AppRoute {
  Home = '/',
  Prayer = '/priere',
  Admin = '/admin',
  Deploy = '/deployment'
}
