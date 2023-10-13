import CatalogItem from '@/part/CatalogItem/page'
import { useCategoryProductQuery } from '@/store/api/product'
import React from 'react'

export default function SimiliarProduct({param, idProduct}: {param: string, idProduct: number}) {
   const {data,isSuccess, isLoading} = useCategoryProductQuery(param)
   
   return (
      <div>
         {
            isSuccess && (
            <div>
               <h1 className='font-bold'>Similiar Item You Might Like</h1>
               <div className='pt-10'>
                  <div className="slide-catalog">
                     <div className='catalogs-similiarProduct-wrapper'>
                     {
                        data.products.map((item: any,index: any)=>{
                           return(
                              <div key={index}>
                                 {
                                    item.id == idProduct ? ('') : (
                                       <CatalogItem isLoading={isLoading} data={item} /> 
                                    )
                                 }
                              </div>
                           )
                        })
                     }
                     </div>
                  </div>
               </div>
            </div>
            )
         }
      </div>
   )
}
