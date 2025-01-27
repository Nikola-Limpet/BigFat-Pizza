const CustomerTestimonials = () => {
  return (
    <div className="testimonials text-center mb-8">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">Customer Testimonials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg shadow-lg">
          <img src="https://via.placeholder.com/50?text=Profile+1" alt="Customer 1" className="mx-auto mb-2 rounded-full" />
          <p className="text-gray-600">"Best pizza I've ever had!"</p>
          <p className="text-gray-700 font-semibold">- John Doe</p>
        </div>
        {/* Add more testimonials here */}
      </div>
    </div>
  );
};

export default CustomerTestimonials;