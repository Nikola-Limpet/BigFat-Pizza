// components/checkout/AddressForm.jsx
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const addressSchema = z.object({
  street: z.string().min(5),
  city: z.string().min(3),
  zipCode: z.string().regex(/^\d{5}(?:[-\s]\d{4})?$/),
  deliveryTime: z.date()
});

const AddressForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(addressSchema)
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields with validation */}
      <button type="submit">Continue to Payment</button>
    </form>
  );
};