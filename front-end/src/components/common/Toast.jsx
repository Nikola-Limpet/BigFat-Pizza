import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle, Pizza } from 'lucide-react';

const toastTypes = {
  success: {
    icon: CheckCircle,
    className: 'bg-emerald-50 border-l-emerald-400 text-emerald-800',
  },
  error: {
    icon: AlertCircle,
    className: 'bg-rose-50 border-l-rose-400 text-rose-800',
  },
  info: {
    icon: Info,
    className: 'bg-sky-50 border-l-sky-400 text-sky-800',
  },
  orderSuccess: {
    icon: Pizza,
    className: 'bg-orange-50 border-l-orange-400 text-orange-800',
  }
};
const Toast = ({ message, type = 'info', onClose }) => {
  const { icon: Icon, className } = toastTypes[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, x: 100 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: -20, x: 100 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`
        fixed top-4 right-4 md:top-6 md:right-8 z-50 
        flex items-start gap-4 
        px-9 py-7 rounded-lg border-l-8
        shadow-xl max-w-lg md:max-w-md
        font-[Poppins] backdrop-blur-sm
        ${className}
      `}
    >
      {/* Icon Container */}
      <div className="relative mt-0.5">
        <Icon className="w-6 h-6 flex-shrink-0 stroke-[1.5]" />
        {type === 'orderSuccess' && (
          <div className="absolute -right-1 -bottom-1 bg-white rounded-full p-0.5">
            <div className="w-4 h-4 bg-[#FFA726] rounded-full flex items-center justify-center">
              <span className="text-white text-[10px]">🍕</span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1">
        <p className="text-sm md:text-base leading-snug pr-4">
          {type === 'orderSuccess' && (
            <span className="text-xl mr-2">🎉</span>
          )}
          {message}
        </p>

        {/* Progress Bar (for auto-dismiss) */}
        {type !== 'error' && (
          <motion.div
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 5, ease: "linear" }}
            className="absolute bottom-0 left-0 right-0 h-1 bg-current opacity-10 origin-left"
          />
        )}
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="p-1.5 -m-1.5 hover:bg-black/5 rounded-full transition-colors"
        aria-label="Close notification"
      >
        <X className="w-5 h-5 opacity-70 hover:opacity-100 transition-opacity" />
      </button>
    </motion.div>
  );
};

export default Toast;