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
   <div className='h-[80px] '>   
    <button onClick={() => deleteProduct()} className="w-6 h-6 rounded-full bg-black text-white text-xs flex justify-center items-center leading-none relative left-[420px] top-4 ">X</button>
    <div className='flex justify-between items-center w-full h-100px bg-white rounded-lg p-5 ' >
      <img className='max-w-[40px]' src={props.image} alt="imagem do produto" />
      <p className='text-sm texto-primary font-normal w-[120px]'>{props.name}</p>
      <InputQuantity value={quantity} onAdd={addQuantity} onRemove={removeQuantity}/>
      <p className='text-sm text-black font-bold'>{formatPrice(props.price)}</p>
    </div>

    </div>

    
  )
}
