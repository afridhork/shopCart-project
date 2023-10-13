'use client'
import React from 'react'
import { useSearchProductQuery } from '@/store/api/product';
import CatalogItem from '@/part/CatalogItem/page';

export default function searchPage({params}: {params: {slug: string}}) {
  const {data,isSuccess, isLoading} = useSearchProductQuery(params.slug)
  if(isLoading){
    return(
      <>
        <div className="container flex items-center justify-center h-80 px-10">
          <h1>Is Loading</h1>
        </div>
      </>
    )
  }
    if(data?.products.length == 0){
      return (
        <div className="container flex items-center justify-center h-80 px-10">
          <h1>Barang tidak ditemukan</h1>
        </div>
      )
    }
  
  return (
    <>
    {
      isSuccess && (
        <div className="container px-10">
          <div className='pt-20'>
            <h5>Menampilkan pencarian "{params.slug}" dari 1 - {data.products.length}</h5>
            <h4 className='font-semibold'>{params.slug} for you!</h4>
            <div className='grid grid-cols-3 gap-y-8 mb-20 mt-10'>
            {
              data.products.map((item: any,index: any)=>{
                return(
                  <div key={index}>
                    <CatalogItem data={item} /> 
                  </div>
                )
              })
            }
            </div>
          </div>
        </div>
      )
    }
    </>
  )
}
