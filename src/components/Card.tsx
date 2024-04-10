import { CartContext } from '@/context/CartContext';
import formatPrice from '@/functions/formatPrice';
import React, { useContext } from 'react';

interface ProductInfo {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function Card(props: ProductInfo): JSX.Element {

  const {addToCart} = useContext(CartContext);

  const { id, name, description, price, image } = props;

  function handleClick(id: number){
    addToCart({id});
  }
  

  return (
    <div className="flex flex-col w-[230px] min-h-[285px] shadow-3xl rounded-lg justify-between items-center  lg:my-0 "  id={`${id}`}>

      <img className=' w-[150px] h-[150px] justify-center lg:h-100px' src={image} alt={name} />
      <div className='flex flex-col p-[14px] gap-2 h-[160px] '>
        <div className='flex justify-between items-start min-h-8 gap-0'>

        <h2 className='text-base text-primary font-semibold '>{name}</h2>
        <span className=' y-[26px] bg-[#373737] text-white font-bold px-2 py-1 text-xs rounded'>{formatPrice(price)}</span>
        </div>
      
      <p className='text-xs text-primary font-normal'>{description}</p>
      </div>

      <button onClick={() => handleClick(id)} className='w-full flex bg-[#1252b6] justify-center items-center gap-3 text-sm font-semibold text-white py-[8px] rounded-b-lg active:scla'><img src='/icons/shopping-bag.svg' alt='shopping bag icon'/>Comprar</button>
    </div>
  );
}
