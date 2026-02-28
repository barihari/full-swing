interface Props {
  readiness: number;
}

export default function TournamentReadiness({ readiness }: Props) {
  const getColor = () => {
    if (readiness >= 75) return { ring: 'text-green-400', label: 'Ready' };
    if (readiness >= 50) return { ring: 'text-yellow-400', label: 'Getting There' };
    return { ring: 'text-red-400', label: 'Building' };
  };

  const { ring, label } = getColor();
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (readiness / 100) * circumference;

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700/60 p-4 flex items-center gap-4">
      <div className="relative w-24 h-24 shrink-0">
        <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" stroke="#1f2937" strokeWidth="6" fill="none" />
          <circle
            cx="50" cy="50" r="45"
            className={ring}
            stroke="currentColor"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 1s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-gray-100">{readiness}</span>
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-200">Tournament Readiness</p>
        <p className="text-xs text-gray-300 mt-0.5">{label}</p>
        <p className="text-xs text-gray-400 mt-1">
          Composite of contact, airborne, in-play, and confidence trends
        </p>
      </div>
    </div>
  );
}
