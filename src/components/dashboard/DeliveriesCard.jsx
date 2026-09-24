import React from 'react';
import { MoreVertical, TrendingUp } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

export function DeliveriesCard() {
  // Sparkline data for Total Deliveries
  const sparklineData = [
    { value: 1120 },
    { value: 1180 },
    { value: 1140 },
    { value: 1220 },
    { value: 1200 },
    { value: 1290 },
    { value: 1260 },
    { value: 1310 },
    { value: 1352 },
  ];

  // Battery equalizer bars (fleet utilization)
  const barHeights = [40, 55, 70, 85, 95, 90, 80, 75, 85, 95, 92, 88, 70, 85, 95, 95, 80, 90, 95, 85, 95, 92, 95, 90];

  return (
    <div className="bg-white rounded-2xl border border-[#e8ede9] p-5 shadow-[0_2px_12px_-4px_rgba(9,34,24,0.03)] card-3d">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-[#092218] font-sans">
          Deliveries
        </h3>
        <button 
          title="More options"
          aria-label="More options"
          className="text-[#86a394] hover:text-[#092218] cursor-pointer p-1 rounded-lg hover:bg-[#edf5ee]"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end">
        {/* 1. Fleet Utilization with Battery / Equalizer bars */}
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#86a394] font-bold block mb-1">
            FLEET UTILIZATION
          </span>
          <div className="text-2xl font-extrabold text-[#092218] font-sans mb-3">
            95.1%
          </div>

          {/* Equalizer Vertical Bars */}
          <div className="flex items-end gap-1 h-8">
            {barHeights.map((h, i) => {
              const isHighlight = i >= 6 && i <= 10;
              return (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-300 ${
                    isHighlight ? 'bg-[#eab308]' : 'bg-[#10b981]'
                  }`}
                  style={{ height: `${h}%` }}
                />
              );
            })}
          </div>
        </div>

        {/* 2. On-Time Delivery Rate with Segmented Gradient Gauge */}
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#86a394] font-bold block mb-1">
            ON-TIME DELIVERY RATE
          </span>
          <div className="text-2xl font-extrabold text-[#092218] font-sans mb-3">
            97.9%
          </div>

          {/* Gradient Gauge Bar with Pointer */}
          <div className="relative pt-2">
            <div className="h-2 w-full rounded-full bg-gradient-to-r from-[#eab308] via-[#84cc16] to-[#10b981]" />
            <div 
              className="absolute top-0 transform -translate-x-1/2 flex flex-col items-center"
              style={{ left: '92%' }}
            >
              <span className="text-[#092218] text-[10px] font-bold leading-none">▼</span>
            </div>
          </div>
        </div>

        {/* 3. Total Deliveries with Green Area Sparkline */}
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#86a394] font-bold block mb-1">
            TOTAL DELIVERIES
          </span>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-extrabold text-[#092218] font-sans">
              1,352
            </span>
            <span className="text-xs font-mono font-bold text-[#10b981] flex items-center">
              +3.5%
            </span>
          </div>

          <div className="h-10 w-full -mb-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineData}>
                <defs>
                  <linearGradient id="deliverySpark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#10b981"
                  strokeWidth={2}
                  fill="url(#deliverySpark)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
