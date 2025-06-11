import React from 'react';

export const Divider = () => {
  return (
    <div className="flex items-center gap-4 my-6">
      <div className="flex-1 h-px bg-linear-to-r from-transparent via-white/30 to-transparent"></div>
      <span className="text-gray-400 text-sm">or</span>
      <div className="flex-1 h-px bg-linear-to-r from-transparent via-white/30 to-transparent"></div>
    </div>
  );
};