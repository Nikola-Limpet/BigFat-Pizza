import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Textarea = forwardRef(({
  className,
  label,
  error,
  id,
  maxLength,
  showCount = true,
  value = '',
  onChange,
  ...props
}, ref) => {
  const textareaId = id || Math.random().toString(36).substr(2, 9);

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-sm font-medium text-[#6B4226] mb-2"
        >
          {label}
        </label>
      )}

      <textarea
        ref={ref}
        id={textareaId}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        aria-invalid={!!error}
        aria-describedby={`${textareaId}-error ${textareaId}-count`}
        className={cn(
          "w-full min-h-[80px] p-3 text-[#6B4226]",
          "border-2 border-[#FFA726]/30 rounded-lg",
          "placeholder:text-[#6B4226]/60",
          "focus:border-[#FFA726] focus:ring-2 focus:ring-[#FFA726]/20",
          "hover:border-[#FFA726]/50",
          "transition-colors resize-y",
          "bg-[#FFF9F0]",
          error && "border-red-500 focus:border-red-500 focus:ring-red-200",
          className
        )}
        {...props}
      />

      <div className="flex justify-between mt-1">
        {error && (
          <p
            id={`${textareaId}-error`}
            className="text-xs text-red-500"
            role="alert"
          >
            {error}
          </p>
        )}

        {showCount && maxLength && (
          <p
            id={`${textareaId}-count`}
            className={cn(
              "text-xs",
              error ? "text-red-500" : "text-[#6B4226]/60"
            )}
          >
            {value.length}/{maxLength} characters
          </p>
        )}
      </div>
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;