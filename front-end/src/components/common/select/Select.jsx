import React, { createContext, useState } from 'react';

const SelectContext = createContext({});

const Select = ({ children, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SelectContext.Provider value={{ value, onChange, isOpen, setIsOpen }}>
      <div className="relative w-full">{children}</div>
    </SelectContext.Provider>
  );
};

export { Select, SelectContext };