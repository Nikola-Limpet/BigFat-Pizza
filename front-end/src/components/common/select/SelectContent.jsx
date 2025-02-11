import React from 'react';
import { useContext } from 'react';
import { SelectContext } from './Select';
import { motion, AnimatePresence } from 'framer-motion';

const SelectContent = ({ children, className = '' }) => {
  const { isOpen } = useContext(SelectContext);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={`
            absolute z-50 w-full mt-2 py-1
            bg-white border border-gray-200 rounded-lg
            shadow-lg overflow-hidden
            ${className}
          `}
        >
          <div className="max-h-60 overflow-y-auto">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { SelectContent };