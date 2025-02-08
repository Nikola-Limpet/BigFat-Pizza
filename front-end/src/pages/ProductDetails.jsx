import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Star } from 'lucide-react';
import PizzaSizeSelector from '@/components/products/PizzaSizeSelector';
import AddToCartButton from '../components/products/AddToCartBotton';
import productService from '@/services/product';

const ProductDetails = () => {
  const { slug } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedToppings, setSelectedToppings] = useState([]);

  // Fetch product details by slug
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => productService.getProductBySlug(slug),
    staleTime: 60000,
    cacheTime: 300000,
  });

  // calculate total price
  const basePrice = selectedSize?.price || product?.basePrice || 0;
  const toppingsTotal = selectedToppings.reduce((sum, t) => sum + t.price, 0);
  const totalPrice = (basePrice + toppingsTotal).toFixed(2);


  // Handle topping selection
  const handleToppingToggle = (topping) => {
    setSelectedToppings(prev =>
      prev.some(t => t._id === topping._id)
        ? prev.filter(t => t._id !== topping._id)
        : [...prev, topping]
    );
  };



  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-medium">Loading product details...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-600 font-medium">
          Error loading product details: {error.message}
        </p>
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-medium">No product found</p>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-2xl shadow-lg"
            onError={(e) => {
              e.target.src = '/placeHolder.bmp';
            }}
          />
          {product.isNew && (
            <div className="absolute top-4 right-4 bg-[#C41E3A] text-white px-4 py-2 rounded-full text-sm">
              New Arrival!
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-[#FFA726] text-[#FFA726]" />
              <span className="font-medium">{product.rating}/5</span>
            </div>
            <span className="text-gray-500">({product.calories} reviews)</span>
          </div>
          {/* Dynamic Price Display */}
          <p className="text-2xl font-bold text-[#C41E3A]">
            ${totalPrice}
          </p>

          <p className="text-gray-600">{product.description}</p>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Customize Your Pizza</h3>
            {/* Size Selector */}
            <PizzaSizeSelector
              sizes={product.sizes}
              selectedSize={selectedSize}
              onSelectSize={setSelectedSize}
            />
            {/* Toppings Selector */}
            {product.toppings?.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold">Add Toppings (+${toppingsTotal.toFixed(2)})</h4>
                <div className="grid grid-cols-2 gap-4">
                  {product.toppings.map((topping) => (
                    <label
                      key={topping._id}
                      className="flex items-center space-x-2 p-3 border rounded-lg hover:border-[#C41E3A]"
                    >
                      <input
                        type="checkbox"
                        checked={selectedToppings.some(t => t._id === topping._id)}
                        onChange={() => handleToppingToggle(topping)}
                        className="form-checkbox h-5 w-5 text-[#C41E3A] rounded"
                      />
                      <span className="flex-1">
                        {topping.name} (+${topping.price.toFixed(2)})
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          <AddToCartButton
            product={{
              ...product,
              price: parseFloat(totalPrice),
              selectedSize,
              selectedToppings
            }}
          />
        </div>
      </div>

      {/* Nutrition Information */}
      <div className="mt-12 bg-[#FFF5E6] p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Nutrition Information</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="font-bold text-[#C41E3A]">{product.calories}</p>
            <p className="text-sm">Calories</p>
          </div>
          {/* Additional nutritional info can be added here */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
