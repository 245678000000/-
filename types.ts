export interface UserSettings {
  userName: string;
  partnerName: string;
  emergencyEmail: string;
  isConfigured: boolean;
}

export interface CheckInLog {
  date: string; // ISO Date string YYYY-MM-DD
  timestamp: number;
}

export interface AppState {
  lastCheckIn: number | null; // Timestamp
  streak: number;
  logs: CheckInLog[];
}

export enum AppStatus {
  SAFE = 'SAFE',
  WARNING = 'WARNING', // 20+ hours
  DANGER = 'DANGER', // 24+ hours (Triggered)
}
