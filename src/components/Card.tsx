import { CartContext } from '@/context/CartContext';
import formatPrice from '@/functions/formatPrice';
import React, { useContext, useState } from 'react';
import {motion} from 'framer-motion';

interface ProductInfo {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function Card(props: ProductInfo): JSX.Element {

  const {addToCart} = useContext(CartContext);
  const [animateBag, setAnimateBag] = useState(false);

  const { id, name, description, price, image } = props;

  function handleClick(id: number){
    setTimeout(() => {
      setAnimateBag(true);
    }, 200);
    addToCart({id});
  }
  

  return (
    <div className="flex flex-col w-[75%] md:w-[230px] lg:min-h-[285px] shadow-3xl rounded-lg justify-between items-center  lg:my-0 "  id={`${id}`}>

      <img className=' w-[150px] h-[150px] justify-center lg:h-100px' src={image} alt={name} />
      <div className='flex flex-col p-[14px] gap-2 h-[130px] md:h-[160px] '>
        <div className='flex justify-between items-start min-h-8 gap-0'>

        <h2 className='text-base text-primary font-semibold '>{name}</h2>
        <span className=' y-[26px] bg-[#373737] text-white font-bold px-2 py-1 text-xs rounded'>{formatPrice(price)}</span>
        </div>
      
      <p className='text-xs text-primary font-normal'>{description}</p>
      </div>

      <button onClick={() => handleClick(id)} className='w-full flex bg-[#1252b6] justify-center items-center gap-3 text-sm font-semibold text-white py-[8px] rounded-b-lg  active:scale-[99%] active:bg-[#1251b6e8]'>
        <motion.img animate={animateBag? {rotate: 360} : {}} transition={{duration: 0.5}} src='/icons/shopping-bag.svg' alt='shopping bag icon'/>Comprar</button>
    </div>
  );
}
