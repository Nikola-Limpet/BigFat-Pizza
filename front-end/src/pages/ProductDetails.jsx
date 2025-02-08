import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Star } from 'lucide-react';
import PizzaSizeSelector from '@/components/products/PizzaSizeSelector';
import AddToCartButton from '../components/products/AddToCartBotton'
import productService from '@/services/product';

const ProductDetail = () => {
  const { slug } = useParams();

  // Fetch product details by slug
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => productService.getProductBySlug(slug),
    // Add this to ensure stable data between renders
    staleTime: 60000,
    // Add this to prevent unnecessary refetches
    cacheTime: 300000,
  });

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

  // Add null check for product
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-medium">No product found</p>
      </div>
    );
  }

  console.log(product);
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
            <span className="text-gray-500">
              ({product.calories} reviews)
            </span>
          </div>

          <p className="text-2xl font-bold text-[#C41E3A]">
            ${product.basePrice?.toFixed(2)}
          </p>

          <p className="text-gray-600">{product.description}</p>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Customize Your Pizza</h3>
            {/* Render a size selector component */}
            <PizzaSizeSelector sizes={product.sizes} />

            {/* Render available toppings */}
            {product.toppings && product.toppings.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {product.toppings.map((topping) => (
                  <label
                    key={topping._id}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox text-[#C41E3A] rounded"
                    />
                    <span>
                      {topping.name} (+${topping.price.toFixed(2)})
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <AddToCartButton product={product} />
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

          {/*  Add more infor  */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
