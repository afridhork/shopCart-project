import { createSlice } from "@reduxjs/toolkit";
import { count } from '@/models/brand';

const CheckoutPage = createSlice({
   name: "CheckoutPage",
   initialState:{
      checkoutData:[{
         id: 0,
         title: '',
         description: '',
         price: '',
         discountPercentage: 0,
         rating: 0,
         stock: 0,
         brand: '',
         category: '',
         thumbnail: '',
         images: []
      }]
   },
   reducers:{
      checkoutData: (state, action) =>{
         const data = action.payload
         state.checkoutData = data
      }
   }
})

export const {checkoutData} = CheckoutPage.actions
export default CheckoutPage.reducer