import React from 'react'

export default function InputRadio(
   {
      data,
      index,
      onClick
   }:
   {
      data: any, 
      index: number, 
      onClick: (name: string)=>void 
   }) {
  return (
   <div className="flex items-center" key={index}>
      <label
         className="relative flex cursor-pointer items-center rounded-full p-3"
         htmlFor={`${index}`}
         data-ripple-dark="true"
      >
         <input
         id={`${index}`}
         name="type"
         type="radio"
         checked={data.value ? true : false}
         readOnly
         className="peer relative h-4 w-4 cursor-pointer appearance-none rounded-full border-2 border-gray-800 text-emerald-400 transition-all checked:border-emerald-400"
         onClick={()=> onClick(data.name)}
         />
         <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-emerald-400 opacity-0 transition-opacity peer-checked:opacity-100">
            <svg
               xmlns="http://www.w3.org/2000/svg"
               className="h-2.5 w-2.5"
               viewBox="0 0 16 16"
               fill="currentColor"
            >
               <circle data-name="ellipse" cx="8" cy="8" r="8" className="bg-emerald-400"></circle>
            </svg>
         </div>
      </label>
      <label
         className="mt-px cursor-pointer select-none text-gray-700"
         htmlFor={`${index}`}
      >
         {data.name}
      </label>
   </div>
  )
}
