import { getDaysInMonth, getFirstDayOfMonth, toISO } from '../lib/dates';
import { SESSION_TYPE_COLORS } from '../data/sessions';

interface PlanDay {
  dateISO: string;
  sessionType: string;
  isRestDay: boolean;
}

interface Props {
  year: number;
  month: number;
  planDays: PlanDay[];
  completedDates: Set<string>;
  selectedDate?: string;
  onSelectDate: (dateISO: string) => void;
}

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarGrid({ year, month, planDays, completedDates, selectedDate, onSelectDate }: Props) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const today = toISO(new Date());

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const getPlanDay = (day: number): PlanDay | undefined => {
    const iso = toISO(new Date(year, month, day));
    return planDays.find((p) => p.dateISO === iso);
  };

  return (
    <div>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {DAY_LABELS.map((d) => (
          <div key={d} className="text-center text-xs font-medium text-gray-300 py-1">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) return <div key={`empty-${i}`} />;

          const iso = toISO(new Date(year, month, day));
          const planDay = getPlanDay(day);
          const isToday = iso === today;
          const isSelected = iso === selectedDate;
          const isCompleted = completedDates.has(iso);
          const dotColor = planDay && !planDay.isRestDay
            ? SESSION_TYPE_COLORS[planDay.sessionType] ?? '#6b7280'
            : undefined;

          return (
            <button
              key={day}
              onClick={() => onSelectDate(iso)}
              className={`relative flex flex-col items-center justify-center h-10 rounded-lg text-sm transition-colors
                ${isSelected ? 'bg-green-900/50 ring-2 ring-green-500' : ''}
                ${isToday && !isSelected ? 'bg-green-900/30 font-bold' : ''}
                ${!isSelected && !isToday ? 'hover:bg-gray-700' : ''}
              `}
            >
              <span className={isToday ? 'text-green-400' : 'text-gray-300'}>{day}</span>
              {dotColor && (
                <span
                  className="absolute bottom-1 w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: dotColor }}
                />
              )}
              {isCompleted && (
                <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-green-500" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
