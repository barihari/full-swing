import { useMetrics } from '../hooks/useMetrics';
import { formatDate } from '../lib/dates';
import MetricChart from '../components/MetricChart';
import WeeklySummary from '../components/WeeklySummary';
import TournamentReadiness from '../components/TournamentReadiness';

export default function Dashboard() {
  const {
    sortedLogs,
    contactRates,
    airborneRates,
    confidenceValues,
    commonMiss,
    topMisses,
    kaizen,
    readiness,
  } = useMetrics();

  const contactData = sortedLogs.map((l, i) => ({
    label: formatDate(l.dateISO),
    value: contactRates[i],
  }));

  const airborneData = sortedLogs.map((l, i) => ({
    label: formatDate(l.dateISO),
    value: airborneRates[i],
  }));

  const confidenceData = sortedLogs.map((l, i) => ({
    label: formatDate(l.dateISO),
    value: confidenceValues[i],
  }));

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-bold text-gray-100">Dashboard</h2>

      <TournamentReadiness readiness={readiness} />

      <div>
        <h3 className="text-sm font-semibold text-gray-300 mb-2">Averages</h3>
        <WeeklySummary allLogs={sortedLogs} commonMiss={commonMiss} topMisses={topMisses} />
      </div>

      {kaizen.length > 0 && (
        <div className="bg-green-500/8 border border-green-500/15 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-green-400 mb-2">🎯 Kaizen Wins This Week</h3>
          {kaizen.map((win, i) => (
            <p key={i} className="text-sm text-green-500/80">• {win}</p>
          ))}
        </div>
      )}

      <h3 className="text-sm font-semibold text-gray-300 mb-2">Trends</h3>
      <MetricChart title="Airborne Rate" data={airborneData} color="#60a5fa" />
      <MetricChart title="Solid Contact Rate" data={contactData} color="#4ade80" />
      <MetricChart title="Confidence Trend" data={confidenceData} color="#c084fc" />
    </div>
  );
}
