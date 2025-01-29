import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const textVariant = (delay = 0) => ({
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 10,
        delay
      }
    }
  });

  return (
    <section
      ref={ref}
      className="hero-section relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="/hero.jpg"
        >
          <source src="/background.mp4" type="video/mp4" />
          <source src="/background.webm" type="video/webm" />
          <img src="/hero.jpg" alt="Artisanal pizza preparation" className="w-full h-full object-cover" />
        </video>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2C1810]/90 via-[#FF4C4C]/60 to-[#FFA726]/50 mix-blend-multiply z-10" />

      {/* Content Container */}
      <div className="relative z-20 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <motion.div
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            variants={staggerContainer}
            className="lg:w-1/2 text-center lg:text-left"
          >
            <motion.h2
              variants={textVariant()}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
              style={{ fontFamily: 'Pacifico, cursive' }}
            >
              <span className="text-[#FFA726] block mb-4">Artisanal Pizza</span>
              <span className="text-4xl md:text-5xl font-serif font-medium">Crafted with Passion</span>
            </motion.h2>

            <motion.p
              variants={textVariant(0.2)}
              className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Experience authentic Italian flavors with our wood-fired masterpieces.
              Made from scratch daily using locally-sourced ingredients and traditional recipes.
            </motion.p>

            <motion.div
              variants={textVariant(0.4)}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                to="/menu"
                className="button-glow bg-[#FF4C4C] hover:bg-[#FF3333] text-white text-lg font-semibold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105"
              >
                Explore Menu
              </Link>
              <Link
                to="/about"
                className="border-2 border-white hover:border-[#FFA726] text-white hover:text-[#FFA726] text-lg font-semibold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105"
              >
                Our Story
              </Link>
            </motion.div>
          </motion.div>

          {/* Pizza Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:w-1/2 relative"
          >
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="relative"
            >
              <img
                src="/hero.jpg"
                alt="Signature Pizza"
                className="w-full max-w-xl mx-auto rotate-[-5deg] shadow-2xl border-8 border-white/20 rounded-[40px]"
              />
              <motion.div
                animate={{ rotate: [0, -15, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute -top-6 -right-6 bg-white/10 p-3 rounded-full backdrop-blur-sm shadow-lg"
              >
                <span className="text-xl font-bold text-[#FFA726]">🔥 Hot!</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;