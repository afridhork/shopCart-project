import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { AuthSigninRequest, AuthSigninResponse } from '@/models/auth'

const configValue: string = `https://dummyjson.com`
export const authSection = createApi({
   reducerPath:'auth',
   baseQuery : fetchBaseQuery({baseUrl: configValue}),
   endpoints:(builder) => ({
      signin: builder.mutation<AuthSigninResponse, AuthSigninRequest>({
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