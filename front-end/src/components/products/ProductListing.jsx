import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import { Button } from '@/components/common/button';
import { Input } from '@/components/common/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/common/select';

const ProductListing = ({ products }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Define available filter categories – adjust these to match your product category names
  const categories = ['All', 'Vegetarian', 'Meat Lovers', 'Specialty', 'Classic'];

  const sortOptions = [
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Rating' },
    { value: 'popular', label: 'Popularity' }
  ];

  // Get current filters from URL search parameters
  const currentCategory = searchParams.get('category') || 'All';
  const currentSort = searchParams.get('sort') || 'popular';
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter – product.categories is an array of objects; compare by name (or you could compare by slug)
    if (currentCategory !== 'All') {
      filtered = filtered.filter(product =>
        product.categories &&
        product.categories.some(cat =>
          cat.name.toLowerCase().includes(currentCategory.toLowerCase())
        )
      );
    }

    // Sorting – using basePrice, rating, and popularity
    switch (currentSort) {
      case 'price-asc':
        filtered.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        filtered.sort((a, b) => b.popularity - a.popularity);
    }

    setFilteredProducts(filtered);
  }, [products, searchParams, currentCategory, currentSort, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filters Section */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={currentCategory === category ? 'default' : 'outline'}
              onClick={() =>
                setSearchParams({ ...Object.fromEntries(searchParams), category })
              }
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="w-full sm:w-auto flex gap-4">
          <Input
            placeholder="Search pizzas..."
            value={searchQuery}
            onChange={(e) =>
              setSearchParams({ ...Object.fromEntries(searchParams), search: e.target.value })
            }
            className="max-w-[300px]"
          />

          <Select
            value={currentSort}
            onValueChange={(value) =>
              setSearchParams({ ...Object.fromEntries(searchParams), sort: value })
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No pizzas found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default ProductListing;
