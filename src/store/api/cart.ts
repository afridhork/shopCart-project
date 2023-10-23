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

export const cartPost = createApi({
   reducerPath:'cartPost',
   baseQuery : fetchBaseQuery({baseUrl: configValue}),
   endpoints:(builder) => ({
      addCart: builder.mutation<any, any>({
         query: payload =>({
            url: '/carts/add',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               userId: payload.userId,
               products: payload.products
             })
         })
      })
   })
})

export const { useUserCartQuery } = cartFetch
export const { useAddCartMutation } = cartPost