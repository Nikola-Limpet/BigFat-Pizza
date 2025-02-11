import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Label } from '@/components/common/Label';

const addressSchema = z.object({
  street: z.string().min(5, 'Street must be at least 5 characters'),
  city: z.string().min(3, 'City must be at least 3 characters'),
  deliveryTime: z.string().refine((value) => {
    const selectedDate = new Date(value);
    const now = new Date();
    const minTime = new Date(now.getTime() + 30 * 60000); // 30 minutes from now
    const maxTime = new Date(now.getTime() + 7 * 24 * 60 * 60000); // 7 days from now

    return selectedDate >= minTime && selectedDate <= maxTime;
  }, 'Please select a time between 30 minutes and 7 days from now')
});

const AddressForm = ({ onNext, onBack }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      deliveryTime: (() => {
        const now = new Date();
        now.setMinutes(now.getMinutes() + 30); // Default to 30 minutes from now
        return now.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:mm
      })()
    }
  });

  const onSubmit = (data) => {
    // Handle form submission
    onNext(data);
  };

  // Calculate min and max datetime values
  const minDateTime = (() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30);
    return now.toISOString().slice(0, 16);
  })();

  const maxDateTime = (() => {
    const now = new Date();
    now.setDate(now.getDate() + 7);
    return now.toISOString().slice(0, 16);
  })();

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6"
    >
      <h2 className="text-2xl font-pacifico text-[#C41E3A] mb-6">Delivery Details</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="street">Street Address</Label>
            <Input
              id="street"
              placeholder="Enter your street address"
              {...register('street')}
              className={`w-full ${errors.street ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.street && (
              <p className="text-red-500 text-sm mt-1">{errors.street.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              placeholder="Enter your city"
              {...register('city')}
              className={`w-full ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="deliveryTime">Preferred Delivery Time</Label>
            <Input
              type="datetime-local"
              id="deliveryTime"
              min={minDateTime}
              max={maxDateTime}
              {...register('deliveryTime')}
              className={`w-full ${errors.deliveryTime ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.deliveryTime && (
              <p className="text-red-500 text-sm mt-1">{errors.deliveryTime.message}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">
              Delivery available between 30 minutes and 7 days from now
            </p>
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="bg-gray-100 hover:bg-gray-200"
          >
            Back to Cart
          </Button>
          <Button
            type="submit"
            className="bg-[#C41E3A] hover:bg-[#A3172D] text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Validating...' : 'Continue to Payment'}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddressForm;