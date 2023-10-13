import React from 'react'

import './index.css'
import Star from '../Star/page';
import { allProduct } from '@/models/product';
import { useRouter } from 'next/navigation';
import Skeleton from 'react-loading-skeleton';

export default function CatalogItem({
  data, 
  categoryName,
  isLoading
}: 
{
  data: allProduct, 
  categoryName?: string,
  isLoading?: boolean
}) {  
  const Router = useRouter()
  const handleClickItem = (category: string, id: number) => {
    
    Router.push(`/category/${category}/${id}`)
 }
  return (
    <div onClick={()=>handleClickItem(data.category as string,data.id as number)} className={`${!isLoading && 'catalog-card'} cursor-pointer`}>
      <div className="catalog-img-wrapper">
        {
          isLoading ? <Skeleton className="block w-[300px] x-1 h-[200px]" /> : (
            <img className="catalog-img" src={data.thumbnail} alt="" />
          )
        }
      </div>
      {
        isLoading ? <Skeleton className="block w-[300px] h-[100px]" /> : (
          <div className='catalog-description'>
            <div className="block sm:flex justify-between">
              <h6 className="font-semibold">{data.title}</h6>
              <div className="flex">
                <h6 className="font-semibold">${(data.price - data.price * data.discountPercentage/100).toFixed(1)}</h6>
                <div className="flex items-center">
                  <p className="font-semibold text-red-500 line-through mr-2">${data.price}</p>
                  <p className="text-red-500 bg-red-100 rounded-md p-1">-{data.discountPercentage.toFixed()}%</p>
                </div>
              </div>
            </div>
            <p className='hidden sm:block mt-2'>{data.description}</p>
            <div className="flex">
              <Star value={data.rating} height={20} width={20} spacing={0} />
              <h5>({data.rating})</h5>
            </div>
          </div>
        )
      }

    </div>
  )
}
