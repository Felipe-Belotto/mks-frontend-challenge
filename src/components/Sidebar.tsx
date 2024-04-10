import { CartContext } from '@/context/CartContext';
import React, { Fragment, useContext } from 'react'

export default function Sidebar() {
  const { cartList, CloseCart, cartOpen } = useContext(CartContext);
  return (
    <section className="fixed top-0 right-0 z-10 h-screen w-1/6 bg-[#1252b6] shadow-md transition-transform duration-300 transform translate-x-0 flex flex-col justify-between">
      <div>
      <div className='flex justify-between p-8'>
      <h1 className='text-[28px] font-bold text-white w-[180px] leading-8'>Carrinho de compras</h1>
        <button onClick={CloseCart} className='w-10 h-10 rounded-full bg-black text-white text-xl flex justify-center items-center leading-none '>X</button>
      </div>
      </div>

      <button className='bg-black text-white w-full h-[100px] text-[28px] font-bold'>Finalizar Compra</button>
</section>
  )
}
