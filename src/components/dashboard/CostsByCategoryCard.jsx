import React from 'react';
import { MoreVertical } from 'lucide-react';

export function CostsByCategoryCard() {
  const categories = [
    { name: 'Fuel', amount: '$89.2K', percent: 35, color: '#10b981' },
    { name: 'Driver salaries', amount: '$63.7K', percent: 26, color: '#84cc16' },
    { name: 'Vehicle maintenance', amount: '$38.2K', percent: 15, color: '#eab308' },
    { name: 'Warehousing', amount: '$25.5K', percent: 10, color: '#f59e0b' },
    { name: 'Insurance', amount: '$17.8K', percent: 7, color: '#14b8a6' },
    { name: 'Tech & software', amount: '$12.7K', percent: 5, color: '#64748b' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#e8ede9] p-5 shadow-[0_2px_12px_-4px_rgba(9,34,24,0.03)] card-3d flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-[#092218] font-sans">
            Costs by category
          </h3>
          <button 
            title="More options"
            aria-label="More options"
            className="text-[#86a394] hover:text-[#092218] cursor-pointer p-1 rounded-lg hover:bg-[#edf5ee]"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        {/* Continuous Segmented Progress Bar */}
        <div className="flex w-full h-2 rounded-full overflow-hidden mb-4 bg-[#edf5ee] gap-0.5">
          {categories.map((c, i) => (
            <div
              key={i}
              className="h-full first:rounded-l-full last:rounded-r-full"
              style={{ width: `${c.percent}%`, backgroundColor: c.color }}
            />
          ))}
        </div>
      </div>

      {/* Category List */}
      <div className="space-y-2 text-xs font-mono">
        {categories.map((c, i) => (
          <div key={i} className="flex items-center justify-between text-[#092218]">
            <div className="flex items-center gap-2 min-w-0">
              <span 
                className="w-2 h-2 rounded-xs flex-shrink-0"
                style={{ backgroundColor: c.color }} 
              />
              <span className="text-[#526d60] font-sans truncate">{c.name}</span>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0 font-medium">
              <span>{c.amount}</span>
              <span className="text-[#86a394] text-[11px] w-8 text-right">{c.percent}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
