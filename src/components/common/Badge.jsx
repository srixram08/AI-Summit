import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, ShieldCheck, Clock, Zap } from 'lucide-react';

export function Badge({ 
  variant = 'default', 
  children, 
  icon = true, 
  size = 'md',
  className = '' 
}) {
  const v = (variant || '').toLowerCase();

  let styles = 'bg-slate-800 text-slate-300 border-slate-700';
  let IconComponent = null;

  if (v === 'pass' || v === 'safe' || v === 'healthy' || v === 'ready' || v === 'success') {
    styles = 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30';
    IconComponent = CheckCircle2;
  } else if (v === 'violation' || v === 'danger' || v === 'failed' || v === 'blocked' || v === 'high risk') {
    styles = 'bg-rose-950/60 text-rose-400 border-rose-500/30';
    IconComponent = XCircle;
  } else if (v === 'warning' || v === 'resource_pressure' || v === 'resource pressure' || v === 'medium risk') {
    styles = 'bg-amber-950/60 text-amber-400 border-amber-500/30';
    IconComponent = AlertTriangle;
  } else if (v === 'info' || v === 'pending' || v === 'pending review') {
    styles = 'bg-cyan-950/60 text-cyan-400 border-cyan-500/30';
    IconComponent = Clock;
  } else if (v === 'low risk') {
    styles = 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30';
    IconComponent = ShieldCheck;
  } else if (v === 'auto_execute' || v === 'auto executed') {
    styles = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40';
    IconComponent = Zap;
  }

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 tracking-wider font-semibold',
    md: 'text-xs px-2.5 py-1 tracking-wide font-medium',
    lg: 'text-sm px-3.5 py-1.5 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-mono uppercase ${sizeClasses[size] || sizeClasses.md} ${styles} ${className}`}
    >
      {icon && IconComponent && <IconComponent className="w-3.5 h-3.5 flex-shrink-0" />}
      <span>{children}</span>
    </span>
  );
}
