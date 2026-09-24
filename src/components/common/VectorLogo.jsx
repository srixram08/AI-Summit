import React from 'react';

export function VectorLogo({ 
  size = 'md', 
  showText = true, 
  animated = false,
  className = '',
  badge = 'ASSURE' 
}) {
  const sizeMap = {
    xs: { img: 'w-6 h-6', text: 'text-sm', badge: 'text-[8px] px-1.5' },
    sm: { img: 'w-8 h-8', text: 'text-base', badge: 'text-[9px] px-2' },
    md: { img: 'w-10 h-10', text: 'text-xl', badge: 'text-[10px] px-2.5' },
    lg: { img: 'w-14 h-14', text: 'text-2xl', badge: 'text-xs px-3' },
    xl: { img: 'w-20 h-20', text: 'text-3xl', badge: 'text-sm px-3.5' }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* 3D Shield Logo Image Container */}
      <div 
        className={`relative ${currentSize.img} rounded-xl bg-black p-0.5 border border-[#2b654c]/60 shadow-md overflow-hidden flex items-center justify-center flex-shrink-0 ${
          animated ? 'logo-3d' : 'transition-transform duration-300 hover:scale-105'
        }`}
      >
        <img
          src="/vector-logo.png"
          alt="Vector Assurance Logo"
          className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]"
        />
        {/* Subtle holographic sheen */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
      </div>

      {showText && (
        <div className="flex items-center gap-2">
          <span className={`font-extrabold tracking-tight text-[#092218] font-sans ${currentSize.text}`}>
            Vector
          </span>
          {badge && (
            <span className={`font-mono uppercase bg-[#d7f2df] text-[#0d5934] py-0.5 rounded-full font-bold border border-[#b9e5c5] shadow-xs ${currentSize.badge}`}>
              {badge}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
