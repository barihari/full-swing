import { useState } from 'react';
import { useSettings } from '../hooks/useSettings';
import { usePlan } from '../hooks/usePlan';

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Settings() {
  const { settings, updateSettings, initializeSettings } = useSettings();
  const { initializePlan, fullReset, planDays } = usePlan();
  const [editing, setEditing] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const toggleDay = (day: number) => {
    if (!editing) return;
    const current = settings.preferredDaysOfWeek;
    const updated = current.includes(day)
      ? current.filter((d: number) => d !== day)
      : [...current, day].sort();
    updateSettings({ preferredDaysOfWeek: updated });
  };

  const handleResetPlan = () => {
    initializeSettings();
    fullReset(settings.preferredDaysOfWeek, settings.durationPreference);
    setConfirmReset(false);
    setEditing(false);
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-100">Settings</h2>
        <button
          onClick={() => setEditing(!editing)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            editing
              ? 'bg-amber-500/15 text-amber-400 border border-amber-500/25'
              : 'bg-gray-800 text-gray-300 border border-gray-700'
          }`}
        >
          {editing ? 'Done' : 'Edit'}
        </button>
      </div>

      <div className={!editing ? 'opacity-50 pointer-events-none' : ''}>
        <h3 className="text-sm font-semibold text-gray-300 mb-2">Practice Days</h3>
        <div className="flex gap-2">
          {DAY_NAMES.map((name, i) => (
            <button
              key={i}
              onClick={() => toggleDay(i)}
              disabled={!editing}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                settings.preferredDaysOfWeek.includes(i)
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-gray-800 text-gray-300 border border-gray-700'
              } ${editing ? 'hover:bg-gray-700' : ''}`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <div className={!editing ? 'opacity-50 pointer-events-none' : ''}>
        <h3 className="text-sm font-semibold text-gray-300 mb-2">Session Duration</h3>
        <div className="flex gap-3">
          {[30, 45].map((mins) => (
            <button
              key={mins}
              onClick={() => editing && updateSettings({ durationPreference: mins })}
              disabled={!editing}
              className={`flex-1 py-3 rounded-xl text-sm font-medium transition-colors ${
                settings.durationPreference === mins
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                  : 'bg-gray-800 text-gray-300 border border-gray-700'
              } ${editing ? 'hover:bg-gray-700' : ''}`}
            >
              {mins} min
            </button>
          ))}
        </div>
      </div>

      <div className={`flex items-center justify-between bg-gray-800 rounded-xl p-4 border border-gray-700/60 ${!editing ? 'opacity-50' : ''}`}>
        <div>
          <p className="text-sm font-medium text-gray-200">Quick Mode Default</p>
          <p className="text-xs text-gray-300">Start sessions in quick mode (shorter durations)</p>
        </div>
        <button
          onClick={() => editing && updateSettings({ quickModeDefault: !settings.quickModeDefault })}
          disabled={!editing}
          className={`relative w-12 h-7 rounded-full transition-colors ${
            settings.quickModeDefault ? 'bg-green-500/40' : 'bg-gray-700'
          }`}
        >
          <span
            className={`absolute top-0.5 w-6 h-6 rounded-full bg-gray-200 shadow transition-transform ${
              settings.quickModeDefault ? 'translate-x-5' : 'translate-x-0.5'
            }`}
          />
        </button>
      </div>

      <div className={`border-t border-gray-800 pt-4 ${!editing ? 'opacity-50' : ''}`}>
        <h3 className="text-sm font-semibold text-gray-300 mb-2">Plan Management</h3>
        <p className="text-xs text-gray-300 mb-3">
          {planDays.length > 0
            ? `Plan active: ${planDays.filter((d) => !d.isRestDay).length} sessions scheduled`
            : 'No plan initialized yet'}
        </p>
        <button
          onClick={() => editing && setConfirmReset(true)}
          disabled={!editing}
          className={`w-full py-2.5 rounded-xl text-sm font-medium bg-gray-800 text-gray-300 border border-gray-700 transition-colors ${editing ? 'hover:bg-gray-700' : ''}`}
        >
          {planDays.length > 0 ? 'Reset & Regenerate Plan' : 'Initialize Plan'}
        </button>
      </div>

      <div className="bg-green-500/8 rounded-xl p-4 border border-green-500/15">
        <p className="text-xs text-green-400 font-medium">Full Swing v1.0</p>
        <p className="text-xs text-green-500/70 mt-1">
          30-day driver improvement program · Feb 28 – Apr 4, 2026
        </p>
        <p className="text-xs text-green-500/70 mt-0.5">
          Data syncs automatically · Works offline
        </p>
      </div>

      {confirmReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-sm w-full space-y-4">
            <h3 className="text-base font-bold text-gray-100">Reset Plan?</h3>
            <p className="text-sm text-gray-300">
              This will delete all session logs and regenerate your entire training plan from scratch. This cannot be undone.
            </p>
            <div className="flex gap-3 pt-1">
              <button
                onClick={() => setConfirmReset(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleResetPlan}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-red-500/15 text-red-400 border border-red-500/25 hover:bg-red-500/25 transition-colors"
              >
                Reset Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
