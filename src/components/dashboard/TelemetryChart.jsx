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
      <div className="bg-[#0b101d] border border-slate-700/80 px-3 py-2 rounded-lg shadow-xl text-xs font-mono">
        <div className="text-slate-400 mb-1">{label}</div>
        <div className="flex items-center gap-1.5 font-bold" style={{ color }}>
          <span>{payload[0].value}</span>
          <span className="text-[10px] text-slate-400 font-normal">{unit}</span>
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
  color = '#00f59b',
  unit = '%',
  currentValue,
  domain = [0, 100],
  trendLabel = 'Normal',
  icon: Icon
}) {
  return (
    <div className="bg-[#0d1424] rounded-xl p-4 sm:p-5 border border-slate-800/80 flex flex-col justify-between hover:border-slate-700/80 transition-all duration-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {Icon && (
            <div className="p-1.5 rounded bg-slate-800/80 text-slate-300">
              <Icon className="w-3.5 h-3.5" />
            </div>
          )}
          <div>
            <h3 className="text-xs font-mono font-medium text-slate-300 uppercase tracking-wider">
              {title}
            </h3>
            <span className="text-[11px] text-slate-500 font-mono">30-second sliding telemetry</span>
          </div>
        </div>

        <div className="text-right">
          <div className="text-lg font-bold font-mono text-white flex items-baseline justify-end gap-1">
            <span>{currentValue}</span>
            <span className="text-xs font-normal text-slate-400">{unit}</span>
          </div>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-emerald-400 border border-emerald-500/20">
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
                <stop offset="0%" stopColor={color} stopOpacity={0.25} />
                <stop offset="100%" stopColor={color} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis
              dataKey="time"
              stroke="#475569"
              tick={{ fontSize: 10, fill: '#64748b' }}
              tickLine={false}
              interval="preserveEnd"
              minTickGap={20}
            />
            <YAxis
              domain={domain}
              stroke="#475569"
              tick={{ fontSize: 10, fill: '#64748b' }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip unit={unit} color={color} />} />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: color, stroke: '#080c14', strokeWidth: 2 }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom meta stats */}
      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-3 border-t border-slate-800/60 mt-2">
        <span>Min: {Math.min(...data.map(d => d[dataKey] || 0))} {unit}</span>
        <span>Avg: {Math.round(data.reduce((a, b) => a + (b[dataKey] || 0), 0) / (data.length || 1))} {unit}</span>
        <span>Max: {Math.max(...data.map(d => d[dataKey] || 0))} {unit}</span>
      </div>
    </div>
  );
}
