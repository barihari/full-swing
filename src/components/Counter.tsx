interface Props {
  label: string;
  value: number;
  min?: number;
  max: number;
  onChange: (value: number) => void;
}

export default function Counter({ label, value, min = 0, max, onChange }: Props) {
  return (
    <div className="flex items-center justify-between bg-gray-800 rounded-xl p-3 border border-gray-700/60">
      <div>
        <p className="text-sm font-medium text-gray-200">{label}</p>
        <p className="text-xs text-gray-300">out of {max}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-10 h-10 rounded-full bg-gray-900 border border-gray-700 text-gray-300 font-bold text-lg flex items-center justify-center disabled:opacity-30 active:bg-gray-700 transition-colors"
        >
          −
        </button>
        <span className="text-2xl font-bold text-gray-100 w-10 text-center tabular-nums">{value}</span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="w-10 h-10 rounded-full bg-gray-900 border border-gray-700 text-gray-300 font-bold text-lg flex items-center justify-center disabled:opacity-30 active:bg-gray-700 transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}
