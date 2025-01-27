const HoursLocation = () => {
  return (
    <div className="hours-location text-center mb-8">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">Hours and Location</h2>
      <p className="text-gray-700">123 Pizza Street, Pizzatown, PZ 12345</p>
      <p className="text-gray-700">Mon-Sun: 11am - 11pm</p>
      <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" className="text-red-600 underline">
        Get Directions
      </a>
    </div>
  );
};

export default HoursLocation;