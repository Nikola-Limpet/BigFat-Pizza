import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Pizza } from 'lucide-react';
import { Element } from 'react-scroll';

const About = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <Element name="about-section">
      <section
        ref={containerRef}
        className="bg-gradient-to-r from-[#FFF5E6] to-white py-20 px-4 md:px-20 overflow-hidden relative"
      >
        <div className="max-w-5xl mx-auto relative">
          {/* Decorative Background Circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-200 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-200 rounded-full blur-3xl opacity-20" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Icon and Title */}
            <div className="flex flex-col items-center mb-12">
              <motion.div
                initial={{ rotate: 0 }}
                animate={isInView ? { rotate: 360 } : {}}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="mb-4"
              >
                <Pizza className="w-24 h-24 text-teal-700" />
              </motion.div>
              <motion.h2
                variants={textVariants}
                className="text-4xl md:text-5xl pl-32 font-bold text-teal-700 text-center"
              >
                Our Story
              </motion.h2>
            </div>

            {/* Story Text */}
            <div className="space-y-8 font-serif text-center">
              <motion.p variants={textVariants} className="text-gray-700 text-xl leading-relaxed max-w-2xl mx-auto">
                Welcome to Big Fat Pizza – where passion meets the plate.
              </motion.p>
              <motion.p variants={textVariants} className="text-gray-700 text-xl leading-relaxed max-w-3xl mx-auto">
                Our journey began over two decades ago with a simple belief: great food has the power to bring people together. Inspired by family recipes and local traditions, we set out to create not just a restaurant, but a community hub where everyone feels at home.
              </motion.p>
              <motion.p variants={textVariants} className="text-gray-700 text-xl leading-relaxed max-w-4xl mx-auto">
                At Big Fat Pizza, every pizza is a work of art crafted with the freshest ingredients, hand-tossed dough, and a dash of love. Our menu is a celebration of bold flavors and creative combinations designed to delight your taste buds.
              </motion.p>
              <motion.p variants={textVariants} className="text-gray-700 text-xl leading-relaxed max-w-5xl mx-auto">
                Join us on this delicious journey. Whether you're here for a quick bite or a family dinner, we promise an experience that's as delightful as our signature pizzas. Thank you for being a part of our story!
              </motion.p>
            </div>

            {/* Decorative Side Icons */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={isInView ? { opacity: 0.1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute hidden lg:block left-0 top-1/2 transform -translate-y-1/2"
            >
              <Pizza className="w-24 h-24 text-teal-700" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={isInView ? { opacity: 0.1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute hidden lg:block right-0 top-1/2 transform -translate-y-1/2"
            >
              <Pizza className="w-24 h-24 text-teal-700" />
            </motion.div>

          </motion.div>
        </div>
      </section>
    </Element>
  );
};

export default About;