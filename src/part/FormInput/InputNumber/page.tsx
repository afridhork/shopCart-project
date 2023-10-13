import React, { ChangeEvent } from 'react'

import './index.css'

export default function InputNumber(
  {
    maxNumber, 
    minNumber, 
    value, 
    name,
    onChange
  }:
  {
    maxNumber:number | any, 
    minNumber:number, 
    value:number, 
    name:string,
    onChange: (e:any) => void
  }) {

    const updateValue = (e: ChangeEvent<HTMLInputElement>) => {
      const target = e.target
      let value = String(target?.value);
      
      if (+value <= maxNumber && +value >= minNumber) {
         onChange({
            target: {
               name: name,
               value: value,
            },
         });
      }
    };
    const increase = () =>{
      if(value < maxNumber){
         onChange({
            target: {
               name:  name,
               value: value + 1
            },
         })
      }
    }

    const decrease = () =>{
      if(value > minNumber){
         onChange({
            target: {
               name:  name,
               value: value - 1
            },
         })
      }
   }
  return (
    <div className='form-wrapper'>
      <div className="input-number-wrapper">
        <div className="append" onClick={decrease}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-lime-900 w-4 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
          </svg>
        </div>
        <div className='input-number'>
          <input 
            type="number" 
            name={name} 
            value={value} 
            onChange={updateValue}
          />
        </div>
        <div className='prepend' onClick={increase}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-lime-900 w-4 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
        </svg>
        </div>
      </div>
    </div>
  )
}
