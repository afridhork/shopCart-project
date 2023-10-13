import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { userCart } from '@/models/cart'

const configValue: string = `https://dummyjson.com`
export const cartFetch = createApi({
   reducerPath:'cart',
   baseQuery : fetchBaseQuery({baseUrl: configValue}),
   endpoints:(builder) => ({
      userCart: builder.query<userCart, number>({
         query:(id)=>`/cart/user/${id}`
      })
   })
})


export const { useUserCartQuery } = cartFetch