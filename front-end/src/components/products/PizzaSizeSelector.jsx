import { useState } from 'react';

const PizzaSizeSelector = ({ sizes = [] }) => {
  // Add default value to prevent undefined error
  const [selectedSize, setSelectedSize] = useState(sizes[0] || null);

  // Don't render if no sizes are available
  if (!sizes || sizes.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-4">
      {sizes.map(size => (
        <button
          key={size.name}
          onClick={() => setSelectedSize(size)}
          className={`px-6 py-2 rounded-full border-2 ${selectedSize?.name === size.name
            ? 'border-[#C41E3A] bg-[#C41E3A]/10'
            : 'border-gray-200 hover:border-gray-300'
            }`}
        >
          {size.name} - ${size.price.toFixed(2)}
        </button>
      ))}
    </div>
  );
};

export default PizzaSizeSelector;