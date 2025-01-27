import { Link } from 'react-router-dom';

const FeaturedPizzas = () => {
  return (
    <div className="text-center mb-8">
      <h2 className="text-4xl font-bold text-teal-800/90 mb-4">Featured Pizzas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Example Pizza */}
        <div className="border p-4 rounded-lg shadow-lg">
          <img src="https://via.placeholder.com/200?text=Pizza+1" alt="Pizza 1" className="w-full h-32 object-cover mb-2" />
          <h3 className="text-xl font-semibold">Margherita Classic</h3>
          <p className="text-gray-700">$8.99</p>
          <p className="text-gray-600">Classic Margherita with fresh tomatoes and basil.</p>
          <Link to="/menu" className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300 mt-2 inline-block">
            Order Now
          </Link>
        </div>
        {/* Add more pizzas here */}
      </div>
    </div>
  );
};

export default FeaturedPizzas;