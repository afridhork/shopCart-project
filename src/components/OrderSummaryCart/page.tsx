import React, { ChangeEvent, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { productCart } from '@/models/cart'
import Button from '@/part/Button/page'
import Skeleton from 'react-loading-skeleton'

export default function OrderSummary({isLoading}: {isLoading: boolean}) {
  const data = useSelector((state: RootState) => state.dataCart.cartData)
  const [orderPrice, setOrderPrice] = useState({
    price:0,
    discount:0,
    total:0
  })
  const [dataOrder, setDataOrder] = useState<productCart[]>()
  useEffect(() => {
    const newData: productCart[] = []
    const imgShow = ''
    let tempData
    data.map((item,index) => {
      tempData = {...item, images:imgShow}
      if(item.value){
        newData.push(tempData as any)
      }
    })
    setDataOrder(newData)
  }, [data])
  
  function countPriceAndDiscount(type: string){
    if (dataOrder?.length != 0){
      
      let priceOrder: any, discountOrder: any, totalOrder
      if(type == 'price'){
        priceOrder = dataOrder?.reduce((accumulator, currentValue) => +accumulator + (+currentValue.price * currentValue.quantity), 0 )
        // setOrderPrice(prev => ({
        //   ...prev,
        //   price:priceOrder
        // }))
        return priceOrder
      }else if(type == 'discount'){
        discountOrder = dataOrder?.reduce((accumulator, currentValue) => +accumulator + ((+currentValue.price * currentValue.quantity) * +currentValue.discountPercentage/100), 0 )
        // setOrderPrice(prev => ({
        //   ...prev,
        //   discount:discountOrder
        // }))
        if(discountOrder){
          return discountOrder.toFixed(0)
        }
      }
    }else{
      return 0
    }
  }

  function handleClickOrderCart(){
    const imgShow = ''
    localStorage.setItem('checkout data', JSON.stringify(dataOrder))
  }

  useEffect
  
  
  return (
    <>
      <div className="hidden sm:block bg-white border-0 sm:border-2 w-full">
        <div className="px-0 sm:px-5 sm:p-10">
          <h2 className='hidden sm:inline font-semibold'>{isLoading ? <Skeleton/> : 'Order Summary'}</h2>
          <div className={`flex justify-between text-slate-500 mt-5 ${dataOrder?.length == 0 ? 'border-b pb-5' : ''}`}>
            {
              isLoading ? <Skeleton className="w-[200px] h-[30px]"/> : (
                <>
                  <h5>Total Harga ({`${dataOrder?.length}`} barang)</h5>
                  <h5>{`$${countPriceAndDiscount('price')}`}</h5>
                </>
              )
            }
          </div>
          <div className={`flex justify-between text-slate-500 pb-5 border-b ${dataOrder?.length == 0 ? 'hidden' : ''}`}>
            {
              isLoading ? <Skeleton className="w-[200px] h-[30px]"/> : (<>
                <h5>Total Diskon Barang</h5>
                <h5>{`- $${countPriceAndDiscount('discount')}`}</h5>
              </>)
            }
          </div>
          <div className="flex justify-between pb-5">
            {
              isLoading ? <Skeleton className="w-[200px] h-[30px]"/> : (<>
                <h2 className="font-bold">Total</h2>
                <h5>${countPriceAndDiscount('price') - countPriceAndDiscount('discount')}</h5>
              </>)
            }
          </div>
          <Button 
            name={`Buy (${dataOrder?.length})`} 
            href="/checkout"
            onClick={handleClickOrderCart}
            isPrimary={dataOrder?.length == 0 ? false : true}
            isDisabled={dataOrder?.length != 0 ? false : true}
            isBlock
          />
        </div>
      </div>
      <div className="block sm:hidden fixed inset-x-0 bottom-0 bg-white w-full">
        <div className="flex static justify-between p-3">
          <div>
            <h6>Total Harga ({`${dataOrder?.length}`} barang)</h6>
            <h5>${countPriceAndDiscount('price') - countPriceAndDiscount('discount')}</h5>
          </div>
          <Button 
            name={`Buy (${dataOrder?.length})`} 
            href="/checkout"
            onClick={handleClickOrderCart}
            isPrimary={dataOrder?.length == 0 ? false : true}
            isDisabled={dataOrder?.length != 0 ? false : true}
          />
        </div>
      </div>
    </>
  )
}
