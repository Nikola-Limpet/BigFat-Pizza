import { useSelector } from 'react-redux';

export const useCartItemCount = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );
  return cartItemCount;
};

export const useCartItemPrice = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return cartItemPrice;
};
