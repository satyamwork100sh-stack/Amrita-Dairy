import React, { createContext, useContext, useState, useEffect } from 'react';
import { brand } from '../config/brand';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { showToast } = useToast();
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('amritadairy_cart') || localStorage.getItem('dairyfresh_cart');
      return saved ? JSON.parse(saved) : [
        {
          product: {
            id: "prod-1",
            name: "Pure A2 Cow Milk",
            category: "milk",
            categoryName: "Milk",
            price: 75,
            originalPrice: 85,
            unit: "1 Litre",
            image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80"
          },
          quantity: 2
        }
      ];
    } catch {
      return [];
    }
  });

  // Save to local storage whenever cart changes
  useEffect(() => {
    try {
      localStorage.setItem('amritadairy_cart', JSON.stringify(items));
    } catch (e) {
      console.warn('Storage quota error:', e);
    }
  }, [items]);

  const addToCart = (product, quantity = 1, silent = false) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    if (!silent) {
      showToast(`Added ${product.name} to cart`);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    const item = items.find((i) => i.product.id === productId);
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
    if (item) {
      showToast(`Removed ${item.product.name} from cart`, 'info');
    }
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const isFreeDelivery = cartSubtotal >= brand.freeDeliveryThreshold;
  const deliveryCharge = cartSubtotal === 0 ? 0 : isFreeDelivery ? 0 : brand.defaultDeliveryFee;
  const freeDeliveryRemaining = Math.max(0, brand.freeDeliveryThreshold - cartSubtotal);
  const finalTotal = cartSubtotal + deliveryCharge;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        deliveryCharge,
        isFreeDelivery,
        freeDeliveryRemaining,
        finalTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    return {
      items: [],
      addToCart: () => {},
      updateQuantity: () => {},
      removeFromCart: () => {},
      clearCart: () => {},
      cartCount: 0,
      cartSubtotal: 0,
      deliveryCharge: 0,
      isFreeDelivery: true,
      freeDeliveryRemaining: 0,
      finalTotal: 0
    };
  }
  return context;
};

