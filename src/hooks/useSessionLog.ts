import db from '../db';
import { sessionLogId } from '../lib/ids';
import { tx } from '@instantdb/react';

export interface SessionLogInput {
  dateISO: string;
  sessionType: string;
  durationMin: number;
  solidContact?: number;
  airborne?: number;
  totalBalls?: number;
  solidContactOutOf30?: number;
  airborneOutOf30?: number;
  inPlayOutOf14?: number;
  mainMissType?: string;
  confidence0to10: number;
  notes: string;
  brushPointDrill?: boolean;
  stepThroughDrill?: boolean;
  tempoLadder?: boolean;
}

export function useSessionLog() {
  const { isLoading, error, data } = db.useQuery({ sessionLogs: {} });

  const logs = data?.sessionLogs ?? [];

  const saveLog = (input: SessionLogInput) => {
    const completedAtISO = new Date().toISOString();
    const id = sessionLogId(input.dateISO, input.sessionType, completedAtISO);

    db.transact(
      tx.sessionLogs[id].update({
        ...input,
        completedAtISO,
      }),
    );
  };

  const getLogForDate = (dateISO: string) => {
    return logs.find((l) => l.dateISO === dateISO);
  };

  return { logs, isLoading, error, saveLog, getLogForDate };
}
