import db from '../db';
import { settingsId } from '../lib/ids';
import { tx } from '@instantdb/react';

const DEFAULT_SETTINGS = {
  preferredDaysOfWeek: JSON.stringify([6, 1, 3, 4]),
  durationPreference: 45,
  quickModeDefault: false,
};

export function useSettings() {
  const { isLoading, error, data } = db.useQuery({ settings: {} });

  const settingsRecord = data?.settings?.[0];

  const settings = {
    preferredDaysOfWeek: settingsRecord
      ? (JSON.parse(settingsRecord.preferredDaysOfWeek) as number[])
      : JSON.parse(DEFAULT_SETTINGS.preferredDaysOfWeek),
    durationPreference: settingsRecord?.durationPreference ?? DEFAULT_SETTINGS.durationPreference,
    quickModeDefault: settingsRecord?.quickModeDefault ?? DEFAULT_SETTINGS.quickModeDefault,
  };

  const updateSettings = (updates: {
    preferredDaysOfWeek?: number[];
    durationPreference?: number;
    quickModeDefault?: boolean;
  }) => {
    const payload: Record<string, unknown> = {};
    if (updates.preferredDaysOfWeek !== undefined) {
      payload.preferredDaysOfWeek = JSON.stringify(updates.preferredDaysOfWeek);
    }
    if (updates.durationPreference !== undefined) {
      payload.durationPreference = updates.durationPreference;
    }
    if (updates.quickModeDefault !== undefined) {
      payload.quickModeDefault = updates.quickModeDefault;
    }
    db.transact(tx.settings[settingsId()].update(payload));
  };

  const initializeSettings = () => {
    db.transact(tx.settings[settingsId()].update(DEFAULT_SETTINGS));
  };

  return { settings, isLoading, error, updateSettings, initializeSettings };
}
