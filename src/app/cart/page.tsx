'use client'
import CartList from '@/components/CartList/page'
import OrderSummaryCart from '@/components/OrderSummaryCart/page'
import { useUserCartQuery } from '@/store/api/cart'
import { getStoredAuth } from '@/lib/storage'
import React, { useEffect, useState } from 'react'

export default function page() {
  const [userID, setUserID] = useState<number>(0)
  useEffect(() => {
    const userData = getStoredAuth()
    if (userData?.data?.id) {
      setUserID(userData.data.id)
    }
  }, [])
  const { data, isSuccess, isLoading } = useUserCartQuery(userID, { skip: userID === 0 })
  const cartProducts = data?.carts?.[0]?.products ?? []

  return (
    <div className="px-10">
      <h1 className="block font-bold">Cart</h1>
      <div className='grid grid-row-1 grid-cols-1 sm:grid-cols-3 gap-2 mb-5'>
        <div className='row-span-1 col-span-1 sm:col-span-2'>
          {userID === 0 ? (
            <p className="text-gray-500">Silakan login untuk melihat keranjang.</p>
          ) : isSuccess && cartProducts.length > 0 ? (
            <CartList isLoading={isLoading} data={cartProducts} />
          ) : isSuccess && cartProducts.length === 0 ? (
            <p className="text-gray-500">Keranjang kosong.</p>
          ) : (
            <CartList isLoading={isLoading} data={[]} />
          )}
        </div>
        <div className='row-span-1 col-span-1'>
          <OrderSummaryCart isLoading={isLoading} />
        </div>
      </div>
    </div>
  )
}
