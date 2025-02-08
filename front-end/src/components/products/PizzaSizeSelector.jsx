const PizzaSizeSelector = ({ sizes = [], selectedSize, onSelectSize }) => {
  if (!sizes || sizes.length === 0) return null;

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold">Choose Size</h4>
      <div className="flex flex-wrap gap-4">
        {sizes.map((size) => (
          <button
            key={size.name}
            onClick={() => onSelectSize(size)}
            className={`px-6 py-2 rounded-full border-2 ${selectedSize?.name === size.name
              ? 'border-[#C41E3A] bg-[#C41E3A]/10'
              : 'border-gray-200 hover:border-gray-300'
              }`}
          >
            {size.name} - ${size.price.toFixed(2)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PizzaSizeSelector;