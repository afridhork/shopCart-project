'use client'
import React, { useEffect } from 'react';
import Hero from '@/components/Hero/page';
import TopCategories from '@/components/TopCategories/page';
import BestDiscount from '@/components/BestDiscount/page';
import TopBrand from '@/components/TopBrand/page';
import { useAllProductQuery } from '@/store/api/product';
import { useAppDispatch } from '@/store/hooks';
import { setTopBrand } from '@/store/slices/brandSlice';
import { setDiscountItems } from '@/store/slices/discountSlice';
import { setRatingItems } from '@/store/slices/ratingSlice';
import { setCategoryItems } from '@/store/slices/categorySlice';
import BestRating from '@/components/BestRating/page';
import BannerDiscount from '@/components/BannerDiscount/page';
import ProductChoice from '@/components/ProductChoice/page';
import Skeleton from 'react-loading-skeleton';

export default function page() {
  const dispatch = useAppDispatch()
  const { data, isSuccess, isLoading } = useAllProductQuery()

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setTopBrand(data));
      dispatch(setDiscountItems(data));
      dispatch(setRatingItems(data));
      dispatch(setCategoryItems(data));
    }
  }, [data, isSuccess, dispatch]);

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
