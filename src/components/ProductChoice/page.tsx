import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton';


import CatalogItem from '@/part/CatalogItem/page'
import NavTab from '@/part/NavTab/page'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import { useCategoryProductQuery } from '@/store/api/product'
import { allProduct } from '@/models/product'

interface data{
  name: string,
  active: boolean
}

export default function ProductChoice({isLoading}: {isLoading: boolean}) {
  const [categoryName, setCategoryName] = useState('smartphones')
  const {data,isSuccess,isFetching} = useCategoryProductQuery(categoryName)
  
  const dataCategory = useSelector((state: RootState)=>state.dataCategory.categoryItems)
  const [dataNav, setdDataNav] = useState<data[]> ([{name: '', active: false}])
  
  useEffect(() => {
    setdDataNav(dataCategory)    
  }, [dataCategory])
  
  function handleClickNav(index: number, name: string) {
    setdDataNav(prevData =>{
      const updatedData = prevData.map((item, i) => ({
        ...item,
        active: i === index,
      }));
      // updatedData[index] = { ...updatedData[index], active: newActive };
      return updatedData;
    })
    setCategoryName(name)
  }
  
  return (
    <div className="py-14">
      <h1 className="font-bold">Product Choice</h1>
      <div className="navTab-wrapper">
        {
          dataNav.map((item, index)=>{
            return(
              <div key={index}>
                <NavTab onClick={()=>handleClickNav(index, item.name)} index={index} data={item.name} isActive={item.active} isLoading={isLoading}/>
              </div>
            )
          })
        }
      </div>
      <div className="product-wrapper">
        {
        isSuccess && (
            data.products.map((item: allProduct, index: React.Key)=>{
              return(
                <div key={index}>
                  <CatalogItem isLoading={isLoading} data={item} />
                </div>
              )
            })
          )
        }
      </div>
    </div>
  )
}
