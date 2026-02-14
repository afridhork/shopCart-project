import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { productCart } from '@/models/cart';

const initialState: { cartData: productCart[] } = {
  cartData: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    CartData: (state, action: PayloadAction<productCart[]>) => {
      state.cartData = action.payload;
    },
  },
});

export const { CartData } = cartSlice.actions;
export default cartSlice.reducer;
