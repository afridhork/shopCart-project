import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { allProduct, product } from '@/models/product'

const configValue: string = `https://dummyjson.com`
export const productFetch = createApi({
   reducerPath:'product',
   baseQuery : fetchBaseQuery({baseUrl: configValue}),
   endpoints:(builder) => ({
      allProduct: builder.query<product, void>({
         query:()=>'/products?limit=0'
      }),
      categoryProduct: builder.query<product, string>({
         query:(name)=>`/products/category/${name}`
      }),
      searchProduct: builder.query<product, string>({
         query:(name)=>`/products/search?q=${name}`
      }),
      singleProduct: builder.query<allProduct, number>({
         query:(id)=>`/products/${id}`
      })
   })
})


export const { 
   useAllProductQuery, 
   useCategoryProductQuery, 
   useSearchProductQuery,
   useSingleProductQuery
} = productFetch