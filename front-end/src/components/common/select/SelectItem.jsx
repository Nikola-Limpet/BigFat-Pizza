import React from 'react';
import { useContext } from 'react';
import { SelectContext } from './Select';
import { Check } from 'lucide-react';

const SelectItem = ({ children, value, className = '' }) => {
  const { value: selectedValue, onChange, setIsOpen } = useContext(SelectContext);

  const handleClick = () => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div
      onClick={handleClick}
      className={`
        flex items-center justify-between px-4 py-2
        cursor-pointer transition-colors
        hover:bg-[#FFF5E6]
        ${selectedValue === value ? 'text-[#C41E3A] font-medium' : 'text-gray-700'}
        ${className}
      `}
    >
      {children}
      {selectedValue === value && <Check className="h-4 w-4" />}
    </div>
  );
};

export { SelectItem };