import React from 'react';
import { motion } from 'framer-motion';
import { benefits } from '../utils/data-static';

// Container variant for staggering children (no bounce here)
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 }
  }
};

// Variant for fading and sliding up text with a spring (bounce) effect
const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      duration: 0.8,
      ease: 'easeOut'
    }
  },
};

// Variant for the image: slide in from right with a spring bounce effect
const imageSlideVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      duration: 1,
      ease: 'easeOut'
    }
  },
};

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left Column: Text Content */}
          <div className="flex-1">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUpVariants}
              className="mb-8"
            >
              <h2 className="text-4xl md:text-4xl font-extrabold text-gray-800">
                Why Choose Big Fat Pizza?
              </h2>
              <p className="mt-4 text-xl text-gray-600">
                We’re not just making pizza – we’re crafting an experience that transports you straight to Italy.
              </p>
            </motion.div>

            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={containerVariants}
              className="space-y-6"
            >
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  variants={fadeUpVariants}
                  className="flex items-start bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                  whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                >
                  <div className="flex-shrink-0 text-4xl text-lime-600 mr-4">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800">
                      {benefit.title}
                    </h3>
                    <p className="mt-1 text-gray-600">
                      {benefit.content}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUpVariants}
              className="mt-10 border-l-4  border-lime-600 pl-5"
            >

              <blockquote className="italic text-xl text-dark">
                "Every pizza is a masterpiece – crafted with love, served with pride, and guaranteed to bring you back for more!"
              </blockquote>
              <p className="mt-2 font-semibold text-gray-800">
                - The Big Fat Pizza Team
              </p>
            </motion.div>
          </div>

          {/* Right Column: Image */}
          <div className="flex-1 flex justify-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={imageSlideVariants}
            >
              <img
                src="/pizza-icons-fade.svg"
                alt="Delicious Big Fat Pizza"
                className="rounded-lg shadow-lg max-w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
