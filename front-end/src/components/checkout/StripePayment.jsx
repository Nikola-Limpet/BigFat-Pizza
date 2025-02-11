// // StripePayment.jsx
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import { motion } from 'framer-motion';
// import CheckoutForm from './CheckoutForm';

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// const StripePayment = ({ onPaymentSuccess, onBack }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, x: 50 }}
//       animate={{ opacity: 1, x: 0 }}
//       className="max-w-2xl mx-auto"
//     >
//       <Elements stripe={stripePromise}>
//         <CheckoutForm
//           onSuccess={onPaymentSuccess}
//           onBack={onBack}
//         />
//       </Elements>
//     </motion.div>
//   );
// };

// export default StripePayment;