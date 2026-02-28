import { useState, useEffect, useRef } from 'react';
import type { DrillBlock as DrillBlockType } from '../data/sessions';
import { REFERENCES } from '../data/references';
import { playBellSound, triggerVibration } from '../lib/timerAlerts';

export interface BlockCounts {
  solidContact: number;
  airborne: number;
}

interface Props {
  block: DrillBlockType;
  quickMode: boolean;
  isActive: boolean;
  counts?: BlockCounts;
  onCountsChange?: (counts: BlockCounts) => void;
}

function TapCounter({ label, value, max, color, onTap }: {
  label: string;
  value: number;
  max: number;
  color: 'green' | 'blue';
  onTap: () => void;
}) {
  const colors = color === 'green'
    ? 'bg-green-500/15 border-green-500/25 text-green-400 active:bg-green-500/30'
    : 'bg-blue-500/15 border-blue-500/25 text-blue-400 active:bg-blue-500/30';

  return (
    <button
      onClick={onTap}
      disabled={value >= max}
      className={`flex-1 flex flex-col items-center gap-0.5 rounded-xl border p-3 transition-colors disabled:opacity-40 ${colors}`}
    >
      <span className="text-2xl font-bold tabular-nums">{value}/{max}</span>
      <span className="text-[11px] font-medium opacity-80">{label}</span>
    </button>
  );
}

export default function DrillBlock({ block, quickMode, isActive, counts, onCountsChange }: Props) {
  const duration = quickMode ? block.quickDurationMin : block.durationMin;
  const [secondsLeft, setSecondsLeft] = useState(duration * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    setSecondsLeft(duration * 60);
    setRunning(false);
  }, [duration, isActive]);

  const wasRunningRef = useRef(false);

  useEffect(() => {
    if (running && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            setRunning(false);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, secondsLeft]);

  useEffect(() => {
    if (running) {
      wasRunningRef.current = true;
    } else if (wasRunningRef.current && secondsLeft === 0) {
      wasRunningRef.current = false;
      playBellSound();
      triggerVibration();
    }
  }, [running, secondsLeft]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const progress = 1 - secondsLeft / (duration * 60);
  const hasBalls = block.ballCount != null && block.ballCount > 0;

  if (!isActive) {
    return (
      <div className="bg-gray-800/40 rounded-xl border border-gray-800 p-4 opacity-50">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-300">{block.name}</h3>
          <span className="text-xs text-gray-400">{duration} min</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl border border-green-500/30 p-4 shadow-lg shadow-green-500/5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-100 text-lg">{block.name}</h3>
        <div className="flex items-center gap-2">
          {block.reps && (
            <span className="text-xs bg-purple-500/15 text-purple-400 px-2 py-0.5 rounded-full">
              {block.reps} reps
            </span>
          )}
        </div>
      </div>

      <p className="text-sm text-gray-300 mb-3">{block.description}</p>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-3xl font-mono font-bold text-gray-100">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
          <button
            onClick={() => setRunning(!running)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              running
                ? 'bg-red-500/15 text-red-400 border border-red-500/25 hover:bg-red-500/25'
                : 'bg-green-500/15 text-green-400 border border-green-500/25 hover:bg-green-500/25'
            }`}
          >
            {running ? 'Pause' : secondsLeft === 0 ? 'Done' : 'Start'}
          </button>
        </div>
        <div className="w-full bg-gray-700/50 rounded-full h-1.5">
          <div
            className="bg-green-500 h-1.5 rounded-full transition-all duration-1000"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wide">Key Cues</h4>
        {block.cues.map((cue, i) => (
          <div key={i} className="flex items-start gap-2 text-sm">
            <span className="text-green-500 mt-0.5 shrink-0">▸</span>
            <span className="text-gray-300">{cue}</span>
          </div>
        ))}
      </div>

      {block.resetRules && (
        <div className="mt-3 p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-lg">
          <p className="text-xs text-amber-400">
            <span className="font-semibold">Reset Rule:</span> {block.resetRules}
          </p>
        </div>
      )}

      {block.referenceIds.length > 0 && (() => {
        const refs = block.referenceIds
          .map((id) => REFERENCES.find((r) => r.id === id))
          .filter((r): r is NonNullable<typeof r> => r != null && r.youtubeUrl != null);
        if (refs.length === 0) return null;
        return (
          <div className="mt-4 flex flex-wrap gap-3">
            {refs.map((ref) => (
              <a
                key={ref.id}
                href={ref.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-red-400 font-medium hover:text-red-300"
              >
                ▶ Watch Video
              </a>
            ))}
          </div>
        );
      })()}

      {hasBalls && counts && onCountsChange && (
        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-700/50">
          <TapCounter
            label="Airborne"
            value={counts.airborne}
            max={block.ballCount!}
            color="blue"
            onTap={() => onCountsChange({ ...counts, airborne: counts.airborne + 1 })}
          />
          <TapCounter
            label="Solid Contact"
            value={counts.solidContact}
            max={block.ballCount!}
            color="green"
            onTap={() => onCountsChange({ ...counts, solidContact: counts.solidContact + 1 })}
          />
        </div>
      )}
    </div>
  );
}
