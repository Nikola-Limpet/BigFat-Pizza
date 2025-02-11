export const saveCartToStorage = (cart, userId) => {
  try {
    const key = userId ? `cart_${userId}` : 'guestCart';
    const existingCartJSON = localStorage.getItem(key);
    let existingCart = { items: [], savedItems: [] };

    if (existingCartJSON) {
      try {
        existingCart = JSON.parse(existingCartJSON);
      } catch (e) {
        console.error('Error parsing existing cart:', e);
      }
    }

    const cartToSave = {
      items: cart.items || existingCart.items,
      savedItems: cart.savedItems || existingCart.savedItems,
      lastUpdated: Date.now(),
    };

    localStorage.setItem(key, JSON.stringify(cartToSave));
    return true;
  } catch (error) {
    console.error('Error saving cart:', error);
    return false;
  }
};

export const loadCartFromStorage = (userId) => {
  try {
    const key = userId ? `cart_${userId}` : 'guestCart';
    const savedCart = localStorage.getItem(key);

    if (!savedCart) return { items: [], savedItems: [] };

    const parsedCart = JSON.parse(savedCart);

    // Validate and merge with existing data
    const validatedCart = {
      items: Array.isArray(parsedCart.items)
        ? parsedCart.items.filter((item) => item && item.uniqueId)
        : [],
      savedItems: Array.isArray(parsedCart.savedItems)
        ? parsedCart.savedItems.filter((item) => item && item.uniqueId)
        : [],
      lastUpdated: parsedCart.lastUpdated || Date.now(),
    };

    return validatedCart;
  } catch (error) {
    console.error('Error loading cart:', error);
    return { items: [], savedItems: [] };
  }
};

export const updateCartItem = (userId, itemUpdate) => {
  try {
    const cart = loadCartFromStorage(userId);
    const itemIndex = cart.items.findIndex(
      (item) => item.uniqueId === itemUpdate.uniqueId
    );

    if (itemIndex !== -1) {
      cart.items[itemIndex] = { ...cart.items[itemIndex], ...itemUpdate };
    }

    saveCartToStorage(cart, userId);
    return true;
  } catch (error) {
    console.error('Error updating cart item:', error);
    return false;
  }
};

export const clearUserCart = (userId) => {
  try {
    if (userId) {
      localStorage.removeItem(`cart_${userId}`);
    }
    localStorage.removeItem('guestCart');
  } catch (error) {
    console.error('Error clearing cart:', error);
  }
};
