import React, { useRef } from 'react'

import { count } from '@/models/brand'
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Skeleton from 'react-loading-skeleton';


export default function TopBrand({isLoading}: {isLoading: boolean}) {
  const data = useSelector((state:RootState)=> state.dataBrand.topBrand)
  let refBrand = useRef<any>(null)
  const prevSlide = () =>{
    const brand = document.querySelector('.brand-list')
    brand?.scrollBy({
      left: refBrand.current?.offsetLeft - 315,
      behavior: "smooth",
    })
  }
  const nextSlide = () =>{
    const brand = document.querySelector('.brand-list')
    brand?.scrollBy({
      left: refBrand.current?.offsetLeft + 315,
      behavior: "smooth",
    })
    // if(catalog?.scrollLeft){
    //   catalog.scrollLeft += 300
    // }
  }
  return (
   <div className="relative py-14">
      <h1 className='font-bold mb-8'>Our Top Brand</h1>
      <div className="brand-wrapper">
        <div className="prev-slide cursor-pointer" onClick={prevSlide}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </div>
        <div ref={refBrand} className='brand-list'>
          {
            data.map((brand,index)=>{
              return(
                <div className="card-brand" key={index}>
                  <div className="flex items-center">
                    <div className={`brand-img-wraper ${isLoading ? 'w-[80px] h-[80px]' : 'min-w-[80px] min-h-[80px]'}`} >
                      {
                        isLoading ? <Skeleton circle className="h-[81px] w-[81px] right-[1px] bottom-[5px]"/> : (
                          <img className="brand-img" src={brand.img} width="50" alt="" />
                        )
                      }
                    </div>
                    <div>
                      <h3 className="font-bold">{isLoading ? <Skeleton className="w-[150px]"/> : brand.title}</h3>
                      <p className='sm:w-full w-[200px]'>{isLoading ? <Skeleton/> : 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'}</p>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className="next-slide cursor-pointer" onClick={nextSlide}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </div>
   </div>
  )
}
