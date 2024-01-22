'use client'
import CartList from '@/components/CartList/page'
import OrderSummaryCart from '@/components/OrderSummaryCart/page'
import { useUserCartQuery } from '@/store/api/cart'
import React, { useEffect, useState } from 'react'

export default function page() {
  const [userID, setUserID] = useState<number>(0)
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('auth data') as any)
    if(userData){
        setUserID(userData.data.id)
    }
  }, [])
  const {data, isSuccess, isLoading} = useUserCartQuery(userID)
  
  return (
    <div className="px-10">
      <h1 className="block font-bold">Cart</h1>
      <div className='grid grid-row-1 grid-cols-1 sm:grid-cols-3 gap-2 mb-5'>
        <div className='row-span-1 col-span-1 sm:col-span-2'>
          {
            isSuccess && (<CartList isLoading={isLoading} data={data.carts[0].products}/>)
          }
        </div>
        <div className='row-span-1 col-span-1'>
          <OrderSummaryCart isLoading={isLoading}/>
        </div>
      </div>
    </div>
  )
}
