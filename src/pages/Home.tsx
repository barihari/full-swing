import { Link } from 'react-router-dom';
import { usePlan } from '../hooks/usePlan';
import { useSessionLog } from '../hooks/useSessionLog';
import { useMetrics } from '../hooks/useMetrics';
import { todayISO, formatDateLong, addDays, toISO } from '../lib/dates';
import { SESSION_TEMPLATES, SESSION_TYPE_BG } from '../data/sessions';
import SessionCard from '../components/SessionCard';

function readinessLabel(score: number): string {
  if (score >= 86) return 'Tournament Ready';
  if (score >= 71) return 'Almost Ready';
  if (score >= 51) return 'Getting There';
  if (score >= 26) return 'Building Up';
  return 'Just Starting';
}

export default function Home() {
  const { planDays, isLoading, initializePlan } = usePlan();
  const { getLogForDate } = useSessionLog();
  const { progress, readiness } = useMetrics();

  const today = todayISO();
  const todayPlan = planDays.find((d) => d.dateISO === today);
  const todayLog = getLogForDate(today);

  const nextSession = planDays
    .filter((d) => !d.isRestDay && d.dateISO > today)
    .sort((a, b) => a.dateISO.localeCompare(b.dateISO))[0];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (planDays.length === 0) {
    return (
      <div className="p-4 space-y-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-50 mb-2">Welcome to Full Swing</h2>
          <p className="text-gray-300 mb-6">Your 30-day driver improvement program starts here.</p>
          <button
            onClick={() => initializePlan()}
            className="bg-green-500/15 text-green-400 border border-green-500/30 px-6 py-3 rounded-xl font-semibold text-lg hover:bg-green-500/25 transition-colors"
          >
            Initialize Training Plan
          </button>
          <p className="text-xs text-gray-300 mt-3">Feb 28 – Apr 4, 2026 · Tournament ready</p>
        </div>
      </div>
    );
  }

  const hasSession = todayPlan && !todayPlan.isRestDay;
  const template = hasSession ? SESSION_TEMPLATES[todayPlan.sessionType] : null;
  const badgeClass = hasSession ? (SESSION_TYPE_BG[todayPlan.sessionType] ?? '') : '';

  return (
    <div className="p-4 space-y-4">
      <p className="text-sm text-gray-300">{formatDateLong(today)}</p>

      {hasSession && template ? (
        <div className="bg-gray-800 rounded-2xl border border-gray-700/60 p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${badgeClass}`}>
              Session {todayPlan.sessionType}
            </span>
            <span className="text-sm font-medium text-gray-200">{template.name}</span>
            {todayLog && <span className="text-green-400 ml-auto">✓ Done</span>}
          </div>

          <p className="text-sm text-gray-300 mb-1">{todayPlan.plannedDurationMin} minutes</p>
          <p className="text-xs text-gray-300 mb-4">
            {template.blocks.slice(1, 4).map((b) => b.name).join(' → ')}
          </p>

          <div className="flex gap-2">
            <Link
              to={`/session/${today}`}
              className="flex-1 bg-green-500/15 text-green-400 border border-green-500/25 text-center py-2.5 rounded-xl font-semibold hover:bg-green-500/25 transition-colors"
            >
              {todayLog ? 'Review Session' : 'Start Session'}
            </Link>
            {todayLog ? null : (
              <Link
                to={`/log/${today}`}
                className="bg-gray-700/60 text-gray-300 px-4 py-2.5 rounded-xl font-medium hover:bg-gray-700 transition-colors"
              >
                Quick Log
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-green-500/8 rounded-2xl border border-green-500/15 p-5">
          <p className="text-lg font-semibold text-green-400 mb-1">Rest Day</p>
          <p className="text-sm text-green-500/70">Recovery is part of the process. Trust the plan.</p>
          {nextSession && (
            <div className="mt-4">
              <p className="text-xs text-gray-300 mb-2">Next up:</p>
              <SessionCard
                dateISO={nextSession.dateISO}
                sessionType={nextSession.sessionType}
                durationMin={nextSession.plannedDurationMin}
                compact
              />
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-800 rounded-xl border border-gray-700/60 p-3">
          <p className="text-xs text-gray-300 mb-1">Progress</p>
          <p className="text-lg font-bold text-gray-100">{progress.completed}/{progress.total}</p>
          <div className="h-1 bg-gray-900 rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-green-400 rounded-full transition-all duration-500"
              style={{ width: `${progress.percent}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1.5">{progress.percent}%</p>
        </div>
        <div className="bg-gray-800 rounded-xl border border-gray-700/60 p-3">
          <p className="text-xs text-gray-300 mb-1">Tournament Readiness</p>
          <p className="text-lg font-bold text-gray-100">{readiness}</p>
          <div className="h-1 bg-gray-900 rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-yellow-500 rounded-full transition-all duration-500"
              style={{ width: `${readiness}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1.5">{readinessLabel(readiness)}</p>
        </div>
      </div>

      {nextSession && !hasSession && (
        <div>
          <h3 className="text-sm font-semibold text-gray-300 mb-2">Coming Up</h3>
          <SessionCard
            dateISO={nextSession.dateISO}
            sessionType={nextSession.sessionType}
            durationMin={nextSession.plannedDurationMin}
          />
        </div>
      )}
    </div>
  );
}
