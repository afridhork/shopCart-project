import { createSlice } from "@reduxjs/toolkit";
import { count } from '@/models/brand';

const CartPage = createSlice({
   name: "CartPage",
   initialState:{
      cartData:[{
         id: 0,
         title: '',
         price: '',
         discountPercentage: 0,
         discountPrice: 0,
         value: false,
      }]
   },
   reducers:{
      CartData: (state, action) =>{
         const data = action.payload
         state.cartData = data
      }
   }
})

export const {CartData} = CartPage.actions
export default CartPage.reducer