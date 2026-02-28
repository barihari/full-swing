import { useMemo } from 'react';
import { useSessionLog } from './useSessionLog';
import { usePlan } from './usePlan';
import {
  solidContactRate,
  airborneRate,
  inPlayRate,
  completionProgress,
  mostCommonMiss,
  topMisses,
  kaizenWins,
  tournamentReadiness,
} from '../lib/metrics';
import { toISO, addDays } from '../lib/dates';

export function useMetrics() {
  const { logs } = useSessionLog();
  const { planDays } = usePlan();

  return useMemo(() => {
    const sortedLogs = [...logs].sort((a, b) => a.dateISO.localeCompare(b.dateISO));

    const today = new Date();
    const weekAgo = toISO(addDays(today, -7));
    const twoWeeksAgo = toISO(addDays(today, -14));
    const todayISO = toISO(today);

    const thisWeekLogs = sortedLogs.filter((l) => l.dateISO > weekAgo && l.dateISO <= todayISO);
    const lastWeekLogs = sortedLogs.filter((l) => l.dateISO > twoWeeksAgo && l.dateISO <= weekAgo);

    const contactRates = sortedLogs.map((l) => solidContactRate(l));
    const airborneRates = sortedLogs.map((l) => airborneRate(l));
    const inPlayRates = sortedLogs.map((l) => inPlayRate(l));
    const confidenceValues = sortedLogs.map((l) => l.confidence0to10 * 10);

    const latestContact = contactRates.filter((v): v is number => v != null).pop() ?? null;
    const latestAirborne = airborneRates.filter((v): v is number => v != null).pop() ?? null;

    return {
      sortedLogs,
      thisWeekLogs,
      lastWeekLogs,
      contactRates,
      airborneRates,
      inPlayRates,
      confidenceValues,
      latestContact,
      latestAirborne,
      progress: completionProgress(planDays, logs),
      commonMiss: mostCommonMiss(sortedLogs),
      topMisses: topMisses(sortedLogs, 3),
      kaizen: kaizenWins(thisWeekLogs, lastWeekLogs),
      readiness: tournamentReadiness(sortedLogs),
    };
  }, [logs, planDays]);
}
