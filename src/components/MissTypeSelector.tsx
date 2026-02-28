import { MISS_TYPES, type MissType } from '../data/sessions';

interface Props {
  value?: string;
  onChange: (value: MissType) => void;
}

export default function MissTypeSelector({ value, onChange }: Props) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-300 mb-2">Main Miss Type</p>
      <div className="flex flex-wrap gap-2">
        {MISS_TYPES.map((miss) => (
          <button
            key={miss}
            onClick={() => onChange(miss)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              value === miss
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700'
            }`}
          >
            {miss}
          </button>
        ))}
      </div>
    </div>
  );
}
