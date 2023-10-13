import { productCart } from '@/models/cart'
import InputCheckBox from '@/part/FormInput/InputCheckBox/page'
import { CartData } from '@/store/slices/cartPage'
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useDispatch } from 'react-redux'

export default function CartList({data, isLoading}:{data: productCart[], isLoading: boolean}) {
   const dispatch = useDispatch()
   const [allItemValue, setAllItemValue] = useState(false)
   const [itemList, setItemList] = useState(data)
   useEffect(() => {
      setItemList(prev => {
         const newData = [...prev]
         newData.map((item,index) =>{
            newData[index] = {...item, value:false}
         })
         return newData
      })
   },[])
   
   function handleClickCheckbox(index?:number){
      if(typeof index != 'undefined'){
         setItemList(prev => {
            const newData = [...prev]
            newData[index] = {...newData[index], value:!newData[index].value}
            return newData
         })
      }else{
         setAllItemValue(prev=> !prev)
            setItemList(prev=> {
               const newData = [...prev]
               newData.map((item,index) =>{
               newData[index] = {...item, value:!newData[index].value}
            })
            return newData
         })
      }
   }
   
   useEffect(() => {
      dispatch(
         CartData(itemList)
      )
   }, [itemList])
   
   return (
      <div className='cartList-wrapper'>
         <div className='flex'>
            <InputCheckBox value={allItemValue} onClick={()=>handleClickCheckbox()} />
            {
               isLoading ? <Skeleton className='w-[100px]'/> : (
                  <span className='block ml-3 text-sm sm:text-2xl font-semibold'>Select All</span>
               )
            }
         </div>
         {
            data.map((items, index) => {
               return (
                  <div className='grid grid-cols-1 border-b sm:grid-cols-2 gap-4 py-5' key={index}>
                     <div className='col-span-1'>
                        <div className='flex'>
                           {
                              itemList[index].value != undefined && (
                                 <InputCheckBox value={itemList[index].value} onClick={()=>handleClickCheckbox(index)} />
                              )
                           }
                           <span className='block ml-3 text-sm sm:text-2xl font-semibold'>{isLoading ? <Skeleton className='block w-[300px] h-[50px]'/> : items.title}</span>
                        </div>
                        <div className='flex justify-end sm:hidden col-span-1 text-end'>
                           <div className='flex justify-end mr-2'>
                              <span className='block text-sm'>${isLoading ? <Skeleton/> : ((+items.discountedPrice)).toFixed(0)}</span>
                              <span className='block text-red-500 text-xs line-through'>${isLoading ? <Skeleton/> : ((+items.price * items.quantity)).toFixed(0)}</span>
                           </div>
                           <span className='text-sm'>{isLoading ? <Skeleton/> : `Quantity: ${items.quantity}`}</span>
                        </div>
                     </div>
                     <div className='hidden sm:block col-span-1 text-end pr-5'>
                        <div className='flex justify-end'>
                           <span className='block tex-xs sm:text-xl'>{isLoading ? <Skeleton className='w-[50px]'/> : `${((+items.discountedPrice)).toFixed(0)}`}</span>
                           <div className='flex'>
                              {
                                 isLoading ? <Skeleton/> : (<>
                                    <span className='block text-red-500 tex-xs sm:text-xs line-through'>{`${((+items.price * items.quantity)).toFixed(0)}`}</span>
                                    <span className="text-xs text-red-500 bg-red-100 rounded-md p-1">-{items.discountPercentage.toFixed(0)}%</span>
                                 </>)
                              }
                           </div>
                        </div>
                        <span className='text-xs sm:text-base'>{isLoading ? <Skeleton/> : `Quantity: ${items.quantity}`}</span>
                     </div>
                  </div>
               )
            })
         }
      </div>
   )
}
