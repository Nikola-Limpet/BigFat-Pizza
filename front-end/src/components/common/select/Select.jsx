import React, { createContext, useState, useEffect, useRef } from 'react';

const SelectContext = createContext({});

const Select = ({ children, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  // Close select when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <SelectContext.Provider value={{ value, onChange, isOpen, setIsOpen }}>
      <div ref={selectRef} className="relative w-full">{children}</div>
    </SelectContext.Provider>
  );
};

export { Select, SelectContext };