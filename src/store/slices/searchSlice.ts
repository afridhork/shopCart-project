import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { product, allProduct } from '@/models/product';

const initialState: { searchData: allProduct[] } = {
  searchData: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchData: (state, action: PayloadAction<product>) => {
      state.searchData = action.payload.products ?? [];
    },
  },
});

export const { setSearchData } = searchSlice.actions;
export default searchSlice.reducer;
