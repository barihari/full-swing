import { Link } from 'react-router-dom';
import { SESSION_TEMPLATES, SESSION_TYPE_BG } from '../data/sessions';

interface Props {
  dateISO: string;
  sessionType: string;
  durationMin: number;
  isCompleted?: boolean;
  compact?: boolean;
}

export default function SessionCard({ dateISO, sessionType, durationMin, isCompleted, compact }: Props) {
  const template = SESSION_TEMPLATES[sessionType];
  const badgeClass = SESSION_TYPE_BG[sessionType] ?? 'bg-gray-700 text-gray-300';

  if (!template) {
    if (sessionType === 'Tournament') {
      return (
        <div className="bg-gray-800 rounded-xl border border-green-700 p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-900/50 text-green-300">
              🏆 Tournament
            </span>
          </div>
          <p className="text-sm text-gray-300 mt-2">Game day! Trust your preparation.</p>
        </div>
      );
    }
    return null;
  }

  const drillNames = template.blocks.slice(1, 3).map((b) => b.name);

  return (
    <Link
      to={`/session/${dateISO}`}
      className="block bg-gray-800 rounded-xl border border-gray-700 p-4 shadow-sm hover:border-gray-600 transition-colors"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeClass}`}>
            {sessionType}
          </span>
          <span className="text-sm font-medium text-gray-100">{template.name}</span>
        </div>
        <div className="flex items-center gap-2">
          {isCompleted && (
            <span className="text-green-400 text-sm">✓</span>
          )}
          <span className="text-xs text-gray-300">{durationMin} min</span>
        </div>
      </div>
      {!compact && (
        <p className="text-xs text-gray-300 mt-2">
          {drillNames.join(' → ')}
        </p>
      )}
    </Link>
  );
}
