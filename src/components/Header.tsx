"use client";
import { CartContext } from '@/context/CartContext';
import React, { useContext, useEffect, useState } from 'react';

export default function Header() {
  const [productAdd, setProductAdd] = useState(false);
  const { cartList, OpenCart, cartOpen } = useContext(CartContext);

  useEffect(() => {
    if (cartList.length > 0) {
      setProductAdd(true);
      const timeout = setTimeout(() => {
        setProductAdd(false);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [cartList]);

  function handleClick() {
    setTimeout(() => {
      OpenCart();
    }, 200);
      
  }

  return (
    <header className='w-full bg-[#1252b6] h-[100px] flex justify-center  items-center p-2  md:px-6 lg:px-16 lg:py-0'>
      <div className='w-full flex items-center justify-between 2xl:w-[1440px]'>
        <div className='flex gap-2 text-white'>
          <h1 className='text-[40px] font-semibold'>MKS</h1>
          <p className='text-[20px] flex place-items-center font-light'>Sistemas</p>
        </div>
        {cartOpen? "" : productAdd ? (
          <button className='bg-white text-green-500 flex px-4 py-3 gap-4 rounded-lg w-[90px] max-h-[45x] cursor-pointer active:bg-slate-100'>
          <img  src='/icons/cart.svg' alt='cart icon' />
          {cartList.length}
        </button>
        ) : (
          <button onClick={handleClick} className='bg-white flex px-4 py-3 gap-4 rounded-lg  max-h-[45x] cursor-pointer active:bg-slate-100 transition-all duration-500'>
            <img src='/icons/cart.svg' alt='cart icon' />
            {cartList.length}
          </button>
        )}
      </div>
    </header>
  );
}
