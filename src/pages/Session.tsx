import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePlan } from '../hooks/usePlan';
import { useSettings } from '../hooks/useSettings';
import { SESSION_TEMPLATES, SESSION_TYPE_BG } from '../data/sessions';
import { formatDateLong } from '../lib/dates';
import DrillBlock from '../components/DrillBlock';
import type { BlockCounts } from '../components/DrillBlock';

export default function Session() {
  const { dateISO } = useParams<{ dateISO: string }>();
  const navigate = useNavigate();
  const { planDays } = usePlan();
  const { settings } = useSettings();

  const planDay = planDays.find((d) => d.dateISO === dateISO);
  const template = planDay ? SESSION_TEMPLATES[planDay.sessionType] : null;

  const [currentBlock, setCurrentBlock] = useState(0);
  const [quickMode, setQuickMode] = useState(settings.quickModeDefault);
  const [blockCounts, setBlockCounts] = useState<Record<number, BlockCounts>>({});

  if (!planDay || !template || !dateISO) {
    return (
      <div className="p-4 text-center py-12">
        <p className="text-gray-300">Session not found.</p>
        <Link to="/" className="text-green-400 text-sm mt-2 inline-block">← Back home</Link>
      </div>
    );
  }

  const badgeClass = SESSION_TYPE_BG[planDay.sessionType] ?? '';
  const blocks = template.blocks;
  const isLastBlock = currentBlock === blocks.length - 1;

  const getBlockCounts = (idx: number): BlockCounts =>
    blockCounts[idx] ?? { solidContact: 0, airborne: 0 };

  const totalBalls = blocks.reduce((sum, b) => sum + (b.ballCount ?? 0), 0);
  const totalSolid = Object.entries(blockCounts).reduce((sum, [idx, c]) => {
    return blocks[Number(idx)]?.ballCount ? sum + c.solidContact : sum;
  }, 0);
  const totalAirborne = Object.entries(blockCounts).reduce((sum, [idx, c]) => {
    return blocks[Number(idx)]?.ballCount ? sum + c.airborne : sum;
  }, 0);

  const handleLogSession = () => {
    navigate(`/log/${dateISO}`, {
      state: { solidContact: totalSolid, airborne: totalAirborne, totalBalls },
    });
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-300">{formatDateLong(dateISO)}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeClass}`}>
              {planDay.sessionType}
            </span>
            <h2 className="text-lg font-bold text-gray-100">{template.name}</h2>
          </div>
        </div>
        <button
          onClick={() => setQuickMode(!quickMode)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            quickMode ? 'bg-amber-500/15 text-amber-400 border border-amber-500/25' : 'bg-gray-800 text-gray-300 border border-gray-700'
          }`}
        >
          {quickMode ? '⚡ Quick' : '⏱ Full'}
        </button>
      </div>

      <div className="flex gap-1">
        {blocks.map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-1.5 rounded-full transition-colors ${
              i < currentBlock ? 'bg-green-500' : i === currentBlock ? 'bg-green-500/40' : 'bg-gray-800'
            }`}
          />
        ))}
      </div>

      <p className="text-xs text-gray-300">
        Block {currentBlock + 1} of {blocks.length}
      </p>

      <div className="space-y-3">
        {blocks.map((block, i) => (
          <DrillBlock
            key={i}
            block={block}
            quickMode={quickMode}
            isActive={i === currentBlock}
            counts={getBlockCounts(i)}
            onCountsChange={(c) => setBlockCounts((prev) => ({ ...prev, [i]: c }))}
          />
        ))}
      </div>

      <div className="flex gap-2 pt-2">
        <button
          onClick={() => setCurrentBlock(Math.max(0, currentBlock - 1))}
          disabled={currentBlock === 0}
          className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-gray-800 text-gray-300 border border-gray-700 disabled:opacity-30 transition-colors"
        >
          ← Previous
        </button>
        {isLastBlock ? (
          <button
            onClick={handleLogSession}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-green-500/15 text-green-400 border border-green-500/25 hover:bg-green-500/25 transition-colors"
          >
            Log Session →
          </button>
        ) : (
          <button
            onClick={() => setCurrentBlock(currentBlock + 1)}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-green-500/15 text-green-400 border border-green-500/25 hover:bg-green-500/25 transition-colors"
          >
            Next Block →
          </button>
        )}
      </div>
    </div>
  );
}
