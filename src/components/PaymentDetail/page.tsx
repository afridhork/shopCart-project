import InputRadio from '@/part/FormInput/inputRadio/page'
import React, { ChangeEvent, useState } from 'react'

interface payment {
   name: string,
   value: boolean
}

export default function PaymentDetail() {
      const [payment, setPayment] = useState([
         {name: 'Cash on Delivery', value: false},
         {name: 'Shopcart Card', value: false},
         {name: 'Paypal', value: false},
         {name: 'Credit or Debit Card', value: false}
       ])
       function paymentChangeClick(name: string){
         setPayment(prevData =>{
           const updatedData = prevData.map((item, i) => ({
             ...item,
             value: item.name === name,
           }));
           // updatedData[index] = { ...updatedData[index], active: newActive };
           return updatedData;
         })
       }
  return (
    <div>
      <h4 className="border-y-2 py-3">Payment Detail</h4>
      <div className="block">
         {
            payment.map((item, index) => {
               return(
                <div key={index}>
                  <InputRadio data={item} index={index} onClick={paymentChangeClick} />
                </div>
               )
            })
         }
      </div>
    </div>
  )
}
