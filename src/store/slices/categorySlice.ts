import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { product } from '@/models/product';

export interface CategoryItem {
  name: string;
  active: boolean;
}

const initialState: { categoryItems: CategoryItem[] } = {
  categoryItems: [{ name: '', active: false }],
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategoryItems: (state, action: PayloadAction<product>) => {
      const data = action.payload;
      const categoryList: CategoryItem[] = [];
      const seen = new Set<string>();

      for (const product of data.products) {
        const cat = product.category;
        if (cat && !seen.has(cat)) {
          seen.add(cat);
          categoryList.push({
            name: cat,
            active: cat === 'smartphones',
          });
        }
      }
      state.categoryItems = categoryList;
    },
  },
});

export const { setCategoryItems } = categorySlice.actions;
export default categorySlice.reducer;
