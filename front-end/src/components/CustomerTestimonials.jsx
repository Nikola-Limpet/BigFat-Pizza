import { testimonials } from '../utils/data-static';
import { motion } from 'framer-motion';
import { FaPizzaSlice } from 'react-icons/fa';

const CustomerTestimonials = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="bg-[#fff9f0] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="items-center mb-12">
          <h2 className="text-4xl md:text-5xl text-center ml-20 font-bold text-[#C41E3A] mb-4 font-pacifico">
            Don't Take Our Word For It
          </h2>
          <p className="text-xl text-center text-gray-600">
            See what our pizza lovers are saying
          </p>
        </div>
        {/* Testimonial Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-[#FFA726] fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              {/* Testimonial Text */}
              <p className="text-gray-700 mb-4 leading-relaxed">
                {testimonial.text}
              </p>
              {/* User Info */}
              <div className="flex items-center mt-4">
                <div className="bg-[#C41E3A]/10 p-2 rounded-full">
                  <FaPizzaSlice className="text-2xl text-[#C41E3A]" />
                </div>
                <div className="ml-4">
                  <p className="font-bold text-gray-800">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.handle}</p>
                </div>
              </div>
              {/* Date */}
              <p className="text-sm text-gray-500 mt-4">{testimonial.date}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerTestimonials;