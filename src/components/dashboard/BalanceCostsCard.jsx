import React from 'react';
import { MoreVertical } from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip,
  ComposedChart,
  Line
} from 'recharts';

export function BalanceCostsCard() {
  // Dual bar data with target threshold curve
  const data = [
    { day: '01', cash: 65, cost: 25, target: 80 },
    { day: '03', cash: 72, cost: 30, target: 82 },
    { day: '05', cash: 85, cost: 28, target: 85 },
    { day: '07', cash: 92, cost: 20, target: 88 },
    { day: '09', cash: 98, cost: 32, target: 92 },
    { day: '11', cash: 105, cost: 26, target: 96 },
    { day: '13', cash: 115, cost: 34, target: 100 },
    { day: '15', cash: 110, cost: 38, target: 102 },
    { day: '17', cash: 122, cost: 24, target: 105 },
    { day: '19', cash: 126, cost: 29, target: 110 },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#e8ede9] p-5 shadow-[0_2px_12px_-4px_rgba(9,34,24,0.03)] card-3d flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-bold text-[#092218] font-sans">
            Balance and costs
          </h3>
          <button 
            title="More options"
            aria-label="More options"
            className="text-[#86a394] hover:text-[#092218] cursor-pointer p-1 rounded-lg hover:bg-[#edf5ee]"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-baseline justify-between mb-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#86a394] font-bold block">
              CASH BALANCE
            </span>
            <div className="text-2xl font-extrabold text-[#092218] font-sans">
              $126K
            </div>
          </div>
          <span className="text-xs font-mono text-[#86a394]">
            Target: <strong className="text-[#092218]">&gt;$100K</strong>
          </span>
        </div>
      </div>

      <div className="h-32 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
            <Bar dataKey="cash" fill="#10b981" radius={[3, 3, 0, 0]} barSize={7} />
            <Bar dataKey="cost" fill="#f43f5e" radius={[3, 3, 0, 0]} barSize={7} />
            <Line 
              type="monotone" 
              dataKey="target" 
              stroke="#64748b" 
              strokeDasharray="3 3" 
              dot={{ r: 2, fill: '#64748b' }} 
              strokeWidth={1.5} 
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
