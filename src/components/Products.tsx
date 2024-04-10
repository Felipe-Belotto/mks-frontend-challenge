"use client";
import apiProducts from '@/functions/apiProducts';
import React, { useContext, useEffect, useState } from 'react';
import Card from './Card';
import { CartContext } from '@/context/CartContext';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  photo: string; 
}

export default function Products() {

  const [produtos, setProdutos] = useState<Product[]>([]);

  useEffect(() => {
    apiProducts()
      .then((dados) => {
        setProdutos(dados);
      })
      .catch((erro) => {
        console.error('Erro ao obter produtos:', erro);
      });
  }, []);

  
  

  return (
    <div className='flex gap-5 flex-wrap justify-center my-[20px]  md:w-full md:justify-evenly md:mx-[20px] lg:w-[800px]   xl:w-[1000px]  2xl:my-0 ' >
    {produtos.length > 0 ? (
      produtos.map((item) => (
        <Card
          key={item.id}
          id={item.id}
          name={item.name}
          description={item.description}
          price={item.price}
          image={item.photo}
        />
      ))
    ) : (
      <>
      <button onClick={() => console.log(produtos)}>Carregando arquivos ...</button>
      </>
    )}
  </div>
  );
}
