import React from 'react';
import { useContext } from 'react';
import { SelectContext } from './Select';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const SelectItem = ({ children, value, className = '' }) => {
  const { value: selectedValue, onChange, setIsOpen } = useContext(SelectContext);
  const isSelected = selectedValue === value;

  const handleClick = () => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <motion.div
      whileHover={{ backgroundColor: '#FFF5E6' }}
      whileTap={{ backgroundColor: '#FFE4CC' }}
      onClick={handleClick}
      className={`
        flex items-center justify-between px-4 py-3
        cursor-pointer select-none
        ${isSelected ? 'bg-[#FFF5E6] text-[#C41E3A] font-medium' : 'text-gray-700'}
        ${className}
      `}
    >
      <span className="block truncate">{children}</span>
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.2 }}
        >
          <Check className="h-4 w-4 text-[#C41E3A]" />
        </motion.div>
      )}
    </motion.div>
  );
};

export { SelectItem };