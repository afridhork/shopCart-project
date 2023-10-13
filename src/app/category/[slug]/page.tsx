'use client'
import React from 'react'
import { useCategoryProductQuery } from '@/store/api/product';
import CatalogItem from '@/part/CatalogItem/page';
import Breadcrumb from '@/part/Breadcrumb/page';
import CustomSkeleton from '@/part/CustomSkeleton/page';
import { SkeletonTheme } from 'react-loading-skeleton';

export default function categoryPage({params}: {params: {slug: ''}}) {
  const {data,isSuccess, isLoading} = useCategoryProductQuery(params.slug)
  if(isLoading){
    const itemEmpty = {
      id: 0,
      title: '',
      description: '',
      price: 0,
      discountPercentage: 0,
      rating: 0,
      stock: 0,
      brand: '',
      category: '',
      thumbnail: '',
      images: ['']
    }
    return(
      <>
        <CatalogItem isLoading={isLoading} data={itemEmpty} /> 
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
          <div className='pt-10'>
            <h5 className="mb-5">Menampilkan pencarian "{params.slug}" dari 1 - {data.products.length}</h5>
            <Breadcrumb name={[params.slug]} />
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-y-8 mb-20 mt-10'>
            {
              data.products.map((item: any,index: any)=>{
                return(
                  <div key={index}>
                    <CatalogItem data={item} isLoading={isLoading}/> 
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
