import React from 'react';
import { useContext } from 'react';
import { SelectContext } from './Select';

const SelectContent = ({ children, className = '' }) => {
  const { isOpen } = useContext(SelectContext);

  if (!isOpen) return null;

  return (
    <div
      className={`
        absolute z-50 w-full mt-1 py-1
        bg-white border border-gray-300 rounded-lg shadow-lg
        animate-in fade-in-50 duration-100
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export { SelectContent };