import { CartContext } from '@/context/CartContext';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import CartCard from './CartCard';
import apiProducts from '@/functions/apiProducts';
import formatPrice from '@/functions/formatPrice';

interface CartItem {
  name: string;
  photo: string;
  price: number;
  id: number;
}

export default function Sidebar() {
  const { cartList, CloseCart, cartOpen } = useContext(CartContext);
  const [productsList, setProductsList] = useState<CartItem[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);

 
  useEffect(() => {
    apiProducts()
      .then((dados) => {
        setProductsList(dados as CartItem[]);
      })
      .catch((erro) => {
        console.error('Erro ao obter produtos:', erro);
      });
  }, []);

  useEffect(() => {
    const productsIds = cartList.map((product) => product.id);
    const selectedProducts = productsList.filter((product) => productsIds.includes(product.id));
    setSelectedProducts(selectedProducts);
  }, [productsList, cartList]);

  useEffect(()=> {
    setTotal(selectedProducts.reduce((acc, item) => Number(acc) + Number(item.price), 0))
    console.log(selectedProducts)
  }),[selectedProducts]

  function priceChange(id: number, newPrice:number) {
    const item = selectedProducts.find((item) => item.id === id);
    if (item) {
      item.price = Number(newPrice);
      setTotal(selectedProducts.reduce((acc, item) => Number(acc) + Number(item.price), 0));
    }
  }
  

  return (
    <section className="fixed top-0 right-0 z-10 w-full h-full min-h-screen lg:w-[500px] bg-[#1252b6] shadow-md transition-transform duration-300 transform translate-x-0 flex flex-col justify-between  overflow-y-auto 2xl:h-screen 2xl:overflow-hidden">
      <div className='flex flex-col '>
        <div className="flex justify-between p-4 lg:px-8 lg:pt-6 lg:pb-2">
          <h1 className="text-[28px] font-bold text-white w-[180px] leading-8">Carrinho de compras</h1>
          <button onClick={CloseCart} className="w-10 h-10 rounded-full bg-black text-white text-xl flex justify-center items-center leading-none">X</button>
        </div>
        
        <div className="flex flex-col items-center gap-2 lg:gap-1 px-4  h-auto  lg:px-8 ">
          {selectedProducts.map((item) => (
            <CartCard
              name={item.name}
              image={item.photo}
              price={item.price}
              key={item.id}
              id={item.id}
              priceChange={priceChange}
            />
          ))}
        </div>
      </div>

      <div className='flex flex-col justify-between'>
        <div className='flex justify-between text-white font-bold px-4 py-3 mt-8 lg:px-8 lg:py-4 lg:text-[28px] 2xl:mt-0'>
        <p>Total:</p><p>{formatPrice(total)}</p>
        </div>
      <button className='bg-black text-white w-full h-[80px] lg:h-[80px] text-[28px] font-bold'>Finalizar Compra</button>
      </div>
    </section>
  );
}
