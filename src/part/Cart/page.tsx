import React, { useEffect, useRef, useState } from 'react'
import { useUserCartQuery } from '@/store/api/cart'
import { useRouter } from 'next/navigation'

import './index.css'

export default function Cart() {
   const userData = JSON.parse(localStorage.getItem('auth data') as any)
   const [userID, setUserID] = useState<number>(0)
   const [isCartOpen, setIsCartOpen] = useState(false)
   const refCart = useRef<HTMLDivElement>(null)
   const Router = useRouter()
   useEffect(() => {
      if(userData){
         setUserID(userData.data.id)
      }
   }, [])
   
   const {data, isSuccess} = useUserCartQuery(userID)

   const handleClickCartPage = () => {
      Router.push(`/cart`)
   }

   useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
	});

   function handleClickCartOpen(){
      setIsCartOpen(true)
   }

   const handleClickOutside: Parameters<Document['addEventListener']>[1] = (event) => {
		if (refCart && !refCart.current?.contains(event.target as HTMLDivElement)) {
			setIsCartOpen(false)
		}
	};

  return (
   <>
      <div ref={refCart} onClick={handleClickCartOpen}>
         <div className="flex items-center">
            <div className='relative'>
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
               <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
               </svg>
               {
                  data && data.carts[0].products.length > 0 ?  
                  <p className='flex items-center justify-center text-white absolute bg-red-600 rounded-[100%] top-[-20%] right-[0%] w-[15px] h-[15px] p-1'>{data ? data.carts[0].products.length : 0}</p>
                  : null
               }
            </div>
            <h6 className='hidden sm:inline'>Cart</h6>
         </div>
         {
            isCartOpen && (
               <div className='cart-section mt-4'>
                  <h4 className='font-semibold border-b px-2 mb-3'>Cart ({`${data ? data.carts[0].products.length : 0} `})</h4>
                  <div className="grid grid-cols-1">
                     {
                        isSuccess && data.carts[0].products.length > 0 ? (
                           data.carts[0].products.map((items,index: React.Key)=>{
                              return(
                                 <div className='flex justify-between items-center items-center hover:bg-gray-200 px-2 pb-3' onClick={handleClickCartPage} key={index}>
                                    <div>
                                       <h6 className='ml-1 semibold'>
                                          {items.title}
                                       </h6>
                                       <p className='ml-1'>{`${items.quantity} ${items.quantity == 1 ? 'item' : 'items' }`}</p>
                                    </div>
                                    <h4 className='font-semibold ml-5'>${items.price}</h4>
                                 </div>
                              )
                           })
                        ):(
                           <div>
                              <h6 className='text-center italic text-gray-400 mb-5'>Anda belum menyimpan barang</h6>
                           </div>
                        )
                     }
                  </div>
               </div>
            )
         }
      </div>
   </>
  )
}
