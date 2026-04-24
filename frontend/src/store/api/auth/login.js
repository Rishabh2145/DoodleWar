
import { baseApi } from "../baseApi";

const loginAPI = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: ({email, password}) =>({
                url: "/auth/login",
                method: "POST",
                body: {
                    email, password
                }
            })
        }),
        logout : builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method : "POST",
            })
        }),
        verify: builder.mutation({
            query: (token)=> ({
                url: '/auth/verify',
                method: "POST",
                body: {token}
            })
        })
    })
})

export const { useLoginMutation , useLogoutMutation, useVerifyMutation } = loginAPI