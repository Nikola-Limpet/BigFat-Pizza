import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <div className="hero-section h-[720px] relative flex flex-col md:flex-row items-center justify-between p-8 mb-6 rounded-lg shadow-lg">
      {/* Left Section */}
      <div className="md:w-1/2 text-center pt-2 mt-0 md:text-left">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl mb-8"
          style={{ fontFamily: 'Pacifico, cursive' }}
        >
          BIG Fat Pizza
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl font-serif font-light text-lime-800/90 my-6 pl-4 border-l-4 border-[#33670a]"
        >
          at Big Fat
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg mb-6 leading-relaxed"
        >
          Discover your personalized Mediterranean experience at Big Fat.
          Place your order or explore past orders with ease. Our dedicated team
          ensures every detail is perfect for your needs.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col md:flex-row gap-4"
        >
          {/* Order Button */}
          <Link
            to="/order"
            className=" button-Order text-2xl rounded-md transition duration-300 "
          >
            Order
          </Link>
          {/* Past Order Button */}
          <Link
            to="/checkout"
            className="button-Order text-2xl rounded-md transition duration-300"
          >
            Past Order
          </Link>
        </motion.div>
      </div>

      {/* Right Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="md:w-1/2 mt-8 md:mt-0"
      >
        <div className="">
          <div className="absolute bottom-[60px]  right-[60px]  flex items-center justify-center">
            <img
              src="https://www.1112.com/_next/image?url=%2Fimages%2Fbanners%2Flogin-banner.png&w=1920&q=75"
              alt="Banner"
              className="w-[500px] h-[600px] rounded-lg shadow-lg"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;