import React, { useState } from 'react'

export default function InputCheckBox(
  {
    value,
    onClick
  }: 
  {
    value: boolean | undefined,
    onClick: () => void
  }) {
    // const [first, setfirst] = useState(second)
  return (
   <div className="flex items-center cursor-pointer" onClick={()=>onClick()}>
      <input type="checkbox" checked={value} readOnly />
      {/* <h5 className="ml-3">Returning Customer</h5> */}
   </div>
  )
}
