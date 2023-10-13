import CatalogItem from '@/part/CatalogItem/page'
import { RootState } from '@/store'
import React, { useRef } from 'react'
import { useSelector } from 'react-redux'

export default function BestRating({isLoading}: {isLoading: boolean}) {
  const data = useSelector((state:RootState)=> state.dataRating.ratingItems)
  let refCatalog = useRef<any>(null)
  const prevSlide = () =>{
    const catalog = document.querySelector('.catalogs-bestRating-wrapper')
    catalog?.scrollBy({
      left: refCatalog.current?.offsetLeft - 360,
      behavior: "smooth",
    })
  }
  const nextSlide = () =>{
    const catalog = document.querySelector('.catalogs-bestRating-wrapper')
    catalog?.scrollBy({
      left: refCatalog.current?.offsetLeft + 360,
      behavior: "smooth",
    })
  }
  return (
    <div className="py-14">
      <h1 className='font-bold mb-8'>Best Rating For You</h1>
      <div className='slide-catalog'>
        <div className="prev-slide cursor-pointer" onClick={prevSlide}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </div>
        <div ref={refCatalog} className='catalogs-bestRating-wrapper'>
          {
            data.map((item, index)=>{
              return(
                <div key={index}>
                  <CatalogItem isLoading={isLoading} data={item} />
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
