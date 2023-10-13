import React, { useState } from 'react'

import './index.css'
import Skeleton from 'react-loading-skeleton'



export default function NavTab({
  data, 
  isActive,
  onClick,
  index,
  isLoading
}: 
{
  data:string,
  isActive: boolean,
  onClick: (index:number, active: boolean, name: string) => void,
  index: number,
  isLoading: boolean
}) {
  return (
    <div className='px-1 sm:px-5' onClick={()=>onClick(index, !isActive, data)}>
      {
        isLoading ? <Skeleton className='h-[20px] w-[100px]'/> : (
          <span className={`navTab-items ${isActive ? 'active' : ''}`}>{data}</span>
        )
      }
    </div>
  )
}
