const WhyChooseUs = () => {
  return (
    <div className="why-choose-us text-center mb-8">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4">
          <img src="https://via.placeholder.com/100?text=Icon+1" alt="Icon 1" className="mx-auto mb-2" />
          <h3 className="text-xl font-semibold">Fresh Ingredients</h3>
          <p className="text-gray-600">We use only the freshest ingredients for our pizzas.</p>
        </div>
        {/* Add more benefits here */}
      </div>
    </div>
  );
};

export default WhyChooseUs;