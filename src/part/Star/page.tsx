import { star } from '@/models/star'
import React from 'react'


import './index.css'
export default function Star({ value, height, width, spacing }: star) {
   const decimals = value % 1
   const star = []
   let decimal_index = 0
   let left_post = 0
   for(let i = 0; i < value - decimals; i++) {
      left_post = left_post + width
      decimal_index = i + 1
      star.push(
         <div
            className='star'
            style={{
               left: i*width,
               height: height,
               width: width,
               marginRight: spacing
            }}
            key={`main-${i}`}
         ></div>
      )
      if(decimals > 0 && value < 5){
         star.push(
            <div
               className='star'
               style={{
                  left: left_post,
                  height:height,
                  width: decimals * width - spacing
               }}
               key={decimal_index}
            ></div>
         )
      }
   }
   const starPlaceholder = []
   for(let index = 0; index < 5; index++) {
      starPlaceholder.push(
         <div 
            className="star placeholder"
            style={{
               left: index*width,
               height: height,
               width: width
            }}
            key={`placeholder-${index}`}
         ></div>
      )
   }
   return (
      <div className='stars'>
         {starPlaceholder}
         {star}
      </div>
   )
}
