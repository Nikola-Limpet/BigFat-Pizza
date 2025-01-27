import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const pizzaOrderSchema = z.object({
  size: z.enum(['small', 'medium', 'large']),
  quantity: z.number().min(1).max(10),
  specialInstructions: z.string().max(200).optional(),
});

export function PizzaForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(pizzaOrderSchema),
    defaultValues: {
      size: 'medium',
      quantity: 1,
      specialInstructions: '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Size</label>
        <select {...register('size')} className="mt-1 block w-full rounded-md border-gray-300">
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
        {errors.size && <p className="text-red-500 text-sm">{errors.size.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Quantity</label>
        <input
          type="number"
          {...register('quantity', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300"
        />
        {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Special Instructions</label>
        <textarea
          {...register('specialInstructions')}
          className="mt-1 block w-full rounded-md border-gray-300"
        />
        {errors.specialInstructions && (
          <p className="text-red-500 text-sm">{errors.specialInstructions.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
      >
        Add to Cart
      </button>
    </form>
  );
}