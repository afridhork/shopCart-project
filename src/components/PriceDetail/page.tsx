import Button from '@/part/Button/page'
import Modal from '@/part/Modal/page'
import React, { useEffect, useState } from 'react'
import checkLogo from '@/assets/images/check.png'
import type { productCart } from '@/models/cart'
import type { allProduct } from '@/models/product'
import { getStoredDeliveryInfo } from '@/lib/storage'

export default function PriceDetail({ data, voucher }: { data: (productCart | allProduct)[]; voucher: number }) {
   const [openModal, setOpenModal] = useState(false)
   const [isFormFinished, setIsFormFinished] = useState(false)
   const [isValidate, setIsValidate] = useState(false)

   useEffect(() => {
      sectionPrice()
   }, [data])
   

   const [priceDetail, setPriceDetail] = useState({
      productTotal:0,
      priceTotal:0,
      taxTotal:0,
      finalPrice:0
   })

   function sectionPrice() {
      const productSum = data.reduce((acc, currValue) => acc + Number((currValue as productCart).quantity ?? 1), 0)
      setPriceDetail(prev=>({
         ...prev,
         productTotal:productSum
      }))
      
      const priceSum = data.reduce((acc, currValue) => acc + (Number(currValue.price) - (Number(currValue.discountPercentage) / 100 * Number(currValue.price))), 0)
      setPriceDetail(prev=>({
         ...prev,
         priceTotal: Number(priceSum.toFixed(0))
      }))

      const tax = priceSum * 0.1
      setPriceDetail(prev=>({
         ...prev,
         taxTotal:+tax.toFixed(0)
      }))

      const final = priceSum - tax
      setPriceDetail(prev=>({
         ...prev,
         finalPrice: +final.toFixed(0)
      }))
   }

   function handleClickModal(){
      const checkForm = getStoredDeliveryInfo()
      if (!checkForm) {
        setIsFormFinished(false)
        setIsValidate(true)
        setOpenModal(false)
        return
      }
      const entries = Object.entries(checkForm)
      for (const [, value] of entries) {
         if (value) {
            setIsFormFinished(true)
            setOpenModal(prev => !prev)
            setIsValidate(false)
         }else{
            setIsFormFinished(false)
            setIsValidate(true)
            setOpenModal(false)
         }
      }
   }

   const ModalContent = () =>{
      return(
         <div className="relative transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all h-96 sm:w-full sm:max-w-xs">
            <div className="bg-modal-upper h-1/3 px-4 pb-4 mb-20 pt-5 sm:p-6 sm:pb-4">
            </div>
            <img className='img-modal' src={checkLogo.src} width="90" alt="" />
            <div>
               <h4 className='text-center font-semibold px-12'>Your order has been accepted</h4>
            </div>
            <div className="mt-12 px-4 py-3 sm:flex sm:justify-center sm:px-6">
               <Button isModal name="Continue Shopping" onClick={()=>handleClickModal()}/>
            </div>
         </div>
      )
   }

  return (
    <div>
      <div>
         <div className="flex justify-between">
            <h5 className="font-semibold">Sub Total ({`${priceDetail.productTotal} ${priceDetail.productTotal!=1?'products':'product'}`})</h5>
            <h5 className="font-semibold">${priceDetail.priceTotal}</h5>
         </div>
         <div className="flex justify-between">
            <h5 className="font-semibold">Tax Total (10%)</h5>
            <h5 className="font-semibold">- ${priceDetail.taxTotal}</h5>
         </div>
      </div>
      <div className="pt-5">
         <div className="flex justify-between">
            <h5 className="font-semibold">Total</h5>
            <h5 className="font-semibold">${priceDetail.finalPrice}</h5>
         </div>
      </div>
      <div className='text-center mt-8'>
         <Button name={`Pay $${priceDetail.finalPrice}`} isPrimary isBlock onClick={handleClickModal}/>
         {
            isValidate && (<p className='text-red-600'>Delivery Information need to be filled</p>)
         }
      </div>
      {
         openModal && (<Modal content={ModalContent()}/>)
      }
    </div>
  )
}
