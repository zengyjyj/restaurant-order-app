
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});

  const addToCart = (item) => {
    setCart((prev) => ({
      ...prev,
      [item.name]: {
        ...item,
        quantity: prev[item.name] ? prev[item.name].quantity + 1 : 1,
      },
    }));
  };

  const removeFromCart = (item) => {
    setCart((prev) => {
      if (!prev[item.name]) return prev;

      const updatedQty = prev[item.name].quantity - 1;

      if (updatedQty <= 0) {
        const { [item.name]: _, ...rest } = prev;
        return rest;
      }

      return {
        ...prev,
        [item.name]: {
          ...prev[item.name],
          quantity: updatedQty,
        },
      };
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
