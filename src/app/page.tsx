'use client'
import React, { useEffect, useState } from 'react';
import Hero from '@/components/Hero/page';
import TopCategories from '@/components/TopCategories/page';
import BestDiscount from '@/components/BestDiscount/page';
import TopBrand from '@/components/TopBrand/page';

import { useAllProductQuery } from '@/store/api/product';

import { count } from '@/models/brand';
import { useAppDispatch } from '@/store/hooks';
import { setTopBrand } from '@/store/slices/brandSlice';
import { setDiscountItems } from '@/store/slices/discountSlice';
import { setRatingItems } from '@/store/slices/ratingSlice';
import { setCategoryItems } from '@/store/slices/categorySlice';
import BestRating from '@/components/BestRating/page';
import BannerDiscount from '@/components/BannerDiscount/page';
import ProductChoice from '@/components/ProductChoice/page';
import CustomSkeleton from '@/part/CustomSkeleton/page';
import Skeleton from 'react-loading-skeleton';

export default function page() {
  const dispatch = useAppDispatch()
  const {data,isSuccess,isLoading} = useAllProductQuery()
  // const [topBrand, setTopBrand] = useState<count[]>([])
  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setTopBrand(data));
      dispatch(setDiscountItems(data));
      dispatch(setRatingItems(data));
      dispatch(setCategoryItems(data));
    }
  }, [data, isSuccess, dispatch]);
  
  // useEffect(() => {
  //   if(isSuccess){
  //     for(let i in data.products) {
  //       for(let j in data.products[i]){
  //         if(j == 'brand'){
  //           brand.push(data.products[i][j])
  //         }
  //       }
  //     }
  //   }
  //   const countBrand: count[] = []
  //   for(let i in brand){
  //     const indexBrand = countBrand.findIndex(item => item.name == brand[i])
  //     if(indexBrand == -1){
  //       countBrand.push({
  //         name: brand[i],
  //         value: 1
  //       })
  //     }else{
  //       countBrand[indexBrand].value += 1
  //       countBrand.sort((a, b) => b.value - a.value);
  //     }
  //   }
  //   const topBrand = []
  //   for(let i = 0; i<8; i++){
  //     topBrand.push(countBrand[i])
  //   }
  //   setTopBrand(topBrand)
    
  // },[data])
  
  return (
    <>
      <div className='container mx-auto'>
        {
          isLoading ? <Skeleton className='block w-full h-[600px]'/> : (
            <Hero/>
          )
        }
        <div className="px-10">
          <TopCategories isLoading={isLoading} />
          <BestDiscount isLoading={isLoading} />
          <BestRating isLoading={isLoading} />
          <TopBrand isLoading={isLoading} />
        </div>
        <BannerDiscount isLoading={isLoading} />
        <div className="px-10">
          <ProductChoice isLoading={isLoading}/>
        </div>
      </div>
    </>
  )
}
