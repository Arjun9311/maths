import React from 'react';
import { Info } from 'lucide-react';

export default function TooltipIcon({ text, size = 15 }) {
  if (!text) return null;
  return (
    <span className="tooltip-wrapper" tabIndex={0} role="tooltip" aria-label={text}>
      <Info size={size} className="tooltip-icon" />
      <span className="tooltip-box">{text}</span>
    </span>
  );
}
