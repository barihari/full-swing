import { i } from '@instantdb/react';

const _schema = i.schema({
  entities: {
    planDays: i.entity({
      dateISO: i.string().indexed(),
      sessionType: i.string(),
      plannedDurationMin: i.number(),
      isRestDay: i.boolean(),
      rescheduledFromDateISO: i.string().optional(),
    }),
    sessionLogs: i.entity({
      dateISO: i.string().indexed(),
      sessionType: i.string(),
      durationMin: i.number(),
      solidContact: i.number().optional(),
      airborne: i.number().optional(),
      totalBalls: i.number().optional(),
      // Legacy fields kept for backward compat with existing data
      solidContactOutOf30: i.number().optional(),
      airborneOutOf30: i.number().optional(),
      inPlayOutOf14: i.number().optional(),
      mainMissType: i.string().optional(),
      confidence0to10: i.number(),
      notes: i.string(),
      completedAtISO: i.string(),
      brushPointDrill: i.boolean().optional(),
      stepThroughDrill: i.boolean().optional(),
      tempoLadder: i.boolean().optional(),
    }),
    settings: i.entity({
      preferredDaysOfWeek: i.string(),
      durationPreference: i.number(),
      quickModeDefault: i.boolean(),
    }),
  },
});

type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
