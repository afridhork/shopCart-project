import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const configValue: string = `https://dummyjson.com`
export const authSection = createApi({
   reducerPath:'auth',
   baseQuery : fetchBaseQuery({baseUrl: configValue}),
   endpoints:(builder) => ({
      signin: builder.mutation<any, any>({
         query: payload =>({
            url: '/auth/login',
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               username: payload.username,
               password: payload.password
             })
         })
      })
   })
})


export const { useSigninMutation } = authSection