import { allProduct } from '@/models/product'
import React, {useState, useEffect} from 'react'
import Skeleton from 'react-loading-skeleton';

export default function ReviewProduct({data, isLoading}: {data?: any, isLoading: boolean}) {
  const [description, setDescription] = useState(data.description)
  useEffect(() => {
    console.log('cek review',data);
    
    const description = data.description
    const length = 20
    if(description){
      const descValue = description.substring(0,length)
      setDescription(descValue + '...')
    }
    
  }, [data])
  
  return (
    <div className='review-wrapper'>
      {/* <div className='flex sm:grid grid-cols-1 sm:grid-cols-3 gap-4'> */}
        {
          data ? (
            data.map((item: any,index: any) => {
              return(
                <div className='flex sm:grid grid-cols-1 sm:grid-cols-3 gap-4 py-5' key={index}>
                  <div className='col-span-1'>
                    {
                      isLoading ? <Skeleton className='h-[50px]'/> : (
                        <img src={item.images} alt="" />
                      )
                    }
                  </div>
                  <div className='col-span-1'>
                    <span className='block text-sm sm:text-2xl font-semibold'>{isLoading ? <Skeleton/> : item.title}</span>
                    <span className='hidden sm:block text-xs sm:text-sm text-gray-500'>{isLoading ? <Skeleton/> : item.description}</span>
                    <span className='sm:hidden block text-xs sm:text-sm text-gray-500'>{isLoading ? <Skeleton/> : description}</span>
                    <div className='flex justify-between sm:hidden col-span-1 text-end'>
                      {
                        isLoading ? <Skeleton/> : (<>
                          <span className='block text-xs sm:text-xl'>${((item.price - item.price * item.discountPercentage/100)).toFixed(0)}</span>
                          <span className='text-xs sm:text-base'>Quantity: {item.quantity}</span>
                        </>)
                      }
                    </div>
                  </div>
                  <div className='hidden sm:block col-span-1 text-end pr-5'>
                    {
                      isLoading ? <Skeleton/> : (<>
                        <span className='block tex-xs sm:text-xl'>${((item.price - item.price * item.discountPercentage/100)).toFixed(0)}</span>
                        <span className='text-xs sm:text-base'>Quantity: {item.quantity}</span>
                      </>)
                    }
                  </div>
                </div>
              )
            })
          ) : (
            <div className='flex sm:grid grid-cols-1 sm:grid-cols-3 gap-4 py-5'>
                <div className='col-span-1'>
                  <Skeleton className='h-[50px]'/>
                </div>
                <div className='col-span-1'>
                  <span className='block text-sm sm:text-2xl font-semibold'>{<Skeleton/>}</span>
                  <span className='hidden sm:block text-xs sm:text-sm text-gray-500'>{<Skeleton/>}</span>
                  <span className='sm:hidden block text-xs sm:text-sm text-gray-500'>{<Skeleton/>}</span>
                  <div className='flex justify-between sm:hidden col-span-1 text-end'>
                    {
                      <Skeleton/>
                    }
                  </div>
                </div>
                <div className='hidden sm:block col-span-1 text-end pr-5'>
                  {
                    <Skeleton/>
                  }
                </div>
              </div>
          )
        }
      {/* </div> */}
    </div>
  )
}
