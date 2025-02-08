import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Pizza, Wheat, ChefHat } from 'lucide-react';
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
        className="bg-[#FFF5E6] py-20 px-4 md:px-10 overflow-hidden relative 
        bg-pattern-pizza bg-[length:400px] bg-opacity-10"
        style={{ backgroundImage: 'url(/pizza-texture.png)' }}
      >
        <div className="max-w-4xl mx-auto relative">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6B6B] rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFD93D] rounded-full blur-3xl opacity-20" />

          {/* Crust Border Elements */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-[#E8B56D] opacity-60" />
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#E8B56D] opacity-0" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Header Section */}
            <div className="flex flex-col items-center mb-12 space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ type: 'spring', stiffness: 150 }}
                className="mb-4 relative"
              >
                <Pizza className="w-24 h-24 text-[#C41E3A]/90 animate-pulse" />
                <ChefHat className="absolute -bottom-2 -right-4 w-8 h-8 text-amber-700" />
              </motion.div>
              <motion.h2
                variants={textVariants}
                className="text-5xl font-bold text-[#C41E3A] italic font-pacifico
                bg-white px-8 text-center py-4 rounded-full shadow-lg border-4 border-amber-100"
              >
                Our Delicious Story
              </motion.h2>
            </div>

            {/* Content Section */}
            <div className="space-y-8 font-serif text-center relative z-10">
              <motion.div
                variants={textVariants}
                className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-lg
                border-2 border-amber-50"
              >
                <p className="text-2xl text-amber-900 leading-relaxed mb-6">
                  Since 1999, <span className="text-[#C41E3A] font-bold">Big Fat Pizza</span> has been crafting
                  mouthwatering pies that make taste buds dance!
                </p>

                <div className="flex justify-center space-x-4 mb-6">
                  <Wheat className="w-8 h-8 text-amber-700 animate-bounce" />
                  <Pizza className="w-8 h-8 text-[#C41E3A] animate-spin-slow" />
                  <Wheat className="w-8 h-8 text-amber-700 animate-bounce" />
                </div>

                <p className="text-lg font-serif text-amber-800 mb-6">
                  Our secret? A fiery passion for perfection! Each pizza starts with
                  hand-kneaded dough resting for 72 hours, topped with vine-ripened tomatoes
                  and 100% real mozzarella.
                </p>

                <p className="text-lg font-serif text-amber-800 mb-6">
                  From our brick ovens to your table, every pie is a masterpiece crafted
                  with generations of pizza-making wisdom. We don't just make pizza -
                  we create edible happiness!
                </p>

                <p className="text-xl text-[#C41E3A] font-semibold italic">
                  Join our pizza family today and taste the difference tradition makes!
                </p>
              </motion.div>
            </div>

            {/* Floating Ingredients */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="hidden lg:flex justify-between absolute -top-20 left-0 right-0"
            >
              <Pizza className="w-16 h-16 text-amber-700 animate-float" />
              <Pizza className="w-20 h-20 text-[#C41E3A] animate-float-delayed" />
              <Pizza className="w-16 h-16 text-amber-700 animate-float" />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Element>
  );
};

export default About;