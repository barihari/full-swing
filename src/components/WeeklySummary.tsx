import { solidContactRate, airborneRate } from '../lib/metrics';

interface LogEntry {
  dateISO: string;
  sessionType: string;
  solidContact?: number;
  airborne?: number;
  totalBalls?: number;
  solidContactOutOf30?: number;
  airborneOutOf30?: number;
  inPlayOutOf14?: number;
  mainMissType?: string;
  confidence0to10: number;
}

interface Props {
  allLogs: LogEntry[];
  commonMiss?: string;
  topMisses?: string[];
}

function avg(logs: LogEntry[], fn: (l: LogEntry) => number | null): number | null {
  const vals = logs.map(fn).filter((v): v is number => v != null);
  if (vals.length === 0) return null;
  return vals.reduce((a, b) => a + b, 0) / vals.length;
}

function StatCard({ label, value }: { label: string; value: number | null }) {
  if (value == null) return null;
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700/60 p-3">
      <p className="text-xs text-gray-300">{label}</p>
      <span className="text-xl font-bold text-gray-100 mt-1 block">{Math.round(value)}%</span>
    </div>
  );
}

export default function WeeklySummary({ allLogs, commonMiss, topMisses }: Props) {
  const misses = topMisses && topMisses.length > 0 ? topMisses : commonMiss ? [commonMiss] : [];

  return (
    <div className="grid grid-cols-2 gap-2">
      <StatCard label="Airborne" value={avg(allLogs, airborneRate)} />
      <StatCard label="Solid Contact" value={avg(allLogs, solidContactRate)} />
      <StatCard label="Confidence" value={avg(allLogs, (l) => l.confidence0to10 * 10)} />
      <div className="bg-gray-800 rounded-xl border border-gray-700/60 p-3">
        <p className="text-xs text-gray-300">Top Misses</p>
        <p className="text-xl font-bold text-gray-100 mt-1">
          {misses.length > 0 ? misses.join(', ') : '—'}
        </p>
      </div>
    </div>
  );
}
