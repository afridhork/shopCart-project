import InputVoucher from '@/part/FormInput/InputVoucher/page'
import React, { ChangeEvent, useState } from 'react'
import PaymentDetail from '../PaymentDetail/page'
import PriceDetail from '../PriceDetail/page'
import { dummyVoucher } from '@/static/dummyVoucher'

export default function OrderSummary({data}: {data: any}) {
  const [discount, setDiscount] = useState({
    voucher: '',
    discountPercentage: 0
  })
  const [errMsgDiscount, setErrMsgDiscount] = useState('')

  function handleClickAddDiscount(){
    if(discount.voucher.trim() == dummyVoucher.voucher.trim()){
      setDiscount(prev => ({
        ...prev,
        discountPercentage: dummyVoucher.discountPercentage
      }))
      setErrMsgDiscount('')
    }else{
      setErrMsgDiscount('Voucher not found')
    }
  }
  function handleChangeDiscount(e: ChangeEvent<HTMLInputElement>) {    
    setDiscount(prev => ({
      ...prev,
      [e.target.name] : e.target.value
    }))
  }
  return (
    <div className="border-0 sm:border-2 w-full">
      <div className="px-5 sm:p-10">
        <h2 className='hidden sm:inline font-semibold'>Order Summary</h2>
        <div className="py-2 sm:py-8">
          <InputVoucher 
            name="voucher" 
            value={discount.voucher} 
            onClick={handleClickAddDiscount} 
            onChange={handleChangeDiscount}
          />
          {
            errMsgDiscount && (<p className="text-red-600">{errMsgDiscount}</p>)
          }
        </div>
        <div className="py-1 sm:py-5">
          <PaymentDetail />
        </div>
        <PriceDetail data={data} voucher={discount.discountPercentage} />
      </div>
    </div>
  )
}
