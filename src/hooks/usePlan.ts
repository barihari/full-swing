import db from '../db';
import { planDayId } from '../lib/ids';
import { generatePlan, type PlanDayData } from '../data/plan';
import { tx } from '@instantdb/react';

export function usePlan() {
  const { isLoading, error, data } = db.useQuery({
    planDays: {},
    sessionLogs: {},
  });

  const planDays = data?.planDays ?? [];
  const sessionLogs = data?.sessionLogs ?? [];

  const initializePlan = (preferredDays?: number[], durationPref?: number) => {
    const plan = generatePlan(preferredDays, durationPref);
    const txns = plan.map((day) =>
      tx.planDays[planDayId(day.dateISO)].update({
        dateISO: day.dateISO,
        sessionType: day.sessionType,
        plannedDurationMin: day.plannedDurationMin,
        isRestDay: day.isRestDay,
      }),
    );
    db.transact(txns);
  };

  const fullReset = (preferredDays?: number[], durationPref?: number) => {
    const deletePlanDays = planDays.map((d) =>
      tx.planDays[planDayId(d.dateISO)].delete(),
    );
    const deleteSessionLogs = sessionLogs.map((log: { id: string }) =>
      tx.sessionLogs[log.id].delete(),
    );

    const plan = generatePlan(preferredDays, durationPref);
    const createPlanDays = plan.map((day) =>
      tx.planDays[planDayId(day.dateISO)].update({
        dateISO: day.dateISO,
        sessionType: day.sessionType,
        plannedDurationMin: day.plannedDurationMin,
        isRestDay: day.isRestDay,
      }),
    );

    db.transact([...deletePlanDays, ...deleteSessionLogs, ...createPlanDays]);
  };

  const updatePlanDay = (dateISO: string, updates: Partial<PlanDayData>) => {
    db.transact(tx.planDays[planDayId(dateISO)].update(updates));
  };

  const reschedule = (fromDateISO: string, toDateISO: string) => {
    const fromDay = planDays.find((d) => d.dateISO === fromDateISO);
    if (!fromDay) return;

    db.transact([
      tx.planDays[planDayId(fromDateISO)].update({
        sessionType: '',
        plannedDurationMin: 0,
        isRestDay: true,
      }),
      tx.planDays[planDayId(toDateISO)].update({
        sessionType: fromDay.sessionType,
        plannedDurationMin: fromDay.plannedDurationMin,
        isRestDay: false,
        rescheduledFromDateISO: fromDateISO,
      }),
    ]);
  };

  return { planDays, isLoading, error, initializePlan, fullReset, updatePlanDay, reschedule };
}
