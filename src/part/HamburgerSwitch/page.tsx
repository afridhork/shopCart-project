import React, { useEffect, useRef, useState } from 'react'
import './index.css'
import { useRouter } from 'next/navigation'

interface product{
   name: string,
   img: string
 }

export default function HamburgerSwitch({data}: {data: product[]}) {
   const [isOpen, setIsOpen] = useState(false)
   const [isOpenCategory, setIsOpenCategory] = useState(false)
   const Router = useRouter()
   const refNav = useRef<HTMLDivElement>(null)

   function handleClickSwitch(){
      setIsOpen(prev => !prev)
      if(isOpenCategory){
         setIsOpenCategory(false)
      }
   }
   
   function handleClickCategory(){
      setIsOpenCategory(prev => !prev)
   }
   
   function handleClickCategoryRoute(name: string){
      Router.push(`/category/${name}`)
      setIsOpen(prev => !prev)
   }

   useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
	});

   const handleClickOutside: Parameters<Document['addEventListener']>[1] = (event) => {
      // console.log('nav hamburger',refCategory);
      
		if (refNav && !refNav.current?.contains(event.target as HTMLDivElement)) {
			setIsOpen(false);
		}
	};

  return (
   <div ref={refNav} className="hamburger-wrapper">
      <div className="flex items-center" onClick={handleClickSwitch}>
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
         </svg>
      </div>
      {
         isOpen && (
            <div className='hamburger-section'>
               <h2 className='font-semibold text-left pb-4 border-b mb-0 sm:mb-3 px-2'>Menu</h2>
               <div className="grid grid-cols-1 gap-2">
                  <ul className='text-left font-semibold'>
                     <li className={`cursor-pointer border-b py-1 duration-500`} onClick={handleClickCategory}>
                        <div className="flex items-center">
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
                        {
                           isOpenCategory && (
                              <div className='grid grid-cols-2'>
                                 {
                                    data.map((value,index)=>{
                                       return(
                                          <h6 className='text-left font-normal pb-1' key={index} onClick={()=>handleClickCategoryRoute(value.name)}>{value.name}</h6>
                                       )
                                    })
                                 }
                              </div>
                           )
                        }
                     </li>
                     <li className={`cursor-pointer border-b py-1`}>Deals</li>
                     <li className={`cursor-pointer border-b py-1`}>What's new</li>
                     <li className={`cursor-pointer border-b py-1`}>Delivery</li>
                  </ul>
               </div>
            </div>
         )
      }
   </div>
  )
}
