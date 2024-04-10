"use client";
import React, { createContext, useEffect, useState } from 'react';

interface Product {
  id: number;
}

export const CartContext = createContext<{ cartList: Product[];  addToCart: (product: Product) => void; removeToCart: (product: Product) => void;  cartOpen: boolean, OpenCart: () => void, CloseCart: () => void }>({
  cartList: [],
  addToCart: () => {},
  removeToCart: () => {},
  cartOpen: false,
  OpenCart: () => {},
  CloseCart: () => {},
});

export const CartProvider = <T extends React.ReactNode>({ children }: { children: T }) => { 
  const [cartList, setCartList] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (product: Product) => {
   
    const isAlreadyInCart = cartList.some((item) => item.id === product.id);
  
    if (!isAlreadyInCart) {
      setCartList([...cartList, product]); 
    }
  };
  

  const removeToCart = (id: Product) => {
    setCartList(cartList.filter((product) => product.id !== id.id));
  };

  function OpenCart () {
    setCartOpen(true);
  }

  function CloseCart () {
    setCartOpen(false);
  }


  return (
    <CartContext.Provider value={{cartList, addToCart,removeToCart, cartOpen, OpenCart, CloseCart}}>
      {children}
    </CartContext.Provider>
  );
};
