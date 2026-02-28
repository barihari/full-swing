import { useState, useMemo } from 'react';
import { usePlan } from '../hooks/usePlan';
import { useSessionLog } from '../hooks/useSessionLog';
import { fromISO, toISO } from '../lib/dates';
import { findNextAvailableDay, findPrevAvailableDay } from '../lib/schedule';
import CalendarGrid from '../components/CalendarGrid';
import AgendaList from '../components/AgendaList';
import SessionCard from '../components/SessionCard';
import { SESSION_TYPE_BG } from '../data/sessions';

export default function Calendar() {
  const { planDays, reschedule } = usePlan();
  const { logs } = useSessionLog();

  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | undefined>(toISO(today));

  const completedDates = useMemo(
    () => new Set(logs.map((l) => l.dateISO)),
    [logs],
  );

  const selectedPlan = planDays.find((d) => d.dateISO === selectedDate);

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const handleMoveToPrev = (dateISO: string) => {
    const prevDay = findPrevAvailableDay(planDays, dateISO);
    if (prevDay) {
      reschedule(dateISO, prevDay);
      setSelectedDate(prevDay);
    }
  };

  const handleMoveToNext = (dateISO: string) => {
    const nextDay = findNextAvailableDay(planDays, dateISO);
    if (nextDay) {
      reschedule(dateISO, nextDay);
      setSelectedDate(nextDay);
    }
  };

  const monthLabel = new Date(viewYear, viewMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="p-4 space-y-4">
      {/* Month navigation */}
      <div className="flex items-center justify-between">
        <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-700 rounded-lg text-gray-300">
          ←
        </button>
        <h2 className="text-lg font-semibold text-gray-50">{monthLabel}</h2>
        <button onClick={handleNextMonth} className="p-2 hover:bg-gray-700 rounded-lg text-gray-300">
          →
        </button>
      </div>

      {/* Calendar grid */}
      <CalendarGrid
        year={viewYear}
        month={viewMonth}
        planDays={planDays}
        completedDates={completedDates}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />

      {/* Selected day detail */}
      {selectedDate && selectedPlan && !selectedPlan.isRestDay && (
        <div className="space-y-2">
          <SessionCard
            dateISO={selectedPlan.dateISO}
            sessionType={selectedPlan.sessionType}
            durationMin={selectedPlan.plannedDurationMin}
            isCompleted={completedDates.has(selectedPlan.dateISO)}
          />
          {!completedDates.has(selectedPlan.dateISO) && (
            <div className="flex gap-2">
              <button
                onClick={() => handleMoveToPrev(selectedPlan.dateISO)}
                className="flex-1 text-sm text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-xl py-2 transition-colors"
              >
                ← Move back
              </button>
              <button
                onClick={() => handleMoveToNext(selectedPlan.dateISO)}
                className="flex-1 text-sm text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-xl py-2 transition-colors"
              >
                Move forward →
              </button>
            </div>
          )}
        </div>
      )}

      {selectedDate && selectedPlan?.isRestDay && (
        <div className="bg-gray-800 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-300">
            {selectedPlan.sessionType === 'Tournament' ? '🏆 Tournament Day' : 'Rest Day'}
          </p>
        </div>
      )}

      {/* Agenda */}
      <div>
        <h3 className="text-sm font-semibold text-gray-300 mb-2">Upcoming Sessions</h3>
        <AgendaList planDays={planDays} completedDates={completedDates} />
      </div>
    </div>
  );
}
