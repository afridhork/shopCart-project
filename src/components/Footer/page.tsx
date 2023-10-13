import React, { useEffect } from 'react'
import logo from '@/assets/images/icon-logo/logo.svg'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { useAllProductQuery } from '@/store/api/category'
import { categoryItem } from '@/store/slices/landingPage'

export default function Footer() {
   const {data,isSuccess,isLoading} = useAllProductQuery()

   const dispatch = useDispatch()
   useEffect(() => {
      if(isSuccess) {
         dispatch(
            categoryItem(data)
         )
      }
   }, [data])
  const dataCategory = useSelector((state: RootState)=>state.dataCategory.categoryItems)
   
  return (
   <>
   {
      isSuccess && (
         <div className="container px-10 mx-auto">
            <div className="pt-5 sm:pt-20 grid grid-rows-4 sm:grid-rows-1 grid-cols-1 sm:grid-cols-6 gap-0 sm:gap-12 border-y-2">
               <div className='row-span-1 sm:col-span-2'>
                  <img width="200" src={logo.src} alt="" />
                  <h5 className="pt-12 sm:pt-16">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.</h5>
               </div>
               <div className="row-span-2 sm:col-span-2">
                  <h3>Departmen</h3>
                  <ul className="pt-5">
                     <div className="grid grid-cols-2 gap-x-0">
                        {
                           dataCategory.map((item,index)=>{
                              return(
                                 <li className="footer-list mb-2" style={{minWidth:'130px'}} key={index}>{item.name}</li>
                              )
                           })
                        }
                     </div>
                  </ul>
               </div>
               <div className="row-span-1 sm:col-span-1">
                  <h3>About Us</h3>
                  <ul className="pt-5">
                     <li className="footer-list mb-2">Gift Card</li>
                     <li className="footer-list mb-2">Mobile App</li>
                     <li className="footer-list mb-2">Shipping & Delivery</li>
                     <li className="footer-list mb-2">Order Pickup</li>
                     <li className="footer-list mb-2">Account Signup</li>
                  </ul>
               </div>
               <div className="row-span-1 sm:col-span-1 pt-8 sm:pt-0">
                  <h3>Help</h3>
                  <ul className="pt-5">
                     <li className="footer-list mb-2">Shopcart Help</li>
                     <li className="footer-list mb-2">Returns</li>
                     <li className="footer-list mb-2">Track Orders</li>
                     <li className="footer-list mb-2">Contact Us</li>
                     <li className="footer-list mb-2">Feedback</li>
                     <li className="footer-list mb-2">Security & Fraud</li>
                  </ul>
               </div>
            </div>
         </div>
      )
   }
   </>
  )
}
