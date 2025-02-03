import React from 'react';
import { Element } from 'react-scroll';
import { motion } from 'framer-motion';

const Book = () => {
  return (
    <Element name="book-section">
      <section className="relative min-h-screen bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/PizzaTable.jpg')" }}>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-pacifico">
                <span className="text-[#FFA726]">Reserve</span> Your Table
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Experience the authentic taste of Italy in our cozy pizzeria.
                Book your table now for an unforgettable dining experience!
              </p>
            </div>

            {/* Booking Form */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 lg:p-12 max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column - Form */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-[#C41E3A] font-medium mb-2">Your Name</label>
                    <input
                      type="text"
                      className="w-full p-3 rounded-lg border-2 border-[#FFA726]/30 focus:border-[#C41E3A] focus:ring-2 focus:ring-[#C41E3A]/20"
                      placeholder="Mario Rossi"
                    />
                  </div>

                  <div>
                    <label className="block text-[#C41E3A] font-medium mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full p-3 rounded-lg border-2 border-[#FFA726]/30 focus:border-[#C41E3A] focus:ring-2 focus:ring-[#C41E3A]/20"
                      placeholder="mario@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-[#C41E3A] font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      className="w-full p-3 rounded-lg border-2 border-[#FFA726]/30 focus:border-[#C41E3A] focus:ring-2 focus:ring-[#C41E3A]/20"
                      placeholder="+39 123 456 789"
                    />
                  </div>
                </div>

                {/* Right Column - Date/Time */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-[#C41E3A] font-medium mb-2">Date</label>
                    <input
                      type="date"
                      className="w-full p-3 rounded-lg border-2 border-[#FFA726]/30 focus:border-[#C41E3A] focus:ring-2 focus:ring-[#C41E3A]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-[#C41E3A] font-medium mb-2">Time</label>
                    <select
                      className="w-full p-3 rounded-lg border-2 border-[#FFA726]/30 focus:border-[#C41E3A] focus:ring-2 focus:ring-[#C41E3A]/20"
                    >
                      <option>18:00</option>
                      <option>18:30</option>
                      <option>19:00</option>
                      <option>19:30</option>
                      <option>20:00</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#C41E3A] font-medium mb-2">Party Size</label>
                    <select
                      className="w-full p-3 rounded-lg border-2 border-[#FFA726]/30 focus:border-[#C41E3A] focus:ring-2 focus:ring-[#C41E3A]/20"
                    >
                      <option>2 people</option>
                      <option>3-4 people</option>
                      <option>5-6 people</option>
                      <option>7+ people</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <button className="w-full py-4 bg-[#C41E3A] hover:bg-[#A3172D] text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105">
                  Reserve Table Now
                  <span className="ml-2">🍕</span>
                </button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-8 text-center text-white/90">
              <p className="text-lg">
                For large groups or special events, call us directly:<br />
                <a href="tel:+11234567890" className="text-[#FFA726] hover:text-[#FFD700] font-bold">
                  +1 (123) 456-7890
                </a>
              </p>
              <p className="mt-4 text-sm">
                Open daily from 11:00 AM - 11:00 PM
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </Element>
  );
};

export default Book;