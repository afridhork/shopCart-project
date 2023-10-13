import React from 'react'

import Banner from '@/assets/images/discount-banner-min.png';
import Skeleton from 'react-loading-skeleton';

export default function BannerDiscount({isLoading}: {isLoading: boolean}) {
  return (
    <div className="py-14">
      {
        isLoading ? <Skeleton className="h-[600px]"/> : (<>
          <div className="relative">
            <div className="img-wrapper">
              <img className="m-auto w-full" src={Banner.src} alt="" />
            </div>
            <div className="meta-wrapper">
              <div className="discount-content">
                <span className="title-font">Get 5% Cash Back On $200</span>
                <span className="description-font">Shopping is a bit of a relaxing hobby for me, which is sometimes troubling for the bank balance.</span>
              </div>
            </div>
          </div>
        </>)
      }
    </div>
  )
}
