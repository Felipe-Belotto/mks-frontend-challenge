"use client";
import React, { createContext, useState } from 'react';

interface Product {
  id: number;
}

export const CartContext = createContext<{ cartList: Product[]; addToCart: (product: Product) => void }>({
  cartList: [],
  addToCart: () => {},
});

export const CartProvider = <T extends React.ReactNode>({ children }: { children: T }) => { // Define children type as React.ReactNode
  const [cartList, setCartList] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (id: Product) => {
    setCartList([...cartList, id]);
  };

  function OpenCart () {
    setCartOpen(true);
  }

  function CloseCart () {
    setCartOpen(false);
  }

  return (
    <CartContext.Provider value={{cartList, addToCart, cartOpen, OpenCart, CloseCart}}>
      {children}
    </CartContext.Provider>
  );
};
