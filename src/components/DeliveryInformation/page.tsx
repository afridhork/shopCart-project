import InputCheckBox from '@/part/FormInput/InputCheckBox/page'
import InputText from '@/part/FormInput/inputText/page'
import React, { ChangeEvent, useEffect, useState } from 'react'

import { address } from '@/static/dummyAddress'
import { DeliveryInformationModel, dataUserModel } from '@/models/checkout'
import InputTextArea from '@/part/FormInput/InputTextArea/page'

export default function DeliveryInformation() {
   const [valueCheckbox, setValueCheckbox] = useState(false)
   const [errMsgCheckbox, setErrMsgCheckbox] = useState('')
   const [dataUser, setDataUser] = useState<dataUserModel>({
      email:'',
      firstName:'',
      gender:'',
      id:0,
      image: '',
      phone:'',
      address: "",
      city: "",
      postalCode: "",
      lastName:'',
      token:'',
      username:''
   })
   const [deliveryInformation, setDeliveryInformation] = useState<DeliveryInformationModel>({
      firstName:'',
      lastName:'',
      address:'',
      city:'',
      postalCode:'',
      phone:'',
      email:'',
   })

   useEffect(() => {
      const data = JSON.parse(localStorage.getItem('auth data') as any)
      if(data){
         data.data = {
            ...data.data,
            address: address.address, 
            phone: address.phone,
            postalCode: address.postalCode,
            city: address.city
         }
         setDataUser(data.data)
      }
   }, [])
   
   useEffect(() => {
      localStorage.setItem('delivery info', JSON.stringify(deliveryInformation)) 
   }, [deliveryInformation])
   
   function handleChangeFormText(e:ChangeEvent<HTMLInputElement>){
      setDeliveryInformation(prev => ({
         ...prev,
         [e.target.name] : e.target.value
      }))
   }

   function handleChangeFormTextArea(e:ChangeEvent<HTMLTextAreaElement>){
      setDeliveryInformation(prev => ({
         ...prev,
         [e.target.name] : e.target.value
      }))
   }

   function handleClickCheckbox(){
      if(dataUser.token){
         setValueCheckbox(prev => !prev)
         setErrMsgCheckbox('')
         setDeliveryInformation(prev => {
            const newData = {...prev}
            for(let i in dataUser){
               for(let j in newData){
                  if(i == j){
                     if(j == 'address' || j == 'city' || j == 'postalCode' || j == 'phone'){
                        newData[j] = dataUser[j]
                     }else{
                        newData[j as keyof DeliveryInformationModel] = String(dataUser[i as keyof dataUserModel])
                     }
                  }
               }
            }
            return newData
         })
         // setDeliveryInformation(prev => prev)
      }else{
         setValueCheckbox(false)
         setErrMsgCheckbox('You must sign in first')
      }
   }
  return (
    <div>
      <div>
         <div className="flex items-center">
            <InputCheckBox value={valueCheckbox} onClick={handleClickCheckbox}/>
            <h5 className="ml-3">Returning Customer</h5>
         </div>
         {
            errMsgCheckbox && (<p className="text-red-600">{errMsgCheckbox}</p>)
         }
      </div>
      {
         !valueCheckbox ? (
            <div className='border-2 p-5'>
               <h2 className="font-blodl mb-5">Delivery information</h2>
               <div className="grid grid-cols-2 gap-10 mb-5">
                  <div className="col-span-1">
                     <label className='font-semibold' htmlFor="FirstName">First Name*</label>
                     <InputText 
                        value={deliveryInformation.firstName} 
                        onChange={handleChangeFormText} 
                        name="firstName" 
                        type="text" 
                     />
                  </div>         
                  <div className="col-span-1">
                     <label className='font-semibold' htmlFor="LastName">Last Name*</label>
                     <InputText 
                        value={deliveryInformation.lastName} 
                        onChange={handleChangeFormText} 
                        name="lastName" 
                        type="text"
                     />
                  </div>         
               </div>
               <div className="grid grid-cols-2 gap-10 mb-5">
                  <div className="col-span-2">
                     <label className='font-semibold' htmlFor="LastName">Address*</label>
                     <InputTextArea
                        value={deliveryInformation.address} 
                        onChange={handleChangeFormTextArea} 
                        name="address" 
                        type="text area" 
                     />
                  </div>         
               </div>
               <div className="grid grid-cols-2 gap-10 mb-5">
                  <div className="col-span-1">
                     <label className='font-semibold' htmlFor="FirstName">City/Town*</label>
                     <InputText 
                        value={deliveryInformation.city} 
                        onChange={handleChangeFormText} 
                        name="city" 
                        type="text" 
                     />
                  </div>         
                  <div className="col-span-1">
                     <label className='font-semibold' htmlFor="LastName">Postal Code*</label>
                     <InputText 
                        value={deliveryInformation.postalCode} 
                        onChange={handleChangeFormText} 
                        name="postalCode" 
                        type="text"
                     />
                  </div>         
               </div>
               <div className="grid grid-cols-2 gap-10 mb-5">
                  <div className="col-span-1">
                     <label className='font-semibold' htmlFor="FirstName">Phone Number*</label>
                     <InputText 
                        value={deliveryInformation.phone} 
                        onChange={handleChangeFormText} 
                        name="phone" 
                        type="text" 
                     />
                  </div>         
                  <div className="col-span-1">
                     <label className='font-semibold' htmlFor="LastName">Email*</label>
                     <InputText 
                        value={deliveryInformation.email} 
                        onChange={handleChangeFormText} 
                        name="email" 
                        type="text"
                     />
                  </div>         
               </div>
            </div>
         ):(
            <div className='border-2 p-5'>
               <h2 className="font-bold mb-5">Delivery information</h2>
               <div className="grid grid-row-4 gap-1">
                  <h5 className='font-semibold'>{dataUser.firstName + ' ' + dataUser.lastName}</h5>
                  <h6>{`${dataUser.address}, ${dataUser.city} ${dataUser.postalCode}`}</h6>
                  <h6>{dataUser.phone}</h6>
                  <h6>{dataUser.email}</h6>
               </div>
            </div>
         )
      }
    </div>
  )
}
