import React from 'react';

export const Input = React.forwardRef(({
  className = "",
  error,
  label,
  ...props
}, ref) => {
  return (
    <div className="relative w-full">
      {label && (
        <label className="block text-sm font-medium text-[#6B4226] mb-1.5">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`
          w-full
          px-4
          py-3
          text-base
          border
          bg-[#FFF9F0]
          rounded-lg
          placeholder:text-[#6B4226]/60
          shadow-sm
          transition-all
          duration-200
          ease-in-out
          outline-none
          ${error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20 bg-red-50'
            : 'border-[#FFA726]/30 hover:border-[#FFA726] focus:border-[#C41E3A] focus:ring-2 focus:ring-[#C41E3A]/20'
          }
          disabled:opacity-50
          disabled:cursor-not-allowed
          disabled:bg-gray-100
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';