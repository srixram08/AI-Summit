import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

function CustomTooltip({ active, payload, label, unit, color }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-[#b8e8c6] px-3.5 py-2.5 rounded-xl shadow-[0_8px_20px_-4px_rgba(9,34,24,0.12)] text-xs font-mono">
        <div className="text-[#698a78] mb-1 font-sans text-[11px]">{label}</div>
        <div className="flex items-center gap-1.5 font-bold" style={{ color }}>
          <span className="text-sm font-extrabold">{payload[0].value}</span>
          <span className="text-[10px] text-[#526d60] font-normal">{unit}</span>
        </div>
      </div>
    );
  }
  return null;
}

export function TelemetryChart({
  title,
  dataKey,
  data,
  color = '#059669',
  unit = '%',
  currentValue,
  domain = [0, 100],
  trendLabel = 'Normal',
  icon: Icon
}) {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e2ede5] flex flex-col justify-between hover:border-[#b8e8c6] transition-all duration-200 shadow-[0_4px_16px_-2px_rgba(9,34,24,0.02)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {Icon && (
            <div className="p-2 rounded-xl bg-[#edf5ee] border border-[#d8e6db] text-[#059669]">
              <Icon className="w-3.5 h-3.5" />
            </div>
          )}
          <div>
            <h3 className="text-xs font-mono font-bold text-[#092218] uppercase tracking-wider">
              {title}
            </h3>
            <span className="text-[11px] text-[#698a78] font-mono">Real-time sliding buffer</span>
          </div>
        </div>

        <div className="text-right">
          <div className="text-lg font-extrabold font-mono text-[#092218] flex items-baseline justify-end gap-1">
            <span>{currentValue}</span>
            <span className="text-xs font-normal text-[#526d60]">{unit}</span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#d7f2df] text-[#0d5934] border border-[#b9e5c5] font-semibold">
            {trendLabel}
          </span>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-44 w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
            <defs>
              <linearGradient id={`grad-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.2} />
                <stop offset="100%" stopColor={color} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#edf3ee" vertical={false} />
            <XAxis
              dataKey="time"
              stroke="#86a394"
              tick={{ fontSize: 10, fill: '#698a78' }}
              tickLine={false}
              interval="preserveEnd"
              minTickGap={20}
            />
            <YAxis
              domain={domain}
              stroke="#86a394"
              tick={{ fontSize: 10, fill: '#698a78' }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip unit={unit} color={color} />} />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, fill: color, stroke: '#ffffff', strokeWidth: 2 }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom meta stats */}
      <div className="flex items-center justify-between text-[11px] font-mono text-[#698a78] pt-3 border-t border-[#edf3ee] mt-2">
        <span>Min: {Math.min(...data.map(d => d[dataKey] || 0))} {unit}</span>
        <span>Avg: {Math.round(data.reduce((a, b) => a + (b[dataKey] || 0), 0) / (data.length || 1))} {unit}</span>
        <span>Max: {Math.max(...data.map(d => d[dataKey] || 0))} {unit}</span>
      </div>
    </div>
  );
}
