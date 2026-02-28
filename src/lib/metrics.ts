interface LogEntry {
  dateISO: string;
  sessionType: string;
  solidContact?: number;
  airborne?: number;
  totalBalls?: number;
  solidContactOutOf30?: number;
  airborneOutOf30?: number;
  inPlayOutOf14?: number;
  mainMissType?: string;
  confidence0to10: number;
}

export function solidContactRate(log: LogEntry): number | null {
  if (log.solidContact != null && log.totalBalls != null && log.totalBalls > 0) {
    return (log.solidContact / log.totalBalls) * 100;
  }
  if (log.solidContactOutOf30 != null) return (log.solidContactOutOf30 / 30) * 100;
  return null;
}

export function airborneRate(log: LogEntry): number | null {
  if (log.airborne != null && log.totalBalls != null && log.totalBalls > 0) {
    return (log.airborne / log.totalBalls) * 100;
  }
  if (log.airborneOutOf30 != null) return (log.airborneOutOf30 / 30) * 100;
  return null;
}

export function inPlayRate(log: LogEntry): number | null {
  if (log.inPlayOutOf14 == null) return null;
  return (log.inPlayOutOf14 / 14) * 100;
}

export function movingAverage(values: (number | null)[], window: number = 7): (number | null)[] {
  return values.map((_, i) => {
    const slice = values.slice(Math.max(0, i - window + 1), i + 1).filter((v): v is number => v != null);
    if (slice.length === 0) return null;
    return slice.reduce((a, b) => a + b, 0) / slice.length;
  });
}

export function completionProgress(
  planDays: { dateISO: string; isRestDay: boolean }[],
  logs: { dateISO: string }[],
): { completed: number; total: number; percent: number } {
  const logDates = new Set(logs.map((l) => l.dateISO));
  const scheduledDays = planDays.filter((d) => !d.isRestDay);
  const total = scheduledDays.length;
  const completed = scheduledDays.filter((d) => logDates.has(d.dateISO)).length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  return { completed, total, percent };
}

export function mostCommonMiss(logs: LogEntry[]): string {
  return topMisses(logs, 1)[0] ?? 'None';
}

export function topMisses(logs: LogEntry[], limit: number = 3): string[] {
  const counts: Record<string, number> = {};
  for (const log of logs) {
    if (log.mainMissType && log.mainMissType !== 'None/Varied') {
      counts[log.mainMissType] = (counts[log.mainMissType] || 0) + 1;
    }
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([miss]) => miss);
}

export function kaizenWins(
  currentWeekLogs: LogEntry[],
  priorWeekLogs: LogEntry[],
): string[] {
  const wins: string[] = [];

  const avg = (logs: LogEntry[], fn: (l: LogEntry) => number | null): number | null => {
    const vals = logs.map(fn).filter((v): v is number => v != null);
    if (vals.length === 0) return null;
    return vals.reduce((a, b) => a + b, 0) / vals.length;
  };

  const check = (name: string, fn: (l: LogEntry) => number | null) => {
    const curr = avg(currentWeekLogs, fn);
    const prev = avg(priorWeekLogs, fn);
    if (curr != null && prev != null && prev > 0) {
      const improvement = ((curr - prev) / prev) * 100;
      if (improvement >= 10) {
        wins.push(`${name} improved ${Math.round(improvement)}%`);
      }
    }
  };

  check('Solid Contact', solidContactRate);
  check('Airborne Rate', airborneRate);
  check('In-Play Rate', inPlayRate);
  check('Confidence', (l) => l.confidence0to10 * 10);

  return wins;
}

export function tournamentReadiness(logs: LogEntry[]): number {
  if (logs.length === 0) return 0;

  const recent = logs.slice(-7);
  const avgContact = recent.reduce((sum, l) => sum + (solidContactRate(l) ?? 0), 0) / recent.length;
  const avgAirborne = recent.reduce((sum, l) => sum + (airborneRate(l) ?? 0), 0) / recent.length;
  const avgConfidence = recent.reduce((sum, l) => sum + l.confidence0to10 * 10, 0) / recent.length;

  const inPlayLogs = recent.filter((l) => l.inPlayOutOf14 != null);
  const avgInPlay = inPlayLogs.length > 0
    ? inPlayLogs.reduce((sum, l) => sum + (inPlayRate(l) ?? 0), 0) / inPlayLogs.length
    : 50;

  // Weighted composite
  return Math.min(100, Math.round(
    avgContact * 0.3 +
    avgAirborne * 0.2 +
    avgInPlay * 0.3 +
    avgConfidence * 0.2
  ));
}
