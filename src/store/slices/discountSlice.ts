import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { product } from '@/models/product';

export interface DiscountItem {
  title: string;
  discountPercentage: number;
  description: string;
  rating: number;
  price: number;
  thumbnail: string;
  category: string;
  id: number;
}

const initialState: { discountItems: DiscountItem[] } = {
  discountItems: [
    {
      title: '',
      discountPercentage: 0,
      description: '',
      rating: 0,
      price: 0,
      thumbnail: '',
      category: '',
      id: 0,
    },
  ],
};

const discountSlice = createSlice({
  name: 'discount',
  initialState,
  reducers: {
    setDiscountItems: (state, action: PayloadAction<product>) => {
      const data = action.payload.products;
      const itemList: DiscountItem[] = data.map((item) => ({
        title: item.title,
        discountPercentage: item.discountPercentage,
        description: item.description,
        rating: item.rating,
        price: item.price,
        thumbnail: item.thumbnail,
        category: item.category ?? '',
        id: item.id ?? 0,
      }));
      const sorted = [...itemList].sort(
        (a, b) => b.discountPercentage - a.discountPercentage
      );
      state.discountItems = sorted.slice(0, 8);
    },
  },
});

export const { setDiscountItems } = discountSlice.actions;
export default discountSlice.reducer;
