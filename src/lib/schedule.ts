import { toISO, addDays, fromISO } from './dates';
import type { PlanDayData } from '../data/plan';

export function findPrevAvailableDay(
  planDays: PlanDayData[],
  fromDateISO: string,
): string | null {
  const from = fromISO(fromDateISO);
  for (let i = 1; i <= 30; i++) {
    const candidate = toISO(addDays(from, -i));
    const day = planDays.find((d) => d.dateISO === candidate);
    if (day && day.isRestDay) {
      return candidate;
    }
  }
  return null;
}

export function findNextAvailableDay(
  planDays: PlanDayData[],
  fromDateISO: string,
): string | null {
  const from = fromISO(fromDateISO);
  for (let i = 1; i <= 30; i++) {
    const candidate = toISO(addDays(from, i));
    const day = planDays.find((d) => d.dateISO === candidate);
    if (day && day.isRestDay) {
      return candidate;
    }
  }
  return null;
}

export function rescheduleSession(
  planDays: PlanDayData[],
  fromDateISO: string,
  toDateISO: string,
): PlanDayData[] {
  return planDays.map((day) => {
    if (day.dateISO === fromDateISO) {
      return { ...day, sessionType: '', plannedDurationMin: 0, isRestDay: true };
    }
    if (day.dateISO === toDateISO) {
      const original = planDays.find((d) => d.dateISO === fromDateISO)!;
      return {
        ...day,
        sessionType: original.sessionType,
        plannedDurationMin: original.plannedDurationMin,
        isRestDay: false,
        rescheduledFromDateISO: fromDateISO,
      };
    }
    return day;
  }) as PlanDayData[];
}
