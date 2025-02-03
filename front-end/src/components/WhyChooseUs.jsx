import { motion } from 'framer-motion';
import { benefits } from '../utils/data-static';

const WhyChooseUs = () => {


  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, staggerChildren: 0.2 } },
  };

  const benefitVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="why-choose-us py-10 bg-[#FFF5E6] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-50 bg-[url('/download.jpg')] bg-repeat"></div>
      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center mb-16"
        >
          <div className="mb-8">
            <img
              src="/logo.jpg"
              alt="Authentic Pizza"
              className="h-32 w-32 object-contain"
            />
          </div>
          <h2 className="text-5xl md:text-5xl font-bold text-[#C41E3A] mb-4 font-pacifico text-center">
            Why Big Fat Pizza?
          </h2>
          <p className="text-xl text-[#4c3423] max-w-2xl text-center mb-8">
            We're not just making pizza - we're crafting experiences that taste like Italy!
          </p>
        </motion.div>
        {/* Benefits Grid */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 m-1 grid-auto-rows-min"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={benefitVariants}
              className={`p-8 rounded-2xl ${benefit.color} transition-all duration-300 hover:translate-y-[-5px] shadow-md hover:shadow-lg`}
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-2xl font-bold text-[#2C1810] mb-3">
                {benefit.title}
              </h3>
              <p className="text-[#4c3423] text-xl font-medium leading-relaxed">
                {benefit.content}
              </p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 text-center bg-[#C41E3A]/60 p-8 rounded-2xl border-2 border-[#C41E3A]/20"
        >
          <p className="text-2xl italic text-[#4c3423]">
            "Every pizza is a masterpiece - crafted with love, served with pride,
            and guaranteed to make you come back for more!"
          </p>
          <p className="mt-4 font-extrabold text-[#69101f]">
            - The Big Fat Pizza Team
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default WhyChooseUs;