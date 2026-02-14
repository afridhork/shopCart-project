import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { product } from '@/models/product';

export interface RatingItem {
  title: string;
  discountPercentage: number;
  description: string;
  rating: number;
  price: number;
  thumbnail: string;
}

const initialState: { ratingItems: RatingItem[] } = {
  ratingItems: [
    {
      title: '',
      discountPercentage: 0,
      description: '',
      rating: 0,
      price: 0,
      thumbnail: '',
    },
  ],
};

const ratingSlice = createSlice({
  name: 'rating',
  initialState,
  reducers: {
    setRatingItems: (state, action: PayloadAction<product>) => {
      const data = action.payload.products;
      const itemList: RatingItem[] = data.map((item) => ({
        title: item.title,
        discountPercentage: item.discountPercentage,
        description: item.description,
        rating: item.rating,
        price: item.price,
        thumbnail: item.thumbnail,
      }));
      const sorted = [...itemList].sort((a, b) => b.rating - a.rating);
      state.ratingItems = sorted.slice(0, 8);
    },
  },
});

export const { setRatingItems } = ratingSlice.actions;
export default ratingSlice.reducer;
