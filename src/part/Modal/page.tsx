import React, { ReactNode } from 'react'

import './index.css'

export default function Modal({content}:{content: ReactNode}) {
  return (
   <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
   
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
         <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            {content}
         </div>
      </div>
   </div>
 
  )
}
