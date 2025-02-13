import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPizzaSlice } from 'react-icons/fa';
import { testimonials } from '../utils/data-static';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/common/Button';
import Textarea from '@/components/common/Textarea';
import { Input } from '@/components/ui/Input';

const ITEMS_PER_PAGE = 6;

const CustomerTestimonials = () => {
  const [showAll, setShowAll] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({
    name: '',
    rating: 5,
    text: ''
  });

  const displayedTestimonials = showAll
    ? testimonials
    : testimonials.slice(0, ITEMS_PER_PAGE);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    // Handle feedback submission here
    console.log('Feedback submitted:', feedbackForm);
    setShowFeedbackForm(false);
    setFeedbackForm({ name: '', rating: 5, text: '' });
  };

  return (
    <section className="bg-[#fff9f0] py-8 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-[#C41E3A] mb-4 font-pacifico">
            Don't Take Our Word For It
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            See what our pizza lovers are saying
          </p>
          <Button
            onClick={() => setShowFeedbackForm(true)}
            className="bg-[#C41E3A] hover:bg-[#A3172D] text-white"
          >
            Share Your Experience
          </Button>
        </div>

        {/* Feedback Form Modal */}
        <AnimatePresence>
          {showFeedbackForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl p-6 max-w-lg w-full"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Share Your Feedback</h3>
                <form onSubmit={handleSubmitFeedback} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <Input
                      type="text"
                      value={feedbackForm.name}
                      onChange={(e) => setFeedbackForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rating
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => setFeedbackForm(prev => ({ ...prev, rating }))}
                          className={`p-2 rounded-full transition-colors ${feedbackForm.rating >= rating
                            ? 'text-[#FFA726]'
                            : 'text-gray-300'
                            }`}
                        >
                          <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Experience
                    </label>
                    <Textarea
                      value={feedbackForm.text}
                      onChange={(e) => setFeedbackForm(prev => ({ ...prev, text: e.target.value }))}
                      className="w-full h-32"
                      required
                    />
                  </div>
                  <div className="flex gap-4 justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowFeedbackForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-[#C41E3A] hover:bg-[#A3172D] text-white"
                    >
                      Submit Feedback
                    </Button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence>
            {displayedTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                layout
                className="h-full"
              >
                <Card className="h-full bg-white hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
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
                    <p className="text-gray-700 mb-4 leading-relaxed line-clamp-4 hover:line-clamp-none transition-all">
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
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More/Less Button */}
        {testimonials.length > ITEMS_PER_PAGE && (
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              onClick={() => setShowAll(!showAll)}
              variant="outline"
              className="bg-white hover:bg-gray-50"
            >
              {showAll ? 'Show Less' : 'Load More'}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CustomerTestimonials;