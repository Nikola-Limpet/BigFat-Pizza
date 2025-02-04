import { useState } from 'react';

const PizzaSizeSelector = ({ sizes }) => {
  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  return (
    <div className="flex gap-4">
      {sizes.map(size => (
        <button
          key={size.name}
          onClick={() => setSelectedSize(size)}
          className={`px-6 py-2 rounded-full border-2 ${selectedSize.name === size.name
            ? 'border-[#C41E3A] bg-[#C41E3A]/10'
            : 'border-gray-200 hover:border-gray-300'
            }`}
        >
          {size.name} - ${size.price}
        </button>
      ))}
    </div>
  );
};

export default PizzaSizeSelector;