import React from 'react';
import { 
  Activity, 
  Cpu, 
  HardDrive, 
  Clock, 
  ShieldCheck, 
  AlertTriangle,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

export function KpiCard({ 
  title, 
  value, 
  unit = '', 
  subtitle, 
  status = 'default', 
  trend, 
  trendDirection = 'neutral',
  icon: Icon 
}) {
  const getStatusStyles = () => {
    switch (status) {
      case 'healthy':
      case 'safe':
        return {
          border: 'border-[#e2ede5] hover:border-[#b8e8c6]',
          accent: 'text-[#092218]',
          bgAccent: 'bg-[#d7f2df] text-[#0d5934] border-[#b9e5c5]',
          glow: 'hover:shadow-[0_8px_25px_-4px_rgba(9,34,24,0.06)]'
        };
      case 'danger':
      case 'incident':
        return {
          border: 'border-[#fecaca] hover:border-[#fca5a5]',
          accent: 'text-[#dc2626]',
          bgAccent: 'bg-[#fef2f2] text-[#dc2626] border-[#fecaca]',
          glow: 'hover:shadow-[0_8px_25px_-4px_rgba(220,38,38,0.08)]'
        };
      case 'warning':
        return {
          border: 'border-[#fde68a] hover:border-[#fcd34d]',
          accent: 'text-[#d97706]',
          bgAccent: 'bg-[#fffbeb] text-[#d97706] border-[#fde68a]',
          glow: 'hover:shadow-[0_8px_25px_-4px_rgba(217,119,6,0.08)]'
        };
      default:
        return {
          border: 'border-[#e2ede5] hover:border-[#cbd5e1]',
          accent: 'text-[#092218]',
          bgAccent: 'bg-[#edf5ee] text-[#092218] border-[#d8e6db]',
          glow: 'hover:shadow-[0_8px_25px_-4px_rgba(9,34,24,0.04)]'
        };
    }
  };

  const style = getStatusStyles();

  return (
    <div
      className={`group relative bg-white rounded-2xl p-4 sm:p-5 border transition-all duration-300 ${style.border} ${style.glow} shadow-[0_4px_16px_-2px_rgba(9,34,24,0.02)]`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono uppercase tracking-wider text-[#526d60] font-semibold">
          {title}
        </span>
        {Icon && (
          <div className={`p-2 rounded-xl border ${style.bgAccent} transition-transform duration-200 group-hover:scale-105 shadow-xs`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-1.5 mb-1.5">
        <span className={`text-2xl sm:text-3xl font-extrabold font-mono tracking-tight ${style.accent}`}>
          {value}
        </span>
        {unit && (
          <span className="text-xs sm:text-sm font-mono text-[#526d60] font-medium">
            {unit}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-[#526d60] mt-2">
        <span className="truncate pr-2 font-sans font-medium">{subtitle}</span>
        {trend && (
          <span
            className={`font-mono text-[11px] font-bold flex items-center gap-0.5 flex-shrink-0 ${
              trendDirection === 'up'
                ? 'text-[#059669]'
                : trendDirection === 'down'
                ? 'text-[#dc2626]'
                : 'text-[#526d60]'
            }`}
          >
            {trendDirection === 'up' && <TrendingUp className="w-3 h-3" />}
            {trendDirection === 'down' && <TrendingDown className="w-3 h-3" />}
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
