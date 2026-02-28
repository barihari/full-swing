import { useState } from 'react';
import { REFERENCES } from '../data/references';

export default function References() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="p-4 space-y-3">
      <h2 className="text-lg font-bold text-gray-100">Drill References</h2>
      <p className="text-sm text-gray-300">Tap any drill for details, tips, and video links.</p>

      <div className="space-y-2">
        {REFERENCES.map((ref) => {
          const isExpanded = expandedId === ref.id;

          return (
            <div key={ref.id} className="bg-gray-800 rounded-xl border border-gray-700/60 overflow-hidden">
              <button
                onClick={() => setExpandedId(isExpanded ? null : ref.id)}
                className="w-full text-left p-4 flex items-center justify-between"
              >
                <div>
                  <h3 className="text-sm font-semibold text-gray-200">{ref.title}</h3>
                  <p className="text-xs text-gray-300 mt-0.5">{ref.description}</p>
                </div>
                <span className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 border-t border-gray-700/60 pt-3">
                  <ul className="space-y-1.5 mb-3">
                    {ref.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="text-green-500 mt-0.5 shrink-0">▸</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                  {ref.youtubeUrl && (
                    <a
                      href={ref.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-red-400 font-medium hover:text-red-300"
                    >
                      ▶ Watch Video
                    </a>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
