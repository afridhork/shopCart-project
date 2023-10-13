import Link from 'next/link'
import React, {useEffect, useState} from 'react'

export default function Breadcrumb({name}:{name:string[]}) {
   const [breadcrumb, setBreadcrumb] = useState([
      {name: 'Home'},
   ])
   let tempData = breadcrumb
   useEffect(() => {
      for(let i in name as any){
         tempData.push({name: name[i as any]})
      }
      const unique = [...new Map(tempData.map((m) => [m.name, m])).values()];
      setBreadcrumb(unique)
      
   },[])
   
  return (
    <div className='flex'>
      {
         breadcrumb.map((step,index) => {
            return(
               <div key={index}>
                  {
                     index != breadcrumb.length - 1 ? (
                        <Link href={`${index == 0 ? '/':`/category/${step.name}`}`}>
                           <span className='text-gray-500 text-sm sm:text-lg font-semibold mr-2' key={index}>{step.name + ' /'}</span>
                        </Link>
                     ):(
                        <span className='text-sm sm:text-lg font-semibold'>{step.name + ''}</span>
                     )
                  }
               </div>
            )
         })
      }
    </div>
  )
}
