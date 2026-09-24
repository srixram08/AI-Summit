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
          border: 'border-emerald-500/20 hover:border-emerald-500/40',
          accent: 'text-emerald-400',
          bgAccent: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          glow: 'group-hover:shadow-[0_0_20px_rgba(0,245,155,0.08)]'
        };
      case 'danger':
      case 'incident':
        return {
          border: 'border-rose-500/20 hover:border-rose-500/40',
          accent: 'text-rose-400',
          bgAccent: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
          glow: 'group-hover:shadow-[0_0_20px_rgba(255,51,75,0.08)]'
        };
      case 'warning':
        return {
          border: 'border-amber-500/20 hover:border-amber-500/40',
          accent: 'text-amber-400',
          bgAccent: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          glow: 'group-hover:shadow-[0_0_20px_rgba(245,158,11,0.08)]'
        };
      case 'cyan':
        return {
          border: 'border-cyan-500/20 hover:border-cyan-500/40',
          accent: 'text-cyan-400',
          bgAccent: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
          glow: 'group-hover:shadow-[0_0_20px_rgba(0,229,255,0.08)]'
        };
      default:
        return {
          border: 'border-slate-800 hover:border-slate-700',
          accent: 'text-slate-300',
          bgAccent: 'bg-slate-800 text-slate-300 border-slate-700',
          glow: 'group-hover:shadow-[0_0_20px_rgba(255,255,255,0.03)]'
        };
    }
  };

  const style = getStatusStyles();

  return (
    <div
      className={`group relative bg-[#0d1424] rounded-xl p-4 sm:p-5 border transition-all duration-300 ${style.border} ${style.glow}`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-medium">
          {title}
        </span>
        {Icon && (
          <div className={`p-2 rounded-lg border ${style.bgAccent} transition-transform duration-200 group-hover:scale-105`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-1.5 mb-1.5">
        <span className={`text-2xl sm:text-3xl font-bold font-mono tracking-tight ${style.accent}`}>
          {value}
        </span>
        {unit && (
          <span className="text-xs sm:text-sm font-mono text-slate-400 font-normal">
            {unit}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
        <span className="truncate pr-2 font-sans">{subtitle}</span>
        {trend && (
          <span
            className={`font-mono text-[11px] font-semibold flex items-center gap-0.5 flex-shrink-0 ${
              trendDirection === 'up'
                ? 'text-emerald-400'
                : trendDirection === 'down'
                ? 'text-rose-400'
                : 'text-slate-400'
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
