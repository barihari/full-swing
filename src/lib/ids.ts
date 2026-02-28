import { v5 as uuidv5 } from 'uuid';

const NAMESPACE = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';

export function planDayId(dateISO: string): string {
  return uuidv5(`planDay-${dateISO}`, NAMESPACE);
}

export function sessionLogId(dateISO: string, sessionType: string, completedAtISO: string): string {
  return uuidv5(`sessionLog-${dateISO}-${sessionType}-${completedAtISO}`, NAMESPACE);
}

export function settingsId(): string {
  return uuidv5('settings-singleton', NAMESPACE);
}
