import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const toastTypes = {
  success: {
    icon: CheckCircle,
    className: 'bg-green-50 border-green-500 text-green-800',
  },
  error: {
    icon: AlertCircle,
    className: 'bg-red-50 border-[#C41E3A] text-[#C41E3A]',
  },
  info: {
    icon: Info,
    className: 'bg-blue-50 border-blue-500 text-blue-800',
  },
  warning: {
    icon: AlertTriangle,
    className: 'bg-yellow-50 border-[#FFA726] text-[#6B4226]',
  },
};

const Toast = ({ message, type = 'info', onClose }) => {
  const { icon: Icon, className } = toastTypes[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-lg border shadow-lg max-w-md ${className}`}
    >
      <Icon className="w-5 h-5 mr-3" />
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="ml-4 p-1 hover:bg-black/10 rounded-full transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export default Toast;