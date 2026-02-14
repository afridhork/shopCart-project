import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { count } from '@/models/brand';
import { product } from '@/models/product';
import brandImg from '@/static/brand-img';

const initialState: { topBrand: count[] } = {
  topBrand: [{ title: '', value: 0, img: '' }],
};

const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    setTopBrand: (state, action: PayloadAction<product>) => {
      const data = action.payload;
      const brand: string[] = [];
      const countBrand: { title: string; value: number }[] = [];
      const topBrand: count[] = [];
      const brandImage = brandImg;

      for (const product of data.products) {
        if (product.brand) brand.push(product.brand);
      }
      for (const b of brand) {
        const indexBrand = countBrand.findIndex((item) => item.title === b);
        if (indexBrand === -1) {
          countBrand.push({ title: b, value: 1 });
        } else {
          countBrand[indexBrand].value += 1;
        }
        countBrand.sort((a, b) => b.value - a.value);
      }
      for (let i = 0; i < 8 && i < countBrand.length; i++) {
        for (const j in brandImage) {
          if (j === countBrand[i].title) {
            topBrand.push({
              ...countBrand[i],
              img: brandImage[j as keyof typeof brandImage].src,
              name: '',
            });
          }
        }
      }
      state.topBrand = topBrand;
    },
  },
});

export const { setTopBrand } = brandSlice.actions;
export default brandSlice.reducer;
