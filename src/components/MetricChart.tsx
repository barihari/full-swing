import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DataPoint {
  label: string;
  value: number | null;
}

interface Props {
  title: string;
  data: DataPoint[];
  color?: string;
  yDomain?: [number, number];
}

export default function MetricChart({ title, data, color = '#4ade80', yDomain = [0, 100] }: Props) {
  const filtered = data.filter((d) => d.value != null);

  if (filtered.length === 0) {
    return (
      <div className="bg-gray-800 rounded-xl border border-gray-700/60 p-4">
        <h3 className="text-sm font-semibold text-gray-300 mb-2">{title}</h3>
        <p className="text-xs text-gray-400 text-center py-8">No data yet. Complete sessions to see trends.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700/60 p-4">
      <h3 className="text-sm font-semibold text-gray-300 mb-3">{title}</h3>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={filtered} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
          <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#9ca3af' }} />
          <YAxis domain={yDomain} width={40} tick={{ fontSize: 10, fill: '#9ca3af' }} />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8, backgroundColor: '#111827', border: '1px solid #374151', color: '#e5e7eb' }}
            formatter={(val: number | undefined) => [`${Math.round(val ?? 0)}%`, title]}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={{ r: 3, fill: color }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
