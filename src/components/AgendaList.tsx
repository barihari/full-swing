import { toISO, addDays, formatDate } from '../lib/dates';
import SessionCard from './SessionCard';

interface PlanDay {
  dateISO: string;
  sessionType: string;
  plannedDurationMin: number;
  isRestDay: boolean;
}

interface Props {
  planDays: PlanDay[];
  completedDates: Set<string>;
  days?: number;
}

export default function AgendaList({ planDays, completedDates, days = 7 }: Props) {
  const today = new Date();
  const upcoming: PlanDay[] = [];

  for (let i = 0; i < days; i++) {
    const iso = toISO(addDays(today, i));
    const day = planDays.find((p) => p.dateISO === iso);
    if (day && !day.isRestDay) {
      upcoming.push(day);
    }
  }

  if (upcoming.length === 0) {
    return (
      <p className="text-sm text-gray-300 text-center py-4">No sessions scheduled in the next {days} days.</p>
    );
  }

  return (
    <div className="space-y-2">
      {upcoming.map((day) => (
        <div key={day.dateISO}>
          <p className="text-xs text-gray-300 font-medium mb-1 px-1">{formatDate(day.dateISO)}</p>
          <SessionCard
            dateISO={day.dateISO}
            sessionType={day.sessionType}
            durationMin={day.plannedDurationMin}
            isCompleted={completedDates.has(day.dateISO)}
            compact
          />
        </div>
      ))}
    </div>
  );
}
