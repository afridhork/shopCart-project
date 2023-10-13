'use client'
import DeliveryInformation from '@/components/DeliveryInformation/page'
import OrderSummary from '@/components/OrderSummary/page'
import ReviewProduct from '@/components/ReviewProduct/page'
import Breadcrumb from '@/part/Breadcrumb/page'
import React, { useEffect, useState } from 'react'

export default function Checkout() {
  const [productData, setProductData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const datas = JSON.parse(localStorage.getItem('checkout data') as any)
    setProductData(datas)
    setIsLoading(false)
  }, [])
  return (
    <div className="px-10">
      <Breadcrumb name={['checkout']} />
      <div className='block sm:grid sm:grid-rows-3 grid-cols-1 sm:grid-cols-3 gap-12 mb-5'>
        <div className='row-span-1 col-span-2'>
          <ReviewProduct isLoading={isLoading} data={productData} />
        </div>
        <div className='block sm:hidden row-span-2 col-span-2'>
          <DeliveryInformation />
        </div>
        <div className='row-span-3 col-span-2 sm:col-span-1'>
          <OrderSummary data={productData} />
        </div>
        <div className='hidden sm:block row-span-2 col-span-2'>
          <DeliveryInformation />
        </div>
      </div>
    </div>
  )
}
