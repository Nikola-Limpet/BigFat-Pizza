import React from 'react';

export const Label = ({ children, htmlFor, required, className = "" }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`
        block 
        text-lg 
        font-medium 
        text-[#6B4226]
        mb-2
        transition-colors
        duration-200
        ${required ? 'after:content-["*"] after:ml-1 after:text-[#C41E3A]' : ''}
        ${className}
      `}
    >
      {children}
    </label>
  );
};

Label.displayName = 'Label';