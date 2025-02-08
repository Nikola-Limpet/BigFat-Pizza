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
        flex items-center justify-between w-full px-4 py-2
        text-base border rounded-lg bg-gray-50
        transition-all duration-200
        hover:border-[#FFA726]
        focus:border-[#C41E3A] focus:ring-2 focus:ring-[#C41E3A]/20
        ${isOpen ? 'border-[#C41E3A]' : 'border-gray-300'}
        ${className}
      `}
    >
      {children}
      <ChevronDown
        className={`ml-2 h-4 w-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''
          }`}
      />
    </button>
  );
};

export { SelectTrigger };