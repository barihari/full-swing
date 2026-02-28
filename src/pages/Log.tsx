import { useState } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { usePlan } from '../hooks/usePlan';
import { useSessionLog, type SessionLogInput } from '../hooks/useSessionLog';
import { SESSION_TEMPLATES, SESSION_TYPE_BG } from '../data/sessions';
import { formatDateLong } from '../lib/dates';
import MissTypeSelector from '../components/MissTypeSelector';
import ConfidenceSlider from '../components/ConfidenceSlider';
import type { MissType } from '../data/sessions';

interface SessionNavState {
  solidContact?: number;
  airborne?: number;
  totalBalls?: number;
}

export default function Log() {
  const { dateISO } = useParams<{ dateISO: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { planDays } = usePlan();
  const { saveLog, getLogForDate } = useSessionLog();

  const navState = (location.state ?? {}) as SessionNavState;
  const planDay = planDays.find((d) => d.dateISO === dateISO);
  const template = planDay ? SESSION_TEMPLATES[planDay.sessionType] : null;
  const existingLog = dateISO ? getLogForDate(dateISO) : undefined;

  const sessionTotalBalls = template
    ? template.blocks.reduce((sum, b) => sum + (b.ballCount ?? 0), 0)
    : 30;
  const maxBalls = navState.totalBalls ?? existingLog?.totalBalls ?? sessionTotalBalls;

  const [solidContact, setSolidContact] = useState(
    navState.solidContact ?? existingLog?.solidContact ?? existingLog?.solidContactOutOf30 ?? 0,
  );
  const [airborne, setAirborne] = useState(
    navState.airborne ?? existingLog?.airborne ?? existingLog?.airborneOutOf30 ?? 0,
  );
  const [inPlay, setInPlay] = useState(existingLog?.inPlayOutOf14 ?? 10);
  const [missType, setMissType] = useState<MissType | undefined>(existingLog?.mainMissType as MissType | undefined);
  const [confidence, setConfidence] = useState(existingLog?.confidence0to10 ?? 5);
  const [notes, setNotes] = useState(existingLog?.notes ?? '');

  if (!planDay || !template || !dateISO) {
    return (
      <div className="p-4 text-center py-12">
        <p className="text-gray-300">Session not found.</p>
        <Link to="/" className="text-green-400 text-sm mt-2 inline-block">← Back home</Link>
      </div>
    );
  }

  const isSimSession = ['C', 'D'].includes(planDay.sessionType);
  const badgeClass = SESSION_TYPE_BG[planDay.sessionType] ?? '';

  const handleSave = () => {
    const input: SessionLogInput = {
      dateISO,
      sessionType: planDay.sessionType,
      durationMin: planDay.plannedDurationMin,
      solidContact,
      airborne,
      totalBalls: maxBalls,
      inPlayOutOf14: isSimSession ? inPlay : undefined,
      mainMissType: missType,
      confidence0to10: confidence,
      notes,
    };
    saveLog(input);
    navigate('/');
  };

  return (
    <div className="p-4 space-y-5">
      <div>
        <Link to={`/session/${dateISO}`} className="text-sm text-green-400">← Back to session</Link>
        <p className="text-xs text-gray-300 mt-2">{formatDateLong(dateISO)}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeClass}`}>
            {planDay.sessionType}
          </span>
          <h2 className="text-lg font-bold text-gray-100">{template.name} — Log</h2>
        </div>
      </div>

      {existingLog && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3">
          <p className="text-sm text-green-400">This session has already been logged. Saving will create a new entry.</p>
        </div>
      )}

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-gray-300">Session Results</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-gray-800 rounded-xl border border-gray-700/60 p-3 text-center">
            <p className="text-2xl font-bold text-blue-400 tabular-nums">{airborne}<span className="text-sm text-gray-300">/{maxBalls}</span></p>
            <p className="text-xs text-gray-300 mt-0.5">Airborne</p>
          </div>
          <div className="bg-gray-800 rounded-xl border border-gray-700/60 p-3 text-center">
            <p className="text-2xl font-bold text-green-400 tabular-nums">{solidContact}<span className="text-sm text-gray-300">/{maxBalls}</span></p>
            <p className="text-xs text-gray-300 mt-0.5">Solid Contact</p>
          </div>
          {isSimSession && (
            <div className="bg-gray-800 rounded-xl border border-gray-700/60 p-3 text-center col-span-2">
              <p className="text-2xl font-bold text-amber-400 tabular-nums">{inPlay}<span className="text-sm text-gray-300">/14</span></p>
              <p className="text-xs text-gray-300 mt-0.5">Fairways In-Play</p>
            </div>
          )}
        </div>
      </div>

      <MissTypeSelector value={missType} onChange={setMissType} />
      <ConfidenceSlider value={confidence} onChange={setConfidence} />

      <div>
        <label className="text-sm font-semibold text-gray-300">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="How did it feel? Any breakthroughs or struggles?"
          rows={3}
          className="mt-1 w-full rounded-xl border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-green-500/40 focus:border-green-500/30 resize-none"
        />
      </div>

      <button
        onClick={handleSave}
        className="w-full bg-green-500/15 text-green-400 border border-green-500/25 py-3 rounded-xl font-semibold text-lg hover:bg-green-500/25 transition-colors"
      >
        Save Session Log
      </button>
    </div>
  );
}
