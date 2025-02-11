import { createSlice } from '@reduxjs/toolkit';
import { loadCartFromStorage, saveCartToStorage } from '@/utils/cartStorage';
const initialState = loadCartFromStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = {
        ...action.payload,
        uniqueId: `${action.payload.id}-${
          action.payload.size?.name || 'base'
        }-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      };

      const existingItem = state.items.find(
        (i) =>
          i.uniqueId === item.uniqueId &&
          JSON.stringify(i.toppings) === JSON.stringify(item.toppings)
      );

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.items.push(item);
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.uniqueId !== action.payload
      );
    },

    updateQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.uniqueId === action.payload.uniqueId
      );
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
      }
    },
    saveForLater: (state, action) => {
      const item = state.items.find((item) => item.uniqueId === action.payload);
      if (item) {
        state.savedItems.push(item);
        state.items = state.items.filter(
          (item) => item.uniqueId !== action.payload
        );
      }
    },
    moveToCart: (state, action) => {
      const item = state.savedItems.find(
        (item) => item.uniqueId === action.payload
      );
      if (item) {
        state.items.push(item);
        state.savedItems = state.savedItems.filter(
          (item) => item.uniqueId !== action.payload
        );
      }
    },
    updateSpecialInstructions: (state, action) => {
      const item = state.items.find(
        (item) => item.uniqueId === action.payload.uniqueId
      );
      if (item) {
        item.specialInstructions = action.payload.instructions;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    rehydrate: (state, action) => {
      return {
        ...state,
        items: Array.isArray(action.payload.items) ? action.payload.items : [],
        savedItems: Array.isArray(action.payload.savedItems)
          ? action.payload.savedItems
          : [],
      };
    },
  },
});

// MiddleWare to persist cart state

export const cartPersistMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  if (action.type?.startsWith('cart/')) {
    const { cart, auth } = store.getState();
    const userId = auth.user?.id;

    // Don't save empty carts
    if (cart.items.length > 0 || cart.savedItems.length > 0) {
      saveCartToStorage(cart, userId);
    }
  }

  return result;
};

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  saveForLater,
  updateSpecialInstructions,
  moveToCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
