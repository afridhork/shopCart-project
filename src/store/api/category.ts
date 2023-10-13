import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCategory } from '@/models/category'
import { allProduct } from '@/models/product'

const configValue: string = `https://dummyjson.com`
export const categoryFetch = createApi({
   reducerPath:'categoryList',
   baseQuery : fetchBaseQuery({baseUrl: configValue}),
   endpoints:(builder) => ({
      categoryList: builder.query<getCategory, void>({
         query:()=>'/products/categories'
      }),
      allProduct: builder.query<allProduct[], void>({
         query:()=>'/products?limit=0'
      }),
   })
})


export const { useCategoryListQuery, useAllProductQuery } = categoryFetch