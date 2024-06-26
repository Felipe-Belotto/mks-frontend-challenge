import React from 'react'

interface InputQuantityProps {
value: number
onAdd: (value: number) => void
onRemove: (value: number) => void
}

export default function InputQuantity(props: InputQuantityProps ) {
  return (
   <div className='flex items-center  border border-[#BFBFBF] rounded-lg w-[110px] 2xl:w-[80px]'>
    
    <div className="relative flex items-center max-w-12">
        <button type="button" onClick={() => props.onRemove(props.value)} className="flex justify-center items-center text-black px-4 py-2 2xl:p-3 2xl:w-2 2xl:h-3 border-r border-r-gray-200  active:scale-95 focus:outline-none">
          -
        </button>
        <label  className="hidden 2xl:block mb-2 text-[8px] font-medium text-black absolute bottom-6">Qtd:</label>

        <input type="text"  value={props.value} className=" border-x-0 text-black w-8 h-8 2xl:w-6 2xl:h-6 text-center text-xs "  readOnly />

        <button type="button" onClick={() => props.onAdd(props.value)} className="flex justify-center items-center text-black px-4 py-2 2xl:p-3 2xl:w-2 2xl:h-3 border-l border-l-gray-200  active:scale-95 focus:outline-none">
          +
        </button>
    </div>
    </div>
  )
}
