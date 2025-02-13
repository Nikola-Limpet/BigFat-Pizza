import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const slides = [
    "images/menu/c&t.bmp",
    "images/menu/post2.jpg",
    "images/menu/post3.jpeg",
    "images/menu/post4.png"
  ];

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

  const slideVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  return (
    <section
      ref={ref}
      className="relative h-screen min-h-[600px] md:min-h-[800px] flex items-center justify-center overflow-hidden"
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
          <source src="/video.mp4" type="video/mp4" />
          <source src="/background.webm" type="video/webm" />
          <img src="/hero.jpg" alt="Artisanal pizza preparation" className="w-full h-full object-cover" />
        </video>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2C1810]/90 via-[#FF4C4C]/60 to-[#FFA726]/50 mix-blend-multiply z-10" />

      {/* Content Container */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex flex-col lg:flex-row items-center justify-between h-full gap-8 md:gap-12">
          {/* Text Content - Left Half */}
          <motion.div
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            variants={staggerContainer}
            className="lg:w-1/2 text-center lg:text-left"
          >
            <motion.h2
              variants={textVariant()}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6"
              style={{ fontFamily: 'Pacifico, cursive' }}
            >
              <span className="text-[#FFA726] block my-2 sm:mb-4 text-3xl sm:text-4xl md:text-5xl">
                Artisanal Pizza
              </span>
              <span className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium">
                Crafted with Passion
              </span>
            </motion.h2>

            <motion.p
              variants={textVariant(0.2)}
              className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Experience authentic Italian flavors with our wood-fired masterpieces.
              Made from scratch daily using locally-sourced ingredients and traditional recipes.
            </motion.p>

            <motion.div
              variants={textVariant(0.4)}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <Link
                to="/menu"
                className="button-glow bg-[#FF4C4C] hover:bg-[#FF3333] text-white text-sm sm:text-base font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-full transition-all duration-300 hover:scale-105"
              >
                Explore Menu
              </Link>
              <ScrollLink
                to="about-section"
                smooth={true}
                duration={600}
                className="cursor-pointer border-2 border-white hover:border-[#FFA726] text-white hover:text-[#FFA726] text-sm sm:text-base font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-full transition-all duration-300 hover:scale-105"
              >
                Our Story
              </ScrollLink>
            </motion.div>
          </motion.div>

          {/* Image Carousel - Right Half */}
          <div className="lg:w-1/2 lg:h-[720px] md:h-full relative flex items-center justify-center">
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentSlide}
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="relative w-full h-full max-w-[600px] mx-auto"
              >
                <img
                  src={slides[currentSlide]}
                  alt="Featured pizza"
                  className="w-full h-full object-contain lg:object-cover rounded-xl shadow-2xl border-4 border-white/20"
                />
              </motion.div>
            </AnimatePresence>

            {/* Pagination Controls */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-30">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-[#FFA726] w-6' : 'bg-white/50 hover:bg-white/70'
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;