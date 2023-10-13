import React, { ChangeEvent } from 'react'

export default function InputTextArea({
   type, 
   value, 
   onChange,
   name
}: 
{
   type: string, 
   value?:string,
   onChange?: (e:any)=>void,
   name: string
}) {
   function handleChangeinput(e:ChangeEvent<HTMLTextAreaElement>){
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
      <textarea 
         className='border rounded-md w-full py-1 px-2 focus:outline-none' 
         placeholder="Type Here..."
         name={name}
         value={value}
         onChange={handleChangeinput}
      />
    </div>
  )
}
