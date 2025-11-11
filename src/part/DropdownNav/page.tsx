import React, { useEffect, useRef, useState } from 'react'
import './index.css'
import { useRouter } from 'next/navigation'
interface product{
   name: string,
   slug: string,
   img: string
 }
export default function DropdownNav({data}: {data: product[]}) {   
   const [open, setOpen] = useState<boolean>(false)
   const refNav = useRef<HTMLDivElement>(null)
   const Router = useRouter()
   
   const handleClickCategory = (name: string) => {
      Router.push(`/category/${name}`)
   }

   useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
	});

   const handleClickOutside: Parameters<Document['addEventListener']>[1] = (event) => {
		if (refNav && !refNav.current?.contains(event.target as HTMLDivElement)) {
			setOpen(false);
		}
	};
   function clickDropdown(){
      setOpen(prev => !prev)
   }
  return (
   <>
      <div ref={refNav} className='static' onClick={clickDropdown}>
         <div className='flex items-center'>
            <h5>Category</h5> 
            <svg 
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={1.5}
               stroke="currentColor"
               className="ml-1 w-4 h-4"
            >
               <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
         </div>
         { open && (
            <div className='category-section p-5 mt-4'>
               <h2 className='font-semibold pb-4 border-b mb-3'>Categories</h2>
               <div className="grid grid-cols-2 gap-2">
                  {
                     data.map((items,index: React.Key)=>{
                        return(
                           <div onClick={()=>handleClickCategory(items.slug)} className='flex items-center bg-gray-100 mb-3' key={index}>
                              <img className='w-14 h-14 p-1' src={items.img}/>
                              <h3 className='ml-4 semibold'>
                                 {items.name}
                              </h3>
                           </div>
                        )
                     })
                  }
               </div>
            </div>
         )}
      </div>
   </>
  )
}
