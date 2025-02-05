import { createSlice } from '@reduxjs/toolkit';

// features save for later use local storage
const localCartFromStorage = () => {
  try {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : { items: [], savedItems: [] };
  } catch {
    return { items: [], savedItems: [] };
  }
};

const initialState = localCartFromStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    updateQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity); // prevent negative number
      }
    },
    saveForLater: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        state.savedItems.push(item);
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
    moveToCart: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        state.items.push(item);
        state.savedItems.filter((item) => item.id !== action.payload);
      }
    },
    updateSpecialInstructions: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.specialInstructions = action.payload.instructions;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

// MiddleWare to persist cart state
export const cartPersistMiddleWare = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type?.startsWith('/cart')) {
    const state = store.getState().cart;
    localStorage.setItem('cart', JSON.stringify(state));
  }
  return result;
};

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  saveForLater,
  moveToc,
} = cartSlice.actions;
export default cartSlice.reducer;
