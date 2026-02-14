import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { allProduct } from '@/models/product';

const initialState: { checkoutData: allProduct[] } = {
  checkoutData: [],
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setCheckoutData: (state, action: PayloadAction<allProduct[]>) => {
      state.checkoutData = action.payload;
    },
  },
});

export const { setCheckoutData } = checkoutSlice.actions;
export default checkoutSlice.reducer;
