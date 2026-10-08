import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface DisclaimerBannerProps {
  onLearnMore?: () => void;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ onLearnMore }) => {
  return (
    <div className="bg-amber-50 border-b border-amber-200/80 px-4 py-2.5 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm text-amber-900">
        <div className="flex items-center gap-2 min-w-0">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
          <p className="truncate sm:overflow-visible">
            <span className="font-semibold">Educational Prototype Notice:</span> This tool is for
            preliminary screening and educational purposes only. It does not provide a medical
            diagnosis.
          </p>
        </div>
        {onLearnMore && (
          <button
            onClick={onLearnMore}
            className="text-amber-900 font-semibold underline underline-offset-2 hover:text-amber-950 shrink-0 text-xs"
          >
            Disclaimer
          </button>
        )}
      </div>
    </div>
  );
};
