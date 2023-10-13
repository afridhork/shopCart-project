import React, { ChangeEvent } from 'react'

import './index.css'

interface voucher{
  voucher: string,
  discountPercentage: number
}

export default function InputVoucher(
  {
    value,
    name,
    onClick,
    onChange
  }: 
  {
    value: string,
    name: string,
    onClick: Function,
    onChange: (e:any)=>void
  }) {
    function handleChangeinput(e:ChangeEvent<HTMLInputElement>){
      const target = e.target
      let value = String(target?.value);

      if(onChange){
         onChange({
            target: {
               name: name,
               value: value
            }
         })
      }
   }
  return (
    <div>
      <div className='input-wrapper'>
         <input 
            type="text" 
            placeholder='Enter Coupon Code'
            name={name}
            value={value}
            onChange={handleChangeinput}
         />
         <div className='voucher-button' onClick={()=>onClick()}>
            Apply Button
         </div>
      </div>
    </div>
  )
}
