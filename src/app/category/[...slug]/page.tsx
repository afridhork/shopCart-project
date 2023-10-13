'use client'
import BookingPage from '@/components/BookingPage/page';
import Breadcrumb from '@/part/Breadcrumb/page';
import SimiliarProduct from '@/components/SimiliarProduct/page';
import Button from '@/part/Button/page';
import InputNumber from '@/part/FormInput/InputNumber/page';
import Star from '@/part/Star/page';
import { useSingleProductQuery } from '@/store/api/product'
import React, { ChangeEvent, useState } from 'react'

export default function checkout({params}: {params: {slug: string[]}}) {
   const {data,isSuccess, isLoading} = useSingleProductQuery(+params.slug[1])   
   if(isLoading){
      return(
         <div className='container px-10 py-5'>
            <BookingPage data={data} isLoading={isLoading} breadcrumbData={[params.slug[0],'']} />
         </div>
      )
   }
   return (
      <>
      {
         isSuccess && (
            <div className='container px-10 py-5'>
               <BookingPage data={data} isLoading={isLoading} breadcrumbData={[params.slug[0],data.title]} />
               <SimiliarProduct param={params.slug[0]} idProduct={+params.slug[1]}/>
            </div>
         )
      }
      </>
   )
}
