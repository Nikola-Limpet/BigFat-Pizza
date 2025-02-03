const HoursLocation = () => {
  return (
    <div className="hours-location py-16 px-4 bg-[#FFF5E6] relative overflow-hidden">
      {/* Decorative pizza crust border */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-repeat-x bg-[url('/pizza-crust-border.png')] opacity-20"></div>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-5xl font-bold text-[#C41E3A] mb-6 font-pacifico text-center">
          Come Visit Us
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Location Card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-[#FFA726] text-4xl mb-4">📍</div>
            <h3 className="text-2xl font-bold text-[#2C1810] mb-4">Our Pizzeria</h3>
            <p className="text-[#6B4226] mb-4">
              123 Pizza Street<br />
              Little Italy District<br />
              Pizzatown, PZ 12345
            </p>
            <a
              href="https://goo.gl/maps/example"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-[#C41E3A] hover:text-[#A3172D] transition-colors"
            >
              Get Directions
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>

          {/* Hours Card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-[#FFA726] text-4xl mb-4">🕒</div>
            <h3 className="text-2xl font-bold text-[#2C1810] mb-4">Operating Hours</h3>
            <div className="space-y-2 text-[#6B4226]">
              <p><span className="font-semibold">Mon-Thu:</span> 11AM - 10PM</p>
              <p><span className="font-semibold">Fri-Sat:</span> 11AM - 11PM</p>
              <p><span className="font-semibold">Sun:</span> 12PM - 9PM</p>
              <p className="mt-4 text-sm text-[#8D6E63]">
                *Delivery available until 30 minutes before closing
              </p>
            </div>
          </div>

          {/* Contact Card */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-[#FFA726] text-4xl mb-4">📞</div>
            <h3 className="text-2xl font-bold text-[#2C1810] mb-4">Contact Us</h3>
            <div className="space-y-2 text-[#6B4226]">
              <p>
                <a href="tel:+11234567890" className="hover:text-[#C41E3A] transition-colors">
                  +1 (123) 456-7890
                </a>
              </p>
              <p>
                <a href="mailto:hello@bigfatpizza.com" className="hover:text-[#C41E3A] transition-colors">
                  hello@bigfatpizza.com
                </a>
              </p>
              <div className="mt-4">
                <p className="font-semibold">Follow Us:</p>
                <div className="flex space-x-4 mt-2">
                  <a href="#" className="text-[#6B4226] hover:text-[#C41E3A]">📷 Instagram</a>
                  <a href="#" className="text-[#6B4226] hover:text-[#C41E3A]">📘 Facebook</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Embedded Map */}
        <div className="rounded-2xl overflow-hidden shadow-xl mt-8">
          <iframe
            title="Location Map"
            width="100%"
            height="400"
            loading="lazy"
            allowFullScreen
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086509486874!2d144.9630579153169!3d-37.81410797975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d1f9c8b1e0e9!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1633072871234!5m2!1sen!2sau"
          ></iframe>
        </div>
        <div className="mt-8 text-center bg-[#C41E3A]/10 p-6 rounded-xl">
          <p className="text-[#6B4226] font-semibold">
            🚚 Free delivery within 5km | 🎉 Party platters available | 🍕 Late-night slice window Fri-Sat
          </p>
        </div>
      </div>
    </div>
  );
};

export default HoursLocation;