import React from 'react';

export function StatusDot({ status = 'online', ping = true, size = 'md' }) {
  const sizeMap = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
  };

  const colorMap = {
    online: 'bg-emerald-400',
    healthy: 'bg-emerald-400',
    safe: 'bg-emerald-400',
    danger: 'bg-rose-500',
    violation: 'bg-rose-500',
    warning: 'bg-amber-400',
    info: 'bg-cyan-400',
    muted: 'bg-slate-500',
  };

  const pingColorMap = {
    online: 'bg-emerald-400',
    healthy: 'bg-emerald-400',
    safe: 'bg-emerald-400',
    danger: 'bg-rose-500',
    violation: 'bg-rose-500',
    warning: 'bg-amber-400',
    info: 'bg-cyan-400',
    muted: 'bg-slate-500',
  };

  const dotColor = colorMap[status.toLowerCase()] || colorMap.online;
  const pingColor = pingColorMap[status.toLowerCase()] || pingColorMap.online;

  return (
    <span className="relative flex items-center justify-center">
      {ping && (
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${pingColor}`}
        />
      )}
      <span className={`relative inline-flex rounded-full ${sizeMap[size] || sizeMap.md} ${dotColor}`} />
    </span>
  );
}
