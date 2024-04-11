import React, { useContext, useEffect, useState } from 'react'
import InputQuantity from './InputQuantity'
import { CartContext } from '@/context/CartContext'
import apiProducts from '@/functions/apiProducts'

interface CartCardProps {
  name: string
  price: number
  image: string
  id: number
  priceChange: (id: number, newPrice: number) => void
}

interface CartItem {
  name: string;
  photo: string;
  price: number;
  id: number;
}

export default function CartCard(props: CartCardProps) { 

  const [productsList, setProductsList] = useState<CartItem[]>([]);

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
    setRealPrice(productsList.find((item) => item.id === props.id)?.price || 0);
  }, [productsList]);

  const { removeToCart } = useContext(CartContext)

  const [quantity, setQuantity] = useState(1);
  const [realPrice, setRealPrice] = useState(props.price);

  function formatPrice(price: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price); 
  }

  useEffect(() => {
    props.priceChange(props.id, realPrice * quantity)
  }, [quantity])

  function addQuantity(){
    setQuantity(quantity + 1)
  }

  function removeQuantity(){
    setQuantity(quantity - 1)
  }

  function deleteProduct(){
    props.priceChange(props.id, realPrice)
    removeToCart({id: props.id})
  }

  return (
   <div className='w-[90%] lg:h-[80px] lg:w-full '>   
    <button onClick={() => deleteProduct()} className="w-6 h-6 rounded-full text-[42px] lg:text-xs lg:bg-black lg:text-white flex justify-center items-center leading-none relative 
    left-[86%] top-10 lg:left-[420px] lg:top-4 ">X</button>
    <div className='flex flex-col lg:flex-row  gap-2 items-center w-full h-100px bg-white rounded-lg p-5 ' >
     <div className='flex flex-col lg:flex-row gap-3 justify-center items-center w-[80%] lg:w-[50%] lg:justify-between'>
      <img className='w-[70%] lg:max-w-[40px]' src={props.image} alt="imagem do produto" />
      <p className=' text-base texto-primary font-normal lg:text-sm lg:w-[140px]'>{props.name}</p>
      </div>
      <div className='w-[90%] flex items-center justify-between lg:w-[50%] lg:justify-between'>
      <InputQuantity value={quantity} onAdd={addQuantity} onRemove={removeQuantity}/>
      <p className='text-white px-2 py-1 rounded bg-[#373737] text-base lg:text-black lg:bg-transparent font-bold'>{formatPrice(props.price)}</p>
      </div>
    </div>

    </div>

    
  )
}
