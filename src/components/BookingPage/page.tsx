import Breadcrumb from '@/part/Breadcrumb/page';
import Button from '@/part/Button/page';
import InputNumber from '@/part/FormInput/InputNumber/page'
import Star from '@/part/Star/page'
import React, { ChangeEvent, useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css'
import { useAddCartMutation } from '@/store/api/cart';

interface addCart {
   userId: null | number,
   products: product[]
}

interface product{
   id: null | number,
   quantity: null | number
}

interface dataAuth{
   id: null | number,
   username: string,
   email: string,
   firstName: string,
   lastName: string,
   gender: string,
   image: string,
   token: string
}

export default function BookingPage(
   {
      data, 
      breadcrumbData,
      isLoading,
   }: 
   {
      data: any, 
      breadcrumbData: string[],
      isLoading: boolean
   }) {
   const [dataBook, setDataBook] = useState({
      totalBook: 1
   })
   const [errorMsg, setErrorMsg] = useState('')
   const [authData, setAuthData] = useState<dataAuth>({
    id: null,
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    gender: "",
    image: "",
    token: ""
})
   const [imgShow, setImgShow] = useState('')
   const [payloadAddCart, setPayloadAddCart] = useState<addCart>({
      userId:null,
      products:[
         {
            id:null,
            quantity:null
         }
      ]
   })
   const [addCart] = useAddCartMutation()
   
   useEffect(() => {
      const authData_local = JSON.parse(localStorage.getItem('auth data') as any)
      if(authData_local){
         setAuthData(authData_local.data)
      }
      if(data){
         setImgShow(data.thumbnail)
      }
   }, [data])

   useEffect(() => {
      if(authData && data){
         setPayloadAddCart({
            userId: authData.id,
            products:[
               {
                  id:data.id,
                  quantity: dataBook.totalBook
               }
            ]
         })
      }
   }, [data,dataBook])
   
   function handleAddCart(){
      if(authData){
         addCart(payloadAddCart)
      }else{
         setErrorMsg('You must sign in first')
      }
   }

   function handleClickChangeImg(image: string){
      setImgShow(image)
   }

   function updateData(e: ChangeEvent<HTMLInputElement>){      
		setDataBook(prev => ({
      ...prev,
			[e.target.name] : e.target.value
		}))
	}

   function startBooking(){
      localStorage.setItem('checkout data', JSON.stringify([
         {...data, images:imgShow, quantity: dataBook.totalBook}
      ]))
   }
   return (
      <div>
         {
            isLoading ? <Skeleton width="100px"/> : (
               <Breadcrumb name={breadcrumbData}/>
            )
         }
         <div className='grid grid-cols-1 sm:grid-cols-2 my-5 sm:my-10'>
            <div className='flex items-center min-h-[300px]'>
               {
                  isLoading ? <Skeleton height="500px" width="500px"/> : (
                     <img className='img-main rounded-xl' src={imgShow} alt="" />
                  )
               }
            </div>
            <div className='checkout-wrapper'>
               <div className='desc-wrapper'>
                  <span className='text-xl sm:text-3xl font-bold mb-5'>{isLoading ? <Skeleton/> : data.title}</span>
                  <p>{isLoading ? <Skeleton/> : data.description}</p>
                  <div className='rating-wrapper'>
                     {
                        isLoading ? <Skeleton width="100px"/> : (
                           <Star value={data.rating} height={20} width={20} spacing={0} />
                        )
                     }
                     <p>{isLoading ? <Skeleton/> : (data.rating)}</p>
                  </div>
                  <div className="border-b-2 py-2">
                     {
                        isLoading ? <Skeleton/> : (<>
                           <h3 className="font-semibold">${(data.price - data.price * data.discountPercentage/100).toFixed(1)}</h3>
                        </>)
                     }
                     <div className="flex items-center">
                        {
                           isLoading ? <Skeleton width="50px"/> : (
                              <>
                                 <h6 className="font-semibold text-gray-500 line-through mr-2">${data.price}</h6>
                                 <p className="text-red-500 bg-red-100 rounded-md p-1">-{data.discountPercentage.toFixed(0)}%</p> 
                              </>
                           )
                        }
                     </div>
                  </div>
                  <div className="flex items-center overflow-x-auto whitespace-nowrap mt-5 border-b-2 pb-1">
                     {
                        isLoading ? <Skeleton width="380px" height="50px"/> : (
                           data?.images?.map((image: any,index: any) =>{
                              return(
                                 <div className="flex items-center cursor-pointer p-1 mr-2 h-20 hover:border-2" onClick={()=>handleClickChangeImg(image)} key={index}>
                                    <img className='img-slide' src={image} width="100" alt="" />
                                 </div>
                              )
                           })
                        )
                     }
                  </div>
                  <div className='flex mt-5'>
                     <InputNumber 
                        value={dataBook.totalBook} 
                        name="totalBook" 
                        maxNumber={isLoading ? <Skeleton/> : data.stock as number}
                        minNumber={1}
                        onChange={updateData}
                     />
                     <div className='ml-3'>
                        {
                           isLoading ? <Skeleton width="50px"/> : (
                              <h4>Stok : {data.stock}</h4>
                           )
                        }
                     </div>
                  </div>
                  <div className='flex justify-between mt-4'>
                     <div className='mr-4'>
                        <Button href="/checkout" onClick={startBooking} name="Buy Now" isPrimary/>
                     </div>
                     <Button name="Add to Cart" onClick={handleAddCart} isSecondary/>
                     {
                        errorMsg && (<p className="text-red-600">{errorMsg}</p>)
                     }
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
