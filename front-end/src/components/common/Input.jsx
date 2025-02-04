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
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`
          w-full
          px-4
          py-2
          text-base
          border
          bg-[#6c6663]
          rounded-lg
          transition-all
          duration-200
          outline-none
          ${error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-400 hover:border-[#FFA726] focus:border-[#C41E3A] focus:ring-2 focus:ring-[#C41E3A]/20'
          }
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
