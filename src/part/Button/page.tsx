import React from 'react'

import './index.css'
import { useRouter } from 'next/navigation';

export default function Button(
   {
      name,
      href,
      onClick,
      isPrimary,
      isSecondary,
      isSmall,
      isBlock,
      isModal,
      isDisabled
   }:{
      name: string,
      href?: string,
      onClick?: Function,
      isPrimary?: boolean,
      isSecondary?: boolean,
      isSmall?: string,
      isBlock?: boolean,
      isModal?: boolean,
      isDisabled?: boolean
   }) {
      const router = useRouter()
      const className = [];
      if (isPrimary) className.push("btn-primary");
      if (isSecondary) className.push("btn-secondary");
      if (isSmall) className.push("btn-sm");
      if (isBlock) className.push("btn-block");
      if (isModal) className.push("btn-modal");
      if (isDisabled) className.push("disabled");

      if(href){
         return(
            <button
               className={`btn ${className.join(' ')}`} 
                  onClick={()=>{
                     if(onClick){
                        onClick()
                     }
                     router.push(href)
                  }
               } 
            >
               <span className="text-sm sm:text-base">{name}</span>
            </button>
         )
      }
  return (
    <div>
      <button className={`btn ${className.join(' ')}`} onClick={()=> onClick && (onClick()) }>
         <span className="text-sm sm:text-base">{name}</span>
      </button>
    </div>
  )
}
