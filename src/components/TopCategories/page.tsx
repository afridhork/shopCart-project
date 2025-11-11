import React, { useEffect, useState, useRef } from 'react'

import furniture from '@/assets/images/topCategory/Furniture-min.png'
import womenBag from '@/assets/images/topCategory/hand-bag-min.png'
import homeDecor from '@/assets/images/topCategory/homeDecor-min.png'
import laptop from '@/assets/images/topCategory/laptop-min.png'
import womenShoes from '@/assets/images/topCategory/womenShoes-min.png'

import { useCategoryListQuery } from '@/store/api/category';
import Skeleton from 'react-loading-skeleton'

type dataType = {
  name: string,
  img: string
}

export default function TopCategories({isLoading}: {isLoading: boolean}) {
  const {data,isSuccess} = useCategoryListQuery()
  const [topCategory, setTopCategory] = useState<dataType[]>([])
  const tempData: dataType[] = []
  useEffect(() => {
    if(isSuccess){
      for(let i = 0; i < data.length; i++){
        if(data[i].slug == 'furniture'){
          tempData.push({'name':data[i].slug, 'img':furniture.src})
        }else if(data[i].slug == 'womens-bags'){
          tempData.push({'name':data[i].slug, 'img':womenBag.src})
        }else if(data[i].slug == 'laptops'){
          tempData.push({'name':data[i].slug, 'img':laptop.src})
        }else if(data[i].slug == 'womens-shoes'){
          tempData.push({'name':data[i].slug, 'img':womenShoes.src})
        }else if(data[i].slug == 'home-decoration'){
          tempData.push({'name':data[i].slug, 'img':homeDecor.src})
        }
      }
      // const newArray: any = tempData.map((m) => [m.name, m]);
      // const newMap = new Map(newArray);
      // const iterator = newMap.values();
      // const unique = [...iterator];
      const unique = [...new Map(tempData.map((m) => [m.name, m])).values()];
      setTopCategory(unique)
    }
  },[data])

  let refCategories = useRef<any>(null)
  const prevSlide = () =>{
    const category = document.querySelector('.categories-list')
    category?.scrollBy({
      left: refCategories.current?.offsetLeft - 263,
      behavior: "smooth",
    })
  }
  const nextSlide = () =>{
    const category = document.querySelector('.categories-list')
    category?.scrollBy({
      left: refCategories.current?.offsetLeft + 263,
      behavior: "smooth",
    })
    // if(catalog?.scrollLeft){
    //   catalog.scrollLeft += 300
    // }
  }
  
  return (
    <>
    {
      isSuccess && (
        <div className="py-14">
          <h1 className="font-bold mb-10">{ isLoading ? <Skeleton className="w-[200px]"/> :  'Our Top Categories'}</h1>
          <div className="categoreis-wrapper">
            <div className="prev-slide cursor-pointer" onClick={prevSlide}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </div>
            <div ref={refCategories} className='categories-list'>
              {
                topCategory.map((items,index)=>{
                  return(
                    <div className="card card-category" key={index}>
                      {
                        isLoading ? <Skeleton className="block h-[300px]"/> : (<>
                          <div className="category-img-wrapper">
                            <img className='rounded-lg w-full' src={items.img} alt="" />
                            <h3 className='category-title'>{items.name}</h3>
                          </div>
                        </>)
                      }
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
    </>
  )
}
