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
  let styles = 'bg-[#edf3ee] text-[#2d4a3e] border-[#d8e5dc]';
  let IconComponent = null;

  if (v === 'pass' || v === 'safe' || v === 'healthy' || v === 'ready' || v === 'success') {
    styles = 'bg-[#d7f2df] text-[#0d5934] border-[#b9e5c5] font-semibold';
    IconComponent = CheckCircle2;
  } else if (v === 'violation' || v === 'danger' || v === 'failed' || v === 'blocked' || v === 'high risk') {
    styles = 'bg-[#fef2f2] text-[#b91c1c] border-[#fecaca] font-semibold';
    IconComponent = XCircle;
  } else if (v === 'warning' || v === 'resource_pressure' || v === 'resource pressure' || v === 'medium risk') {
    styles = 'bg-[#fffbeb] text-[#b45309] border-[#fde68a] font-semibold';
    IconComponent = AlertTriangle;
  } else if (v === 'info' || v === 'pending' || v === 'pending review') {
    styles = 'bg-[#eef6ff] text-[#1d4ed8] border-[#bfdbfe] font-semibold';
    IconComponent = Clock;
  } else if (v === 'low risk') {
    styles = 'bg-[#d7f2df] text-[#0d5934] border-[#b9e5c5] font-semibold';
    IconComponent = ShieldCheck;
  } else if (v === 'auto_execute' || v === 'auto executed') {
    styles = 'bg-[#092218] text-white border-[#092218] font-bold shadow-sm';
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
