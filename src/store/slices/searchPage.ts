import { createSlice } from "@reduxjs/toolkit";
import { count } from '@/models/brand';

const SearchPage = createSlice({
   name: "SearchPage",
   initialState:{
      searchData:[{
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
      searchData: (state, action) =>{
         const data = action.payload
         state.searchData = data.products
      }
   }
})

export const {searchData} = SearchPage.actions
export default SearchPage.reducer