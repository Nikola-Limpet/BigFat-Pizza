import React from 'react';
import { useContext } from 'react';
import { SelectContext } from './select/Select';

const SelectValue = ({ placeholder = 'Select an option...' }) => {
  const { value } = useContext(SelectContext);

  return (
    <span className="block truncate">
      {value || placeholder}
    </span>
  );
};

export { SelectValue };