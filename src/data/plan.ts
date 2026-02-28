import { toISO, addDays, fromISO } from '../lib/dates';

export interface PlanDayData {
  dateISO: string;
  sessionType: string;
  plannedDurationMin: number;
  isRestDay: boolean;
}

const SESSION_ORDER = ['A', 'B', 'C', 'D'];
const SESSION_DURATIONS: Record<string, number> = { A: 45, B: 45, C: 45, D: 45 };

export const PLAN_START = '2026-02-28';
export const PLAN_END = '2026-03-29';
export const TAPER_START = '2026-03-30';
export const TAPER_END = '2026-04-03';
export const TOURNAMENT_DAY = '2026-04-04';

export function generatePlan(
  preferredDays: number[] = [6, 1, 3, 4],
  durationPref: number = 45,
): PlanDayData[] {
  const days: PlanDayData[] = [];
  const start = fromISO(PLAN_START);
  const end = fromISO(TOURNAMENT_DAY);

  let sessionIndex = 0;
  let current = new Date(start);

  while (current <= end) {
    const iso = toISO(current);
    const dow = current.getDay();

    if (iso === TOURNAMENT_DAY) {
      days.push({ dateISO: iso, sessionType: 'Tournament', plannedDurationMin: 0, isRestDay: true });
    } else if (iso >= TAPER_START && iso <= TAPER_END) {
      // Taper week: lighter schedule
      const taperDays = [1, 3]; // Mon, Wed only
      if (taperDays.includes(dow)) {
        const taperType = sessionIndex % 2 === 0 ? 'A' : 'C';
        days.push({
          dateISO: iso,
          sessionType: taperType,
          plannedDurationMin: Math.round(durationPref * 0.6),
          isRestDay: false,
        });
        sessionIndex++;
      } else {
        days.push({ dateISO: iso, sessionType: '', plannedDurationMin: 0, isRestDay: true });
      }
    } else if (iso >= PLAN_START && iso <= PLAN_END) {
      if (preferredDays.includes(dow)) {
        const type = SESSION_ORDER[sessionIndex % SESSION_ORDER.length];
        days.push({
          dateISO: iso,
          sessionType: type,
          plannedDurationMin: durationPref,
          isRestDay: false,
        });
        sessionIndex++;
      } else {
        days.push({ dateISO: iso, sessionType: '', plannedDurationMin: 0, isRestDay: true });
      }
    }

    current = addDays(current, 1);
  }

  return days;
}
