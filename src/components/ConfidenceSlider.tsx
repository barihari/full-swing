interface Props {
  value: number;
  onChange: (value: number) => void;
}

const labels: Record<number, string> = {
  0: 'No confidence',
  1: 'Very low',
  2: 'Low',
  3: 'Below avg',
  4: 'Slightly low',
  5: 'Neutral',
  6: 'Slightly high',
  7: 'Above avg',
  8: 'High',
  9: 'Very high',
  10: 'Tournament ready',
};

export default function ConfidenceSlider({ value, onChange }: Props) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-gray-300">Confidence Level</p>
        <span className="text-sm font-bold text-green-400">{value}/10</span>
      </div>
      <input
        type="range"
        min={0}
        max={10}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-700/50 rounded-lg appearance-none cursor-pointer accent-green-500"
      />
      <div className="flex justify-between mt-1">
        <span className="text-xs text-gray-400">0</span>
        <span className="text-xs text-gray-300 font-medium">{labels[value]}</span>
        <span className="text-xs text-gray-400">10</span>
      </div>
    </div>
  );
}
