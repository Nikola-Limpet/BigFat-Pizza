import React from 'react';
import { useContext } from 'react';
import { SelectContext } from './Select';
import { ChevronDown } from 'lucide-react';

const SelectTrigger = ({ children, className = '' }) => {
  const { isOpen, setIsOpen } = useContext(SelectContext);

  return (
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className={`
        flex items-center justify-between w-full px-4 py-3
        text-base border-2 rounded-lg bg-white
        transition-all duration-200 ease-in-out
        hover:border-[#FFA726] hover:shadow-md
        focus:outline-none focus:ring-2 focus:ring-[#C41E3A]/20
        ${isOpen
          ? 'border-[#C41E3A] shadow-lg'
          : 'border-gray-200 hover:border-[#FFA726]'}
        ${className}
      `}
    >
      {children}
      <ChevronDown
        className={`
          ml-2 h-4 w-4 text-gray-500
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'transform rotate-180 text-[#C41E3A]' : ''}
        `}
      />
    </button>
  );
};

export { SelectTrigger };